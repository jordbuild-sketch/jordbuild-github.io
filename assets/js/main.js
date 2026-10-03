/* JORD BUILD — scripts du site (vanilla, sans dépendance) */
(function () {
  "use strict";

  var TODO = "[À COMPLÉTER]";
  var projects = window.PROJECTS || [];
  var site = window.SITE || {};
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  // Image, ou bloc de remplacement « IMAGE PROJET 00X »
  // fit/bg : couverture affichée en entier (logo, bannière très large) sur un fond de couleur
  function media(src, alt, label, variant, fit, bg) {
    if (src) {
      return '<img src="' + esc(src) + '" alt="' + esc(alt || "") + '" loading="lazy" width="1200" height="900"' +
        (fit === "contain" ? ' class="is-contain"' + (bg ? ' style="background:' + esc(bg) + '"' : "") : "") + ">";
    }
    return '<div class="ph' + (variant ? " ph--" + variant : "") + '" role="img" aria-label="Image à venir"><span>' + esc(label) + "</span></div>";
  }

  // Carte projet (accueil + page « Tous les projets »)
  function workItem(p, i, opts) {
    opts = opts || {};
    return (
      '<li class="work-item' + (p.featured && opts.featured ? " work-item--featured" : "") + '" data-cats="' + esc(p.categories.join("|")) + '">' +
        '<a href="projet.html?id=' + encodeURIComponent(p.id) + '">' +
          '<div class="work-item__media">' +
            (p.featured ? '<span class="work-item__badge">Projet phare</span>' : "") +
            media(p.cover, p.title, "Image projet " + p.num, i % 3 === 1 ? "sand" : "", p.coverFit, p.coverBg) +
          "</div>" +
          '<div class="work-item__meta">' +
            '<span class="work-item__num">JORD BUILD / ' + esc(p.num) + (p.year ? " — " + esc(p.year) : "") + "</span>" +
            '<h3 class="work-item__title">' + esc(p.title) + "</h3>" +
            '<p class="work-item__cats">' + esc(p.categories.join(" · ")) + "</p>" +
            '<span class="work-item__arrow" aria-hidden="true">↗</span>' +
          "</div>" +
        "</a>" +
      "</li>"
    );
  }
  var ordered = projects.filter(function (p) { return p.featured; })
    .concat(projects.filter(function (p) { return !p.featured; }));

  /* ---------- Menu plein écran ---------- */
  var menu = $("#menu"), openBtn = $("#menu-open");
  if (menu && openBtn) {
    var label = $(".bar__menu-label", openBtn);
    var setMenu = function (open) {
      if (open) {
        menu.hidden = false;
        requestAnimationFrame(function () { menu.classList.add("is-open"); });
        $("a", menu).focus({ preventScroll: true });
      } else {
        menu.classList.remove("is-open");
        setTimeout(function () { if (!menu.classList.contains("is-open")) menu.hidden = true; }, reduced ? 0 : 600);
      }
      document.body.classList.toggle("menu-open", open);
      openBtn.setAttribute("aria-expanded", String(open));
      label.textContent = open ? "Fermer" : "Menu";
    };
    openBtn.addEventListener("click", function () { setMenu(!document.body.classList.contains("menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) {
      if (!document.body.classList.contains("menu-open")) return;
      if (e.key === "Escape") { setMenu(false); openBtn.focus(); }
      // garder le focus dans le menu (et le bouton Fermer)
      if (e.key === "Tab") {
        var items = $$("a", menu).concat(openBtn);
        var first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------- Projets (accueil) ---------- */
  var workList = $("#work-list");
  if (workList) {
    workList.innerHTML = ordered.map(function (p, i) { return workItem(p, i, { featured: true }); }).join("");
  }

  /* ---------- Tous les projets : filtres par catégorie ---------- */
  var archive = $("#archive");
  if (archive) {
    archive.innerHTML = ordered.map(function (p, i) { return workItem(p, i); }).join("");
    var cats = [];
    projects.forEach(function (p) { p.categories.forEach(function (c) { if (cats.indexOf(c) === -1) cats.push(c); }); });
    var filters = $("#filters");
    filters.innerHTML = ['<button class="filter" type="button" aria-pressed="true" data-cat="">Tous</button>']
      .concat(cats.map(function (c) { return '<button class="filter" type="button" aria-pressed="false" data-cat="' + esc(c) + '">' + esc(c) + "</button>"; }))
      .join("");
    filters.addEventListener("click", function (e) {
      var b = e.target.closest(".filter");
      if (!b) return;
      $$(".filter", filters).forEach(function (f) { f.setAttribute("aria-pressed", String(f === b)); });
      var cat = b.getAttribute("data-cat"), shown = 0;
      $$(".work-item", archive).forEach(function (li) {
        var ok = !cat || li.getAttribute("data-cats").split("|").indexOf(cat) !== -1;
        li.hidden = !ok;
        if (ok) { shown++; li.classList.add("is-in"); }
      });
      $("#archive-count").textContent = shown + (shown > 1 ? " projets" : " projet");
    });
    $("#archive-count").textContent = projects.length + (projects.length > 1 ? " projets" : " projet");
  }

  /* ---------- Chiffres clés ---------- */
  var statsEl = $("#stats");
  if (statsEl && site.stats) {
    statsEl.innerHTML = site.stats.map(function (s) {
      var known = typeof s.value === "number";
      return '<li class="stat reveal">' +
        '<span class="stat__value' + (known ? "" : " is-todo") + '"' + (known ? ' data-count="' + s.value + '" data-suffix="' + esc(s.suffix || "") + '"' : "") + ">" +
          (known ? "0" + esc(s.suffix || "") : "—") + "</span>" +
        '<span class="stat__label">' + esc(s.label) + (known ? "" : "<small>" + TODO + "</small>") + "</span>" +
      "</li>";
    }).join("");
  }
  function countUp(el) {
    var end = +el.getAttribute("data-count"), suf = el.getAttribute("data-suffix"), t0 = null, dur = 1400;
    if (reduced) { el.textContent = end + suf; return; }
    requestAnimationFrame(function step(t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + suf;
      if (k < 1) requestAnimationFrame(step);
    });
  }

  /* ---------- Bandeaux défilants ---------- */
  var partnersEl = $("#partners");
  if (partnersEl && site.partners) {
    var tiles = site.partners.map(function (p) {
      return '<div class="partner">' + (p.logo ? '<img src="' + esc(p.logo) + '" alt="' + esc(p.name) + '" loading="lazy">' : esc(p.name)) + "</div>";
    }).join("");
    // 4 séries (dont 3 masquées aux lecteurs d'écran) : la boucle reste continue même sur un écran très large
    var hidden = tiles.replace(/<div class="partner">/g, '<div class="partner" aria-hidden="true">');
    partnersEl.innerHTML = tiles + (reduced ? "" : hidden + hidden + hidden);
  }
  $$(".marquee--footer .marquee__track").forEach(function (t) { if (!reduced) t.innerHTML += t.innerHTML; });

  /* ---------- Témoignages ---------- */
  var quotesEl = $("#quotes");
  if (quotesEl) {
    var list = (site.testimonials && site.testimonials.length) ? site.testimonials : null;
    quotesEl.innerHTML = list
      ? list.map(function (q) {
          return '<li class="quote reveal">' +
            (q.photo ? '<div class="quote__photo"><img src="' + esc(q.photo) + '" alt="' + esc(q.name) + '" loading="lazy" width="600" height="750"></div>' : "") +
            '<div class="quote__body"><blockquote>« ' + esc(q.quote) + ' »</blockquote>' +
            '<p class="quote__who"><strong>' + esc(q.name) + "</strong><span>" + esc(q.role || "") + "</span></p></div></li>";
        }).join("")
      : [1, 2, 3].map(function (n) {
          return '<li class="quote quote--todo reveal">' +
            '<div class="quote__photo">' + media(null, "", "Photo " + n, "light") + "</div>" +
            '<div class="quote__body"><blockquote>Témoignage à venir. ' + TODO + "</blockquote>" +
            '<p class="quote__who"><strong>Nom Prénom</strong><span>Fonction, organisation ' + TODO + "</span></p></div></li>";
        }).join("");
  }

  /* ---------- Formules ---------- */
  var offersEl = $("#offers");
  if (offersEl && site.offers) {
    offersEl.innerHTML = site.offers.map(function (o) {
      return '<article class="offer' + (o.dark ? " offer--dark" : "") + ' reveal">' +
        '<p class="mono mono--gold offer__name">' + esc(o.name) + "</p>" +
        '<p class="offer__price' + (o.price ? "" : " is-todo") + '">' + (o.price ? esc(o.price) : "Tarif " + TODO) + "</p>" +
        '<p class="offer__text">' + esc(o.text) + "</p>" +
        '<ul class="checks">' + o.items.map(function (it) { return "<li>" + esc(it) + "</li>"; }).join("") + "</ul>" +
        '<a class="btn ' + (o.dark ? "btn--gold" : "btn--dark") + '" href="#contact">Démarrer un projet <span aria-hidden="true">→</span></a>' +
      "</article>";
    }).join("");
  }

  /* ---------- Cartes lumineuses (ADN) ---------- */
  var LIGHT =
    '<div class="lcard__light" aria-hidden="true">' +
      '<div class="lcard__slit"></div>' +
      '<div class="lcard__lumen"><div class="lc-min"></div><div class="lc-mid"></div><div class="lc-hi"></div></div>' +
      '<div class="lcard__darken"><div class="lc-sl"></div><div class="lc-ll"></div><div class="lc-slt"></div><div class="lc-srt"></div></div>' +
    "</div>";
  $$(".lcard").forEach(function (card) {
    card.insertAdjacentHTML("afterbegin", LIGHT);
    var btn = $(".lcard__toggle", card), tip = $(".lcard__tip", card);
    btn.addEventListener("click", function () {
      var on = !card.classList.contains("is-on");
      card.classList.toggle("is-on", on);
      btn.setAttribute("aria-pressed", String(on));
      tip.textContent = on ? "Éteindre" : "Allumer";
    });
  });

  /* ---------- Services : un seul panneau ouvert à la fois ---------- */
  $$(".service").forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (d.open) $$(".service").forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* ---------- Manifeste : mots révélés au scroll ---------- */
  var words = $("[data-words]");
  if (words) {
    // découpe en mots, en conservant les éléments (ex. le point doré)
    Array.prototype.slice.call(words.childNodes).forEach(function (n) {
      if (n.nodeType !== 3) return;
      var frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(function (w) {
        if (!w) return;
        if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
        var s = document.createElement("span"); s.className = "w"; s.textContent = w; frag.appendChild(s);
      });
      words.replaceChild(frag, n);
    });
    var ws = $$(".w", words);
    if (reduced) ws.forEach(function (w) { w.classList.add("is-lit"); });
    else {
      var ticking = false;
      var paint = function () {
        ticking = false;
        var r = words.getBoundingClientRect(), vh = window.innerHeight;
        // 0 quand le haut du texte entre à 85 % de l'écran, 1 quand le bas atteint 45 %
        var p = (vh * 0.85 - r.top) / (r.height + vh * 0.4);
        var n = Math.round(Math.max(0, Math.min(1, p)) * ws.length);
        ws.forEach(function (w, i) { w.classList.toggle("is-lit", i < n); });
      };
      window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(paint); } }, { passive: true });
      window.addEventListener("resize", paint);
      paint();
    }
  }

  /* ---------- Apparition au scroll (+ compteurs, révélation des projets) ---------- */
  var reveals = $$(".reveal, .work-item");
  reveals.forEach(function (el) {
    if (!el.classList.contains("reveal")) return;
    var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.classList.contains("reveal"); });
    var idx = sibs.indexOf(el);
    if (idx > 0) el.style.setProperty("--d", Math.min(idx, 6) * 0.08 + "s");
  });
  var onIn = function (el) {
    el.classList.add("is-in");
    var c = el.querySelector && el.querySelector("[data-count]");
    if (c) countUp(c);
  };
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { onIn(en.target); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(onIn);
  }

  /* ---------- Formulaires (FormSubmit : envoi par email, sans backend) ---------- */
  var WHATSAPP = "224627110311", MAILTO = "jordbuild@gmail.com";

  // Si l'envoi direct échoue : le même message, prêt à partir par WhatsApp ou par email
  function fallback(form, say, why) {
    var d = {};
    new FormData(form).forEach(function (v, k) { if (k.charAt(0) !== "_") d[k] = v; });
    var text = d.message
      ? "Bonjour Jordi,\n\n" + d.message + "\n\n— " + (d.nom || "") + (d.email ? " (" + d.email + ")" : "") +
        (d.type_de_projet ? "\nType de projet : " + d.type_de_projet : "")
      : "Bonjour Jordi, je souhaite m'inscrire à vos actualités : " + (d.email || "");
    var subject = d.type_de_projet ? "Projet " + d.type_de_projet + " — jordbuild.com" : "Contact — jordbuild.com";
    say("");
    var el = say.el;
    el.className = "form__status is-error";
    el.innerHTML = esc(why) + ' Envoyez votre message autrement : ' +
      '<a class="form__alt" target="_blank" rel="noopener" href="https://wa.me/' + WHATSAPP + "?text=" + encodeURIComponent(text) + '">par WhatsApp</a> ou ' +
      '<a class="form__alt" href="mailto:' + MAILTO + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(text) + '">par email</a>.';
  }

  function send(form, say, okMsg) {
    // Un fichier ouvert en local (file://) ne peut pas envoyer : FormSubmit exige un site servi en http(s)
    if (location.protocol === "file:") {
      fallback(form, say, "L'envoi direct ne fonctionne qu'une fois le site en ligne.");
      return;
    }
    var btn = $("button[type=submit]", form);
    btn.disabled = true;
    say("Envoi en cours…");
    // FormSubmit : point d'accès AJAX (réponse JSON, pas de redirection)
    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = v; });
    fetch(form.action.replace("formsubmit.co/", "formsubmit.co/ajax/"), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data)
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, body: j }; }); })
      .then(function (r) {
        if (!r.ok || String(r.body.success) !== "true") throw new Error();
        form.reset();
        $$(".is-invalid", form).forEach(function (g) { g.classList.remove("is-invalid"); });
        say(okMsg, "ok");
      })
      .catch(function () { fallback(form, say, "L'envoi direct a échoué."); })
      .then(function () { btn.disabled = false; });
  }
  function sayer(el) {
    var say = function (msg, kind) { el.textContent = msg; el.className = "form__status" + (kind ? " is-" + kind : ""); };
    say.el = el;
    return say;
  }
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var form = $("#contact-form");
  if (form) {
    var say = sayer($("#form-status"));
    // retirer l'erreur du groupe dès qu'un type est choisi
    form.addEventListener("change", function (e) {
      if (e.target.type === "radio") e.target.closest("fieldset").classList.remove("is-invalid");
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      $$("[required]", form).forEach(function (f) {
        if (f.type === "radio") {
          var none = !form.querySelector('input[name="' + f.name + '"]:checked');
          f.closest("fieldset").classList.toggle("is-invalid", none);
          if (none && ok) { f.focus(); ok = false; }
          return;
        }
        var bad = !f.value.trim() || (f.type === "email" && !EMAIL.test(f.value));
        f.setAttribute("aria-invalid", bad ? "true" : "false");
        if (bad && ok) { f.focus(); ok = false; }
      });
      if (!ok) { say("Merci de remplir tous les champs et de choisir un type de projet (email valide).", "error"); return; }
      send(form, say, "Merci, message envoyé. Je reviens vers vous rapidement.");
    });
  }

  var news = $("#news-form");
  if (news) {
    var sayNews = sayer($("#news-status"));
    news.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = $("input[type=email]", news);
      if (!EMAIL.test(input.value)) { input.focus(); sayNews("Adresse email invalide.", "error"); return; }
      send(news, sayNews, "Merci, inscription enregistrée.");
    });
  }
})();
