# JORD BUILD — site portfolio

Site statique : HTML + CSS + JavaScript, sans framework ni étape de build.

## Voir le site en local

Un double-clic sur `index.html` suffit. Pour un rendu identique à la mise en ligne, lancer un petit serveur depuis ce dossier :

```
python -m http.server 8000
```

puis ouvrir http://localhost:8000

## Ajouter ou modifier un projet

Tout se passe dans **`data/projects.js`** :

1. Copier un bloc `{ ... }` existant et changer son `id` (il apparaît dans l'URL : `projet.html?id=mon-projet`).
2. Remplir les champs `idea`, `challenge`, `build`, `role`, `impact`, `year`, `summary`. Un champ à `null` s'affiche « [À COMPLÉTER] ».
3. Déposer les images dans `assets/img/projets/<id>/` (WebP de préférence, ~1600 px de large, < 300 Ko), puis :
   - `cover: "assets/img/projets/<id>/cover.webp"`
   - `gallery: [{ src: "assets/img/projets/<id>/01.webp", alt: "Description de l'image" }, ...]`
   - pour un logo ou une bannière très large : `coverFit: "contain"` et `coverBg: "#couleur"` (image affichée en entier)
   - les images de la galerie s'affichent sans recadrage et s'ouvrent dans une visionneuse plein écran
4. `featured: true` place le projet en premier, en carte large « Projet phare ».
5. `client` : client ou cadre institutionnel, affiché dans l'étude de cas.

Le projet apparaît automatiquement sur l'accueil, dans `projets.html` (avec filtres par catégorie) et dans sa page d'étude de cas.

## Chiffres, partenaires, témoignages, formules

Tout se passe dans **`data/site.js`** :

- `stats` : les chiffres clés. `value: 12` affiche un compteur animé « 12+ » ; `null` affiche un emplacement « [À COMPLÉTER] ».
- `partners` : le bandeau défilant d'institutions. Ajouter `logo: "assets/img/logos/xxx.svg"` pour afficher un logo au lieu du nom.
- (La section témoignages a été retirée du site à la demande de Jordi.)
- `offers` : les deux formules. `price: null` affiche « Tarif [À COMPLÉTER] ».

Les réponses de la FAQ et les étapes de la méthode sont directement dans `index.html`.

## Formulaire de contact

Le formulaire de contact et l'inscription du pied de page passent par **FormSubmit** (https://formsubmit.co) : aucun compte à créer, les messages arrivent sur `jordbuild@gmail.com`.

1. **Activation (une seule fois)** : une fois le site en ligne, envoyer un message test depuis le formulaire. FormSubmit envoie un email d'activation à `jordbuild@gmail.com` : cliquer sur le lien. Les messages suivants arrivent directement.
2. Pour changer d'adresse de réception : remplacer `jordbuild@gmail.com` dans les deux `action="https://formsubmit.co/..."` de `index.html`.

## Mise en ligne

- **Netlify** : glisser-déposer le dossier `site/` sur https://app.netlify.com/drop
- **Vercel** : `vercel` depuis ce dossier, ou importer le dépôt Git
- **GitHub Pages** : pousser le contenu de `site/` dans un dépôt, puis Settings → Pages

Le domaine prévu est **jordbuild.com** : les balises `og:image` pointent déjà vers l'URL absolue
(`https://mondomaine.com/assets/img/og-image.jpg`) dans les balises `og:image` de `index.html`, `projets.html` et `projet.html` :
les réseaux sociaux exigent une URL complète.

## Fichiers

```
index.html            page d'accueil (one-page)
projets.html          tous les projets, avec filtres par catégorie
projet.html           gabarit des études de cas (rempli depuis data/projects.js)
data/projects.js      données des projets
data/site.js          chiffres, partenaires, témoignages, formules
assets/css/style.css  charte (couleurs et polices en variables CSS en haut du fichier)
assets/js/main.js     menu, animations, projets, compteurs, formulaires
assets/js/projet.js   rendu d'une étude de cas
assets/logo/          monogramme JB (or, blanc, noir), favicon, icône Apple
assets/img/           portrait N&B, image de partage 1200×630
assets/img/projets/   visuels des projets (JPEG 1400 px, optimisés depuis le dossier Résource)
assets/img/logos/     logos des institutions (bandeau défilant)
```

Le monogramme SVG a été retracé depuis `Portfolio de dhé .jpg`. Si une exportation SVG du fichier
Illustrator devient disponible, il suffit de remplacer les fichiers de `assets/logo/`.

## Typographie

Direction éditoriale inspirée du template Velorum : titres en **Anton** (condensée), labels en **Geist Mono**,
texte en **Inter**. Le logo « JORD BUILD » reste en **Montserrat**, comme dans la charte.
Pour revenir à Montserrat sur les titres, changer `--f-display` en haut de `style.css`.
