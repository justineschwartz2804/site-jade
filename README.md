# Jade Loutaty — Chef à domicile

Site statique, reproduction exacte du design Claude Design (hero « citrons », citron qui roule, nouveau footer).

- `index.html` — la page (HTML, styles et illustrations SVG repris tels quels du design)
- `script.js` — animations (hero, vague, citron qui roule), filtre des réalisations, formulaire
- `contenu.json` — contenu modifiable sans toucher au code : réalisations et URL Formspree

## Mettre en ligne avec GitHub Pages

1. Mettre ces fichiers à la racine du dépôt.
2. Sur GitHub : Settings → Pages → Source « Deploy from a branch », branche `main`, dossier `/ (root)`.

## Modifier le contenu

- **Réalisations** : éditer `contenu.json`. Le champ `photo` accepte un chemin d'image (`photos/plat.jpg`) ou une URL ; tout autre texte affiche la tuile colorée.
- **Formulaire** : les demandes partent vers l'URL `formspree` de `contenu.json`.

Note : ouvert directement en double-cliquant (`file://`), le navigateur ne peut pas lire `contenu.json` et la page affiche les réalisations par défaut. En ligne, ça fonctionne normalement.
