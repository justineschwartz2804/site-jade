# Handoff : Jade Loutaty — Chef à domicile (landing page)

## Overview
One-page website for a French "personal chef" service (American-style): weekly meal prep cooked at the client's home, private dinners, and custom formulas. Sections: Nav → Hero → Services (+ 4 steps) → animated wave transition → Réalisations (filterable gallery) → Testimonial → Prendre rendez-vous (booking form) → Footer (social links). Language: French. Visual direction: Ottolenghi-inspired — bold flat colors, Mediterranean produce illustrations, big heavy type mixed with italic serif.

## About the design files
`Chef a domicile - Landing.dc.html` is a **design reference built in HTML** (it runs in a browser via `support.js`, a small React-based runtime). It shows the intended look and behavior; it is not production code to ship as-is. Recreate it in a real stack. No codebase exists yet — recommended: **Astro** (or Next.js static export) + plain CSS/Tailwind, deployed on Netlify/Vercel. A static site is enough; the only dynamic parts are the gallery filter, the form, and scroll/pointer animations (vanilla JS or a small island component).

To preview the reference: serve the folder locally (`npx serve .`) and open the `.dc.html` file (it fetches `contenu.json`, so it needs an HTTP server, not `file://`).

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy and animations are final. Reproduce pixel-faithfully. The SVG illustrations (lemon, tomato, fig, pomegranate, yellow half-pepper, seed bullets) are inline in the reference file — extract them as-is into `/assets/*.svg` components.

## Design tokens
Colors
- Ink `#141412` (text, borders, dark section bg)
- Cream / page bg `#fdfcf8`
- Sand (Réalisations bg, hover chips, wave fill) `#f1efe6`
- Lemon `#ffd60a` · Lemon pale `#fff3b0` · Lemon light `#ffe46b`
- Pink `#f4a6b8` · Blush `#f7d9cc`
- Green `#7cc48a` · Leaf green `#3f8f4a` · Pistachio `#b9d98a`
- Apricot `#f7c59f`
- Tomato red `#d8361f` · Accent red (hover/CTA/numbers) `#c8361f`
- Body grey `#3a3a34` · Muted grey `#5a5a52` · Light grey on dark `#d6d4cb`

Typography (Google Fonts)
- **Outfit** 400/500/600/700/800/900 — main sans
- **Instrument Serif** italic — accent words ("Loutaty", "personal chef", hero tagline, dish tags, testimonial in roman)
- **JetBrains Mono** 400 — eyebrows / labels, uppercase, letter-spacing 0.1–0.18em
- H1 hero: Outfit 900, `clamp(56px, 9vw, 128px)`, line-height 0.92, letter-spacing −0.04em
- H2 sections: Outfit 900, `clamp(44px, 6vw, 80px)`, lh 0.95, ls −0.035em
- H3 cards: 800, 40px, lh 1, ls −0.03em
- Body: 17–20px, lh 1.5
- Eyebrow: JetBrains Mono 13px uppercase

Radii: pills `999px`, cards `28px`, gallery images `24px`, inputs `14px`.
Borders: `1.5px solid #141412` everywhere (nav bottom, outlined buttons, inputs, footer top).
Layout: max content width `1280px`, side padding `32px`, section vertical padding `100–120px`. No shadows.

## Sections

### 1. Nav (sticky)
- `position: sticky; top: 0`, bg `rgba(253,252,248,0.92)` + `backdrop-filter: blur(8px)`, bottom border 1.5px ink. Padding 18px 32px, flex space-between, wraps.
- Logo: small yellow half-pepper SVG (40×46, rotated −8°; hover → rotate 10° scale 1.12, `.4s cubic-bezier(.3,1.6,.5,1)`) + "Jade" (Outfit 900 26px) + "Loutaty" (Instrument Serif italic 30px, `#d8361f`), below: "CHEF À DOMICILE" (Mono 10.5px, ls .18em, `#5a5a52`).
- Links: "Services", "Réalisations" (pill 10×18, 600 16px, hover bg `#f1efe6`), CTA "Prendre rendez-vous" (ink bg, cream text, hover `#c8361f`).

