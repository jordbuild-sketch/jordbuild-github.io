/*
 * JORD BUILD — Contenus éditables du site (hors projets)
 * ------------------------------------------------------------
 * Une valeur à null s'affiche comme emplacement « [À COMPLÉTER] ».
 * Ne mettre ici que des informations réelles.
 */
window.SITE = {
  // Chiffres clés (section manifeste). value: nombre, ou null tant qu'il n'est pas connu.
  stats: [
    { value: 10, suffix: "+", label: "Projets menés" },
    { value: 15, suffix: "+", label: "Événements accompagnés" },
    { value: 480, suffix: "+", label: "Visuels produits" }
  ],

  // Institutions et organisations dans lesquelles Jordi a travaillé (bandeau défilant).
  // logo: chemin d'un logo SVG/PNG (facultatif) — sinon le nom s'affiche en texte.
  partners: [
    { name: "MESRS — Ministère de l'Enseignement Supérieur et de la Recherche Scientifique", logo: "assets/img/logos/mesrs.png" },
    { name: "DNSACU", logo: "assets/img/logos/dnsacu.png" },
    { name: "Jeux Universitaires de Guinée — 10ᵉ édition", logo: "assets/img/logos/jug10.jpg" },
    { name: "Fédération Guinéenne de Tennis de Table", logo: "assets/img/logos/fgtt.png" },
    { name: "ITTF Africa", logo: "assets/img/logos/ittf.png" }
  ],

  // Formules. price: texte libre ("À partir de 1 500 000 GNF", "Sur devis"…) ou null.
  offers: [
    {
      name: "Projet ciblé",
      price: "À partir de 600 €",
      text: "Pour un besoin précis : une identité, un support, une campagne ou un visuel clé.",
      items: ["Un livrable principal", "Brief et cadrage", "Délai : 3 à 7 jours"],
      dark: false
    },
    {
      name: "Accompagnement complet",
      price: "À partir de 3 000 €",
      text: "Pour un projet ou un événement à construire de bout en bout.",
      items: ["Conception et structuration du projet", "Identité et supports de communication", "Coordination des parties prenantes", "Suivi jusqu'au jour J", "Délai selon l'envergure du projet"],
      dark: true
    }
  ]
};
