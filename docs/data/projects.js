/*
 * JORD BUILD — Données des projets
 * ------------------------------------------------------------
 * Pour ajouter un projet : copier un bloc { ... }, changer l'id
 * (utilisé dans l'URL : projet.html?id=mon-projet), remplir les
 * champs et déposer les images dans assets/img/projets/<id>/.
 *
 * Un champ laissé à null s'affiche « [À COMPLÉTER] » sur le site.
 * cover   : image de couverture (ex. "assets/img/projets/jug10/cover.jpg")
 * coverFit: "contain" pour afficher la couverture en entier (logos, bannières très larges)
 * coverBg : couleur de fond derrière une couverture en "contain"
 * gallery : liste d'images [{ src: "...", alt: "..." }] — affichées sans recadrage
 * featured: true = carte large « projet phare » sur l'accueil
 * client  : client ou cadre institutionnel du projet
 */
(function () {
  var J = "assets/img/projets/jug10-2026/";
  var E = "assets/img/projets/echo-du-village/"; // L'Écho du Village : contenu des JUG10
  var V = "assets/img/projets/village-park-expo/";
  var T = "assets/img/projets/fgtt-ittf-2026/";

  window.PROJECTS = [
    {
      id: "village-park-expo",
      client: "Foire du Mandén — Kankan",
      num: "001",
      title: "Village Park & Expo",
      categories: ["Événementiel", "Branding", "Communication"],
      year: "Horizon 2030",
      summary: "La foire du Mandén à Kankan : un projet d'exposition, de culture et de loisirs, planifié pour une réalisation en 2030.",
      cover: V + "05-banniere-suspendue-blanche.jpg", // logo Village Park & Expo
      idea: "Réunir à Kankan, en un seul lieu, exposants, artisanat, gastronomie, spectacles, concerts et espace de jeux : un village de fête et d'exposition pour la région du Mandén. Le projet est conçu sous le haut patronage du Président de la République, aux côtés d'angataCOM, du Programme Simandou 2040, du MESRS et de la DNSACU.",
      challenge: "Organiser un événement de dimension nationale à Kankan, la deuxième capitale de la Guinée, avec tous les défis d'une planification menée sur plusieurs années avant l'exécution.",
      build: "L'identité Village Park & Expo et toute la campagne : ouverture de la réservation des stands (jeudi 7 novembre), compte à rebours J-30, visuel programme, bannière réseaux sociaux #villagepark&expo, bannières suspendues, brochure et habillage mural.",
      role: "J'ai créé et mené le projet, dans une vision de réalisation à l'horizon 2030.",
      impact: "Le projet est planifié : sa réalisation est prévue en 2030.",
      gallery: [
        { src: V + "01-reservation-des-stands.jpg", alt: "Annonce de l'ouverture de la réservation des stands, jeudi 7 novembre" },
        { src: V + "02-compte-a-rebours-j-30.jpg", alt: "Compte à rebours J-30 : la foire du Mandén" },
        { src: V + "03-programme.jpg", alt: "Visuel programme : artisanat, spectacles, gastronomie, concerts et jeux, du 30 décembre au 10 janvier 2026" },
        { src: V + "04-banniere-reseaux-sociaux.jpg", alt: "Bannière réseaux sociaux #villagepark&expo" },
        { src: V + "05-banniere-suspendue-blanche.jpg", alt: "Bannière suspendue Village Park & Expo, version blanche" },
        { src: V + "06-banniere-suspendue-bleue.jpg", alt: "Bannière suspendue Village Park & Expo, version bleue" },
        { src: V + "07-brochure-ouverte.jpg", alt: "Brochure Village Park & Expo, ouverte" },
        { src: V + "08-brochure.jpg", alt: "Brochure Village Park & Expo" },
        { src: V + "09-habillage-mural.jpg", alt: "Habillage mural Village Park & Expo" }
      ]
    },
    {
      id: "jug10-2026",
      client: "MESRS · DNSACU",
      num: "002",
      title: "Jeux Universitaires de Guinée — JUG10-2026",
      featured: true,
      categories: ["Événementiel", "Communication", "Contenu", "Coordination", "Design"],
      year: "2026",
      summary: "10ᵉ édition des Jeux Universitaires de Guinée, du 19 avril au 3 mai 2026 à Conakry, sous le haut patronage du Président de la République.",
      cover: J + "cover.jpg",
      idea: "Porter la 10ᵉ édition des Jeux Universitaires de Guinée, dans l'environnement du Ministère de l'Enseignement Supérieur, de la Recherche Scientifique et de l'Innovation (MESRS) et de la DNSACU. Université hôte : Université Gamal Abdel Nasser de Conakry. Lancement officiel : 19 avril 2026.",
      challenge: "Faire vivre deux semaines de compétitions sportives et culturelles, de l'annonce de l'université hôte aux finales, dans une seule université hôte, avec toutes les universités du pays à mobiliser.",
      build: "Une campagne complète, étape par étape : teasing (« Selon vous, quelle université recevra les JUG10 ? »), annonce de l'université hôte, affiche officielle, conférence de presse et remise des prix JUG 09 (4 avril 2026, plage Camayenne), cérémonie officielle de lancement (19 avril 2026, stade Petit Sory – Nongo), visuels par discipline — football, cyclisme, randonnée pédestre, e-sport —, programmes des journées de match, résultats, et Village culturel (concours de danse, slam). Les Jeux ont aussi leur propre média : L'Écho du Village, « la voix officielle des Jeux Universitaires de Guinée », dont j'ai conçu l'identité et les couvertures pour les réseaux sociaux. En parallèle : réunions préparatoires, compte à rebours, formation des volontaires, tirage au sort, accueil des délégations.",
      role: "Communication, contenus institutionnels, préparation événementielle. Mobilisation des universités, des délégations, des partenaires et des équipes techniques.",
      impact: "Toutes les universités du pays réunies dans une université hôte : plus de 2 000 athlètes et plus de 100 000 participants, sur 14 jours.",
      gallery: [
        { src: J + "01-affiche-officielle.jpg", alt: "Affiche officielle des Jeux Universitaires de Guinée, 10ᵉ édition, du 19 avril au 3 mai 2026" },
        { src: J + "02-teasing-universite-hote.jpg", alt: "Teasing : selon vous, quelle université recevra les JUG10 ?" },
        { src: J + "03-annonce-universite-hote.jpg", alt: "Annonce : l'Université Gamal Abdel Nasser recevra les JUG10" },
        { src: J + "04-participants-attendus.jpg", alt: "Plus de 100 000 participants attendus — en route pour les JUG10" },
        { src: J + "05-conference-de-presse.jpg", alt: "Conférence de presse JUG10 et remise des prix JUG 09, samedi 4 avril 2026" },
        { src: J + "06-ceremonie-de-lancement.jpg", alt: "Cérémonie officielle de lancement, dimanche 19 avril 2026, stade Petit Sory – Nongo" },
        { src: J + "07-football.jpg", alt: "Visuel discipline : football" },
        { src: J + "08-match-day.jpg", alt: "Match day : programme des rencontres du lundi 27 avril 2026" },
        { src: J + "09-cyclisme-day.jpg", alt: "Cyclisme day : départ, arrivée et itinéraire" },
        { src: J + "10-cyclisme-resultats.jpg", alt: "Résultats de l'épreuve de cyclisme" },
        { src: J + "11-randonnee-pedestre.jpg", alt: "Randonnée pédestre day, vendredi 1er mai 2026" },
        { src: J + "12-finale-e-sport.jpg", alt: "Finale e-sport, samedi 2 mai 2026 : Mortal Kombat, e-football, FC 26" },
        { src: J + "13-village-culturel-danse.jpg", alt: "Village culturel : finale du concours de danse" },
        { src: J + "14-village-culturel-slam.jpg", alt: "Village culturel : finalistes du slam" },
        { src: E + "01-couverture-sombre.jpg", alt: "L'Écho du Village, la voix officielle des JUG : couverture réseaux sociaux, version sombre" },
        { src: E + "02-couverture-claire.jpg", alt: "L'Écho du Village, la voix officielle des JUG : couverture réseaux sociaux, version claire" }
      ]
    },
    {
      id: "fgtt-ittf-2026",
      client: "Fédération Guinéenne de Tennis de Table",
      num: "003",
      title: "FGTT / ITTF Africa West Regional Championships — Conakry 2026",
      categories: ["Communication sportive", "Design", "Contenus sociaux"],
      year: "2026",
      summary: "Championnat ouest-africain de tennis de table, du 15 au 18 juillet 2026 au Hall omnisports de l'Émergence de Cosa, à Conakry.",
      cover: T + "cover.jpg",
      idea: "Accueillir à Conakry les ITTF-Africa West Regional Championships, organisés par la Fédération Guinéenne de Tennis de Table sous l'égide du Ministère de la Jeunesse et des Sports, sous le haut patronage du Président de la République.",
      challenge: "Piloter la communication d'un événement de dimension internationale, avec la participation de plus de 6 pays de la sous-région, sous la supervision d'ITTF-Africa et dans le respect de ses standards d'organisation.",
      build: "L'identité visuelle de l'événement et ses déclinaisons : affiche officielle, bâche grand format, roll-ups, t-shirts, sweat d'équipe et badges d'accréditation. Puis les contenus du championnat : équipes, arbitres, installation, phases finales et podiums.",
      role: "Communication et présence digitale de la Fédération Guinéenne de Tennis de Table.",
      impact: "Les fédérations de la sous-région réunies à Conakry : plus de 300 pongistes, sur 4 jours de compétition.",
      gallery: [
        { src: T + "01-affiche-officielle.jpg", alt: "Affiche officielle du championnat ouest-africain de tennis de table, du 15 au 18 juillet" },
        { src: T + "02-bache-grand-format.jpg", alt: "Bâche grand format ITTF-Africa West Regional Championships Conakry 2026" },
        { src: T + "03-roll-up.jpg", alt: "Roll-up de l'événement" },
        { src: T + "04-roll-up-hall.jpg", alt: "Roll-up dans un hall" },
        { src: T + "05-t-shirt-blanc.jpg", alt: "T-shirt blanc Conakry 2026" },
        { src: T + "06-t-shirt-noir.jpg", alt: "T-shirt noir Conakry 2026" },
        { src: T + "07-sweat-equipe.jpg", alt: "Sweat d'équipe Conakry 2026" },
        { src: T + "08-badge-officiel.jpg", alt: "Badge d'accréditation officiel" }
      ]
    }
  ];
})();