### 2. Hero
- Centered, min-height 760px, padding-top 110px, overflow hidden.
- Eyebrow: "MEAL PREP HEBDOMADAIRE - DÎNER PRIVÉ"
- H1: "Vos dîners,<br>faits à la maison."
- Lead (max 560px, 20px, `#3a3a34`): "Je cuisine chez vous vos repas de la semaine ou pour un dîner entre amis. / Des recettes choisies ensemble, préparées avec des produits de saison." + italic serif 23px line "Le plaisir de se mettre à table, au quotidien !"
- Buttons (gap 12px): "Comment ça marche" (outlined, → #services) then "Réserver une prestation" (ink filled, hover red, → #rdv). Padding 18×30, 700 17px.
- Decorative produce (behind text, z-index below): sliced lemon 430px bottom-left (`left:3%; bottom:-230px`), tomato 440px bottom-right (`right:2%; bottom:-200px`), small open fig 140px centered (`bottom:-60px`).
- Alternative variant "grenade" (prop `hero`): three flat blobs (red circle, pink blob, yellow circle) instead of produce. Default = produce.

### 3. Services
- Header row: H2 "Services" + paragraph (max 440px): "Le principe du *personal chef* américain : un menu conçu pour vous, cuisiné dans votre cuisine, selon vos besoins."
- 3 cards, grid `repeat(auto-fit, minmax(min(100%,340px),1fr))`, gap 20px, radius 28px, padding 36px, min-height 440px:
  - Yellow `#ffd60a` — "LA ROUTINE" / **Semaine** / "Vos dîners du lundi au vendredi, cuisinés en une session chez vous. Étiquetés, rangés, avec les instructions de réchauffe." / Menu validé ensemble chaque semaine · Courses faites par mes soins · Cuisine rendue impeccable
  - Pink `#f4a6b8` — "LES GRANDES OCCASIONS" / **Dîner** / "Un dîner à partager, servi à table chez vous : grandes assiettes colorées, herbes fraîches, épices et desserts maison." / De 4 à 16 convives · Menu à partager ou à l'assiette · Service et rangement inclus
  - Green `#7cc48a` — "LE SUR MESURE" / **À la carte** / "Végétarien, sans gluten, objectif sport, batch cooking familial… On construit ensemble la formule qui colle à votre rythme." / Allergies et régimes respectés · Fréquence au choix · Devis personnalisé
- List bullets = small ink **seed/pip** SVG (11×15, rotated −18°, 12°, −6° in turn) with a faint cream highlight.
- Steps row (margin-top 96px, top border ink, 4 columns auto-fit min 240px): big red number (900 56px `#c8361f`), title 800 24px, text 16px:
  1 On se parle — Un appel pour cerner vos goûts, contraintes et rythme de semaine.
  2 Je compose — Je vous propose un menu de recettes dénichées et testées.
  3 Je cuisine — Courses, préparation chez vous, rangement et nettoyage.
  4 Vous savourez — Dîners prêts toute la semaine, il ne reste qu'à réchauffer.

### 4. Wave transition (Services → Réalisations) — key creative moment
- 340px tall, full-width SVG (`viewBox 0 0 1440 320`, `preserveAspectRatio="xMidYMax slice"`), `aria-hidden`.
- Sand-colored (`#f1efe6`) sine wave filling down into the Réalisations section (same color → seamless join).
- A text ribbon on a `textPath` follows the wave: "Fait maison ● Produits de saison ● Sur mesure ● Recettes dénichées ●" ×4, Outfit 800 30px ink; bullets colored yellow/pink/green/apricot.
- Scroll-driven: progress `p = clamp((vh − rect.top) / (vh + rect.height), 0, 1)`. Amplitude `A = 70 − 55p`, phase `= p·2.2π`, wave `y(x) = 170 + A·sin(x/1440·3π + phase)`, x from −1600 to 1640 step 40. Ribbon path is the same wave offset +52; `startOffset = 200 + 1300p` (text slides along).
- Three produce "surf" the wave: fig (96×106) at x = 14%+10p, pomegranate (124×130) at 48%+6p, yellow pepper (108×124) at 84%−8p. Each is placed on the wave surface (sink ~20px), rotated to the wave tangent, plus a gentle bob `sin(t·1.6)·4px` and small spin. Runs in a `requestAnimationFrame` loop.
- Respect `prefers-reduced-motion`: freeze at p=0.5, no bob.

### 5. Réalisations
- bg `#f1efe6`, padding 40px 32px 110px.
- H2 "Réalisations" + filter pills (generated from categories: Tout + unique `categorie` values). Active = ink bg / cream text; inactive = transparent / ink, 1.5px border.
- Grid `auto-fill minmax(min(100%,280px),1fr)`, gap 20px. Card: image 4:5, radius 24px, `object-fit: cover`; if no photo → colored tile (`couleur`) with diagonal stripe pattern and a mono label "photo · …". Caption row: title 700 19px left, tag Instrument Serif italic 18px `#5a5a52` right.
- **Data comes from `contenu.json`** (see below) — keep it content-editable without touching code (e.g. Astro content collection, or a CMS like Decap/Notion later).

### 6. Testimonial
- Centered, max 1000px, padding 120px. Instrument Serif `clamp(32px,4vw,52px)` lh 1.15: « Je n'ai jamais aussi bien mangé que depuis que Jade fait mes petits plats de la semaine. Aussi beau que bon ! » — attribution mono 13px uppercase "Grégoire".

### 7. Prendre rendez-vous (#rdv)
- Dark section (ink bg, cream text), yellow 420px circle bleeding off top-right.
- Left: H2 "Prendre<br>rendez-vous", text "Un premier appel de 20 minutes, sans engagement, pour parler de vos goûts, de votre semaine type et de ce qui vous ferait plaisir.", email link (yellow, 700), "Paris & proche banlieue Ouest".
- Right: cream form card (radius 28, padding 36, gap 22):
  - "Quelle formule ?" pill toggle: La semaine / Le dîner / À la carte (selected = yellow bg)
  - Prénom & nom* · Email* (2-col auto-fit min 180px)
  - Date souhaitée (date input) · Nombre de personnes (stepper −/+, range 1–12, default 2)
  - "Vos envies, allergies, contraintes" textarea (placeholder "Plutôt végétarien, beaucoup d'herbes, pas de coriandre…")
  - Submit "Envoyer ma demande" (red `#c8361f`, hover ink); loading label "Envoi en cours…"
  - Error line in red: "L'envoi n'a pas marché. Réessayez, ou écrivez-moi directement par e-mail."
  - Success state replaces the form: yellow card, "Merci !" 900 48px, "Demande reçue pour la formule **{formule}**, {n} personne(s). Je vous réponds sous 48 h pour caler notre appel." + outlined "Nouvelle demande" button.
- **Submission:** POST `FormData` to the Formspree URL in `contenu.json → formspree` with `Accept: application/json`. Fields: `nom`, `email`, `date`, `message`, `formule`, `personnes` (hidden). Add a honeypot `_gotcha` field and an RGPD consent line under the button.

### 8. Footer
- Ink wave cap continuing from the RDV section (no hard edge). Logo identical to the nav logo (pepper + Jade/Loutaty + CHEF À DOMICILE).
- Single social pill: LinkedIn → https://www.linkedin.com/in/jade-loutaty-7b3276286/ (new tab).
- Bottom row 14px muted: anchor links + "© 2026 … — Chef à domicile · Mentions légales".

## RDV lemon
Lemon slice (hero lemon SVG, clamp(96px,11vw,150px)) rolls along the top edge of the black wave that opens the RDV section, driven by scroll: progress p = (vh − waveTop)/(0.85·vh), x = 6%→86% of width. Position is sampled on the curve (getPointAtLength), offset along the normal by the radius, rotation = distance travelled / radius (true rolling). See `updateRdvLemon()`.

## Continuity rule
The page must read as ONE continuous scroll: no horizontal rules or borders between sections, no clipped illustrations (produce overflows freely across section boundaries; root has `overflow-x:hidden` only). Section color changes happen through curves or gradients: hero/services on cream → sand wave → Réalisations fades back to cream via gradient → ink wave cap → RDV (ink) → ink wave cap → footer on cream. The yellow lemon disc on RDV sits fully visible across the top wave.

## Interactions & animation summary
- Smooth anchor scrolling (`scroll-behavior: smooth`), sticky nav.
- Hero produce: rAF loop — pointer parallax (lemon −18/−10px, tomato +26/+14px, fig +44/+22px), slow sine float, and scroll-linked rotation/translation over the first 700px (lemon rotates −14°→136°, tomato 12°→−98° and scales to .85, fig rises 260px and spins 220°). See `updateHero()` in the reference for exact formulas.
- Wave section: see §4, `updateWave()`.
- Gallery filter: client-side, instant.
- Pause rAF when tab hidden; honor reduced motion.

## Content file — `contenu.json`
```json
{
  "formspree": "https://formspree.io/f/XXXX",
  "realisations": [
    { "titre": "Shakshuka verte", "label": "brunch", "categorie": "Dîners", "couleur": "#b9d98a", "photo": "photos/shakshuka.jpg" }
  ]
}
```
`photo` = image path or URL; any other text shows the colored placeholder tile. Filters derive from `categorie`.

## To fix before launch (known inconsistencies)
- Add a Mentions légales page (SIRET, host), RGPD notice, favicon (the yellow pepper), OG image, meta title/description, `lang="fr"`.
- Replace placeholder photos.

## Assets
- All illustrations are inline SVG in the reference file (hero lemon/tomato/fig, wave fig/pomegranate/pepper, logo pepper, seed bullets). Extract them.
- `references/` — produce images the client supplied as style inspiration for the illustrations.
- No raster photos yet.

## Files
- `Chef a domicile - Landing.dc.html` — full design reference (markup + logic class at bottom with animation formulas)
- `support.js` — runtime needed to open the reference in a browser
- `contenu.json` — editable content (gallery + Formspree URL)
- `references/*.png` — inspiration images
