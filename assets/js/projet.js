/* JORD BUILD — rendu d'une étude de cas : projet.html?id=<id du projet> */
(function () {
  "use strict";

  var TODO = "[À COMPLÉTER]";
  var projects = window.PROJECTS || [];
  var main = document.getElementById("main");

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function val(v) { return v ? esc(v) : '<span class="todo">' + TODO + "</span>"; }
  function ph(label, sand) {
    return '<div class="ph' + (sand ? " ph--sand" : "") + '" role="img" aria-label="Image à venir"><span>' + esc(label) + "</span></div>";
  }

  var id = new URLSearchParams(location.search).get("id");
  var i = projects.findIndex(function (p) { return p.id === id; });

  if (i === -1) {
    document.title = "Projet introuvable — JORD BUILD";
    main.innerHTML =
      '<section class="case-hero section--dark"><div class="container case-hero__inner">' +
      '<a class="case-hero__back" href="projets.html">← Tous les projets</a>' +
      "<h1>Projet introuvable.</h1></div></section>";
    return;
  }

  var p = projects[i];
  var next = projects[(i + 1) % projects.length];

  document.title = p.title + " — JORD BUILD";
  var desc = document.querySelector('meta[name="description"]');
  if (p.summary) desc.setAttribute("content", p.summary);

  var blocks = [
    ["The Idea", "Quelle était l'idée ?", p.idea],
    ["The Challenge", "Quel problème fallait-il résoudre ?", p.challenge],
    ["The Build", "Qu'est-ce qui a été construit ?", p.build],
    ["My Role", "Quel était mon rôle ?", p.role],
    ["The Impact", "Résultats, chiffres, portée", p.impact]
  ];

  var pics = p.gallery || [];
  var gallery = pics.length
    ? pics.map(function (g, n) {
        return '<button class="gallery__item" type="button" data-i="' + n + '" aria-label="Agrandir : ' + esc(g.alt || p.title) + '">' +
          '<img src="' + esc(g.src) + '" alt="' + esc(g.alt || p.title) + '" loading="lazy"></button>';
      }).join("")
    : [1, 2, 3].map(function (n) { return ph("Image projet " + p.num + " — " + n, n === 2); }).join("");

  var contain = p.coverFit === "contain";
  main.innerHTML =
    '<section class="case-hero section--dark' + (contain ? " case-hero--contain" : "") + '" aria-labelledby="case-title">' +
      '<div class="case-hero__media"' + (contain && p.coverBg ? ' style="background:' + esc(p.coverBg) + '"' : "") + ">" +
        (p.cover ? '<img src="' + esc(p.cover) + '" alt="" width="1920" height="1080">' : ph("Image projet " + p.num)) +
      "</div>" +
      '<div class="container case-hero__inner">' +
        '<a class="case-hero__back" href="projets.html">← Tous les projets</a>' +
        '<p class="mono"><span class="num">JORD BUILD / ' + esc(p.num) + "</span></p>" +
        '<h1 id="case-title">' + esc(p.title) + "</h1>" +
        '<dl class="case-meta">' +
          "<div><dt>Catégories</dt><dd>" + esc(p.categories.join(" · ")) + "</dd></div>" +
          "<div><dt>Client / contexte</dt><dd>" + val(p.client) + "</dd></div>" +
          "<div><dt>Année</dt><dd>" + val(p.year) + "</dd></div>" +
        "</dl>" +
      "</div>" +
    "</section>" +

    '<section class="section section--light">' +
      '<div class="container">' +
        (p.summary ? '<p class="lead case-summary reveal">' + esc(p.summary) + "</p>" : "") +
        '<div class="case-blocks" style="margin-top:56px">' +
          blocks.map(function (b, n) {
            return '<div class="case-block reveal"><h2><span class="num">0' + (n + 1) + "</span>" + b[0] +
              "<small>" + b[1] + "</small></h2><p>" + val(b[2]) + "</p></div>";
          }).join("") +
        "</div>" +
      "</div>" +
    "</section>" +

    '<section class="section section--dark" aria-label="Galerie">' +
      '<div class="container"><div class="gallery reveal">' + gallery + "</div></div>" +
    "</section>" +

    '<section class="section--dark"><div class="container">' +
      '<a class="next-project" href="projet.html?id=' + encodeURIComponent(next.id) + '">' +
        '<p class="mono">Projet suivant</p>' +
        "<strong>" + esc(next.title) + ' <span aria-hidden="true">→</span></strong>' +
      "</a>" +
    "</div></section>";

  /* ---------- Visionneuse plein écran ---------- */
  if (!pics.length) return;
  var box = document.createElement("dialog");
  box.className = "lightbox";
  box.setAttribute("aria-label", "Visionneuse");
  box.innerHTML =
    '<figure class="lightbox__fig"><img alt=""><figcaption class="lightbox__cap"></figcaption></figure>' +
    '<button class="lightbox__btn lightbox__close" type="button" aria-label="Fermer">✕</button>' +
    '<button class="lightbox__btn lightbox__prev" type="button" aria-label="Image précédente">←</button>' +
    '<button class="lightbox__btn lightbox__next" type="button" aria-label="Image suivante">→</button>' +
    '<p class="lightbox__count mono"></p>';
  document.body.appendChild(box);
  var img = box.querySelector("img"), cap = box.querySelector(".lightbox__cap"), count = box.querySelector(".lightbox__count"), cur = 0;
  function show(n) {
    cur = (n + pics.length) % pics.length;
    img.src = pics[cur].src; img.alt = pics[cur].alt || p.title;
    cap.textContent = pics[cur].alt || "";
    count.textContent = (cur + 1) + " / " + pics.length;
  }
  main.querySelector(".gallery").addEventListener("click", function (e) {
    var b = e.target.closest(".gallery__item");
    if (!b) return;
    show(+b.getAttribute("data-i"));
    box.showModal();
  });
  box.querySelector(".lightbox__close").addEventListener("click", function () { box.close(); });
  box.querySelector(".lightbox__prev").addEventListener("click", function () { show(cur - 1); });
  box.querySelector(".lightbox__next").addEventListener("click", function () { show(cur + 1); });
  box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
  box.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });
})();
