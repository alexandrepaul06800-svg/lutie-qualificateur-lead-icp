# Charte Graphique Lutie - Specification Exacte

> Document de reference pour reproduire a l'identique le design system de lutie.webflow.io
> Toute nouvelle page, outil ou composant DOIT respecter ces specifications sans ecart.

---

## 1. PALETTE DE COULEURS

### Couleurs principales
| Nom | Hex | Usage |
|-----|-----|-------|
| **Jaune primaire** | `#fcb800` | CTAs, boutons, accents, barres de progression, highlights |
| **Jaune primaire alt** | `#febb02` | Variante accent (tracking page, cards optimisees) |
| **Jaune clair** | `#ffedb3` | Fond boutons secondaires, hover states legers |
| **Jaune fond** | `#fff8e5` | Background cards "optimise", sections highlight |

### Couleurs sombres
| Nom | Hex | Usage |
|-----|-----|-------|
| **Navy fonce** | `#19345c` | Navigation, elements de controle, sliders |
| **Noir quasi** | `#1a1a1a` | Elements secondaires fonces |
| **Texte titre** | `#333333` | Headings principaux |
| **Texte corps** | `#666666` | Body text, paragraphes |
| **Texte secondaire** | `#495057` | Texte intermediaire |
| **Brun fonce** | `rgb(50, 47, 41)` | Strokes, texte sur fond clair |

### Gris et neutres
| Nom | Hex | Usage |
|-----|-----|-------|
| **Fond clair** | `#f8f9fa` | Background sections alternees |
| **Gris moyen** | `#e9ecef` | Separateurs, fond secondaire |
| **Gris bordure** | `#dee2e6` | Bordures subtiles, input borders |
| **Gris clair** | `#e1e1e1` | Bordures legeres |
| **Blanc** | `#ffffff` | Fond cards, overlays, texte sur fond sombre |

### Couleurs fonctionnelles
| Nom | Hex | Usage |
|-----|-----|-------|
| **Violet** | `#a19aff` | Barres de progression "broken state" |
| **Violet fond** | `#f2f1ff` | Background cards etat "broken" |
| **Vert conformite** | `#10b981` | Widgets GDPR, indicateurs de conformite |
| **Bleu actif** | `#007bff` | Etat actif boutons play/pause |

### Transparences
| Valeur | Usage |
|--------|-------|
| `rgba(0,0,0,0.1)` | Ombres legeres |
| `rgba(0,0,0,0.15)` | Ombres hover |
| `rgba(0,0,0,0.2)` | Ombres fortes, boutons |
| `rgba(255,255,255,0.03)` | Profondeur subtile sur fond sombre |

---

## 2. TYPOGRAPHIE

### Familles de polices (ordre de priorite)

| Police | Poids charges | Usage principal |
|--------|--------------|-----------------|
| **Plus Jakarta Sans** | 400, 500, 600, 700, 800, italic | **Police principale** - Titres et corps de texte |
| **Montserrat** | 100-900 | Titres de sections, headlines hero |
| **Inter** | 400, 700 | Corps de texte, elements UI |
| **Ubuntu** | 300, 400, 500, 700 | Texte secondaire, labels |
| **Archivo** | 400, 500, 600, 700 | Accents, elements specifiques |
| **Bricolage Grotesque** | 400, 500 | Accents decoratifs |

### Hierarchie typographique

| Element | Taille | Poids | Line-height | Remarques |
|---------|--------|-------|-------------|-----------|
| **H1 Hero** | 48-64px | 800 (Extra Bold) | 1.1-1.2 | Majuscules ou mix, Montserrat/Plus Jakarta |
| **H2 Section** | 32-40px | 700 (Bold) | 1.2-1.3 | Titres de sections principales |
| **H3 Sous-section** | 24px | 600-700 | 1.3 | Titres de cards, sous-sections |
| **H4 Card title** | 20px | 600 | 1.4 | Titres dans les cards |
| **Body large** | 16px | 400 | 1.6 | Paragraphes principaux |
| **Body** | 14px | 400 | 1.4-1.6 | Corps de texte standard |
| **Small** | 13px | 400 | 1.4 | Labels, metadata |
| **Caption** | 12px | 400-500 | 1.3 | Tags, badges, mentions legales |

### Regles typographiques
- Les titres de sections utilisent souvent des **minuscules volontaires** ("pourquoi choisir lutie ?") = style decontracte/accessible
- Certains mots-cles sont en **gras** dans les paragraphes pour creer du contraste
- Letter-spacing: normal (pas d'espacement additionnel sauf cas specifique)

---

## 3. BOUTONS

### Bouton principal (CTA) - `.heypongo-btn`
```css
display: inline-flex;
align-items: center;
justify-content: center;
background-color: #fcb800;
color: #333333;
font-weight: 600;
font-size: 14-16px;
padding: 12px 24px;
border-radius: 8-10px;
border: none;
cursor: pointer;
overflow: visible; /* important pour les animations Lottie */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

**Hover state:**
```css
transform: scale(1.05);
/* Les animations Lottie apparaissent sur les cotes gauche/droit */
/* Containers d'animation: 40px x 40px */
```

**Specificite Lottie:**
- Deux containers d'animation (gauche + droite) flanquent le texte du bouton
- Les animations sont des traits/strokes jaunes qui se dessinent au hover
- Les animations sont declenchees par `mouseenter` et se jouent en avant
- Au `mouseleave`, elles se jouent en arriere

### Bouton secondaire
```css
background-color: transparent;
color: #333333;
border: 2px solid #dee2e6;
padding: 12px 24px;
border-radius: 8-10px;
transition: all 0.3s ease;
```

### Bouton circulaire (play/pause, navigation)
```css
width: 50px;
height: 50px;
border-radius: 50%;
background-color: #ffedb3;
border: 2px solid #dee2e6;
transition: all 0.3s ease;
/* Hover: scale(1.05) */
/* Active state: background #007bff, couleur icone blanc */
```

---

## 4. CARDS & COMPOSANTS

### Card standard (`.slider-card`)
```css
background: #ffffff;
border-radius: 15px;
padding: 30px;
min-width: 300px;
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease;
/* Hover: */
transform: translateY(-10px);
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
```

### Card interactive (`.interactive-card`)
```css
border: 6px solid #ffffff;
height: 360px;
overflow: hidden;
border-radius: 15px;
/* Hover: image interne scale(1.05) */
/* Contenu overlay glisse vers le haut en 0.3s */
```

### Card equipe (`.team-info-card`)
```css
/* Cards expansibles au hover/click */
/* Transition max-height pour reveal du contenu */
/* Contient: photo, nom, role, description, specialites */
```

### Card etude de cas
```css
/* Contient: logo client, titre, description, metriques */
/* Metriques mises en avant: -20% CPA, +28% ROAS, etc. */
/* Les chiffres de metriques utilisent le jaune #fcb800 ou sont en gras */
```

### Card metrique/comparaison
```css
/* Etat "broken": background #f2f1ff, barres #a19aff */
/* Etat "optimise": background #fff8e5, barres #febb02 */
/* Max-width: 350px */
/* Affiche: conversions, CPA, ROAS avec barres de progression */
```

### Card processus/methodologie (accordion)
```css
/* Expandable au click */
/* Premier element ouvert par defaut */
/* Support clavier: tabindex="0", Enter/Space */
/* Transition smooth sur max-height */
/* 4 phases: Comprendre > Prioriser > Decider > Construire */
```

---

## 5. TEXTURE GRAIN

Appliquee sur la majorite des sections comme overlay decoratif.

```css
.section-grain {
  background-image: url('grain-texture.webp');
  background-size: 6.25rem 6.25rem; /* 100px x 100px */
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}
```

**Important:** Cette texture est un element signature du design Lutie. Elle doit etre presente sur toutes les sections de fond colore ou blanc.

---

## 6. OMBRES (Box Shadows)

| Nom | Valeur | Usage |
|-----|--------|-------|
| **Shadow legere** | `0 2px 8px rgba(0,0,0,0.2)` | Boutons, petits elements |
| **Shadow card** | `0 10px 30px rgba(0,0,0,0.1)` | Cards au repos |
| **Shadow card hover** | `0 20px 40px rgba(0,0,0,0.15)` | Cards au survol |
| **Shadow modale** | `0 25px 50px rgba(0,0,0,0.2)` | Modales, overlays importants |

---

## 7. BORDER RADIUS

| Taille | Valeur | Usage |
|--------|--------|-------|
| **XS** | `2px` | Barres de progression |
| **S** | `5px` | Petits elements, tags |
| **M** | `10px` | Boutons, inputs |
| **L** | `15px` | Cards, containers |
| **XL** | `20px` | Grandes cards, modales |
| **Rond** | `50%` | Boutons circulaires, avatars |

---

## 8. ESPACEMENTS

### Systeme de spacing
| Token | Valeur | Usage |
|-------|--------|-------|
| **xs** | `8px` | Gap entre petits elements |
| **sm** | `10px` | Gap controles, padding compact |
| **md** | `15px` | Padding cards compact, gap elements |
| **lg** | `20px` | Gap entre cards, padding sections |
| **xl** | `25px` | Padding intermediaire |
| **2xl** | `30px` | Padding cards standard |
| **3xl** | `40px` | Espacement entre sections |
| **4xl** | `60px` | Grandes separations de sections |
| **5xl** | `80-100px` | Margin top/bottom de sections majeures |

---

## 9. ANIMATIONS & TRANSITIONS

### Transitions standard
```css
/* Transition par defaut */
transition: all 0.3s ease;

/* Transition boutons CTA */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Transition slider/carousel */
transition: transform 0.5s ease-in-out;

/* Transition rapide (progress bars) */
transition: all 0.1s linear;
```

### Animation texte lettre par lettre
```css
/* Utilise Anime.js */
/* Duration: 1200ms */
/* Stagger: 100ms entre chaque lettre */
/* Speed factor: 0.85x */
/* Trigger: IntersectionObserver au scroll */
/* Propriete animee: opacity 0 > 1 */
```

### Animation scroll infini (logos clients)
```css
@keyframes scroll {
  /* Duration: 40-50s */
  /* Timing: linear infinite */
  /* Les logos sont dupliques pour creer une boucle continue */
}
```

### Hover cards
```css
/* translateY(-10px) + shadow augmentee */
/* Images internes: scale(1.05) */
/* Duree: 0.3s */
```

### Slider auto (temoignages)
```css
/* Scroll pixel par pixel a 30ms d'intervalle */
/* Navigation par fleches prev/next */
```

---

## 10. LAYOUT & GRILLE

### Container principal
```css
max-width: 1920px;
margin: 0 auto;
/* Padding lateral: 20-40px selon la section */
```

### Systeme de layout
- **Pas de grid CSS** : tout est en **Flexbox**
- `display: flex` avec `flex-wrap: wrap` pour les grilles de cards
- `gap: 20px` entre les cards
- Les sections sont full-width avec contenu centre

### Structure de section type
```html
<section class="section" style="position: relative; overflow: hidden;">
  <!-- Texture grain -->
  <div class="section-grain"></div>

  <!-- Contenu -->
  <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 80px 20px; position: relative; z-index: 2;">
    <h2>Titre de section</h2>
    <p>Description</p>
    <div class="cards-wrapper" style="display: flex; gap: 20px; flex-wrap: wrap;">
      <!-- Cards -->
    </div>
  </div>
</section>
```

### Breakpoints responsive
| Breakpoint | Largeur | Ajustements |
|------------|---------|-------------|
| **Desktop** | > 768px | Layout par defaut |
| **Mobile** | <= 768px | Cards min-width: 250px, padding: 20px, stack vertical |

---

## 11. NAVIGATION

### Header
```css
/* Position: sticky ou fixed top */
/* Background: blanc ou transparent avec blur */
/* Hauteur: ~70-80px */
/* Logo a gauche */
/* Liens centres */
/* CTA "Prendre rendez-vous" a droite */
```

### Structure du menu
```
Logo | L'agence (dropdown) | Nos services | Ressources | Contact | [CTA Prendre RDV]
```

### Dropdown "L'agence"
- Qui sommes nous ?
- Le manifeste
- L'histoire
- Carriere

### Style des liens nav
```css
font-size: 14-16px;
font-weight: 500;
color: #333333;
text-decoration: none;
transition: color 0.3s ease;
/* Hover: couleur #fcb800 ou opacity change */
```

---

## 12. FOOTER

### Structure
```
[Logo + baseline] | [L'agence] | [Nos services] | [Ressources]
                  |  - Qui sommes nous | - Google Ads  | - Blog
                  |  - Le manifeste    | - Meta Ads    | - Simulateur
                  |  - L'histoire      | - Youtube Ads | - Audit en ligne
                  |  - Carriere        | - Tracking    | - Newsletter
                  |                    | - Landing page| - E-book
                  |                    | - Creatives   |

[Trust indicators: 4.98/5 | +200 marques | +2M€ gestion | Google Partner]
[Politique confidentialite | Mentions legales]
[lutie (c) 2025 Tous droits reserves]
```

### Style footer
```css
background: dark (fond sombre, probablement #1a1a1a ou #19345c);
color: #ffffff;
/* Liens en blanc, underline au hover */
/* Texte copyright: small, muted */
/* Badges partenaires: Google Partner, Sortlist, Messenger Marketing */
```

---

## 13. ELEMENTS SPECIFIQUES

### Badge "places restantes"
```css
/* Texte: "3 places restantes ce trimestre" */
/* Apparait a plusieurs endroits */
/* Style: badge/tag avec fond jaune clair ou bordure jaune */
```

### Metriques mises en avant
```css
/* Format: "+150", "X3", "2M€+", etc. */
/* Taille: grande (32-48px) */
/* Poids: 700-800 */
/* Couleur: #333 ou #fcb800 pour l'accent */
```

### Carousel de logos clients
```css
/* Animation continue horizontale */
/* Logos en niveaux de gris ou couleur */
/* Double instance pour boucle infinie */
/* Vitesse: 40-50s pour un cycle complet */
```

### Tags d'expertise (carousel scrollant)
```
Tracking server-side | Google Ads | Meta Ads | TikTok Ads | Google Shopping
Google Merchant Center | Google Tag Manager | Google Analytics 4
Data & analytics | Scaling Ads | Creatives publicitaires
```

### Widget GDPR (page tracking)
```css
/* Jauge circulaire avec radial gradient */
/* Couleur remplissage: #10b981 */
/* Animation: stroke-dasharray */
/* Points indicateurs avec effet glow */
```

### Comparaison "Sans Lutie / Avec Lutie"
```css
/* Layout: 2 colonnes cote a cote */
/* Colonne gauche (sans): fond neutre, elements negatifs */
/* Colonne droite (avec): fond jaune clair, elements positifs */
/* Icones check/cross pour illustrer */
```

### FAQ Accordion
```css
/* Questions cliquables avec expand/collapse */
/* Icone +/- ou chevron a droite */
/* Transition smooth sur max-height */
/* Bordure bottom entre chaque item */
```

---

## 14. ICONOGRAPHIE

- **Logos plateformes**: SVG (Google Ads, Meta, TikTok, GMC, GA4, GTM)
- **Icones UI**: Style line/outline, trait fin
- **Pas de bibliotheque d'icones specifique identifiee** - probablement custom SVG
- **Lottie animations**: Utilisees pour les CTAs (strokes jaunes animes)

---

## 15. IMAGERIE

### Traitement des images
```css
border-radius: 15-20px; /* Suit le radius du container */
object-fit: cover;
box-shadow: 0 10px 30px rgba(0,0,0,0.1); /* Optionnel */
```

### Mockups
- iPhone mockups pour les dashboards
- Screenshots d'interfaces avec coins arrondis
- Photos d'equipe naturelles, pas corporate

### Style photo
- Tons chauds, naturels
- Pas de filtre excessif
- Professionnelles mais accessibles

---

## 16. TONE & VOICE DU DESIGN

- **Decontracte mais professionnel** : minuscules volontaires dans les titres, tutoiement implicite
- **Data-driven** : chiffres et metriques mis en avant partout
- **Urgence douce** : "3 places restantes", "audit 100% offert"
- **Transparence** : "100% transparence 0% bullshit"
- **Expertise accessible** : jargon ads mais explique

---

## 17. REGLES D'APPLICATION

### Pour creer une nouvelle page :
1. Utiliser la **texture grain** sur toutes les sections
2. Respecter la **palette jaune/navy/gris** sans exception
3. Boutons CTA toujours en **jaune #fcb800** avec animations Lottie si possible
4. Cards avec **border-radius 15px**, **shadow 0 10px 30px**, **hover translateY(-10px)**
5. Typography **Plus Jakarta Sans** en priorite, **Montserrat** pour les headlines hero
6. Sections alternees **fond blanc** / **fond #f8f9fa**
7. Footer et header identiques sur toutes les pages
8. Inclure le **carousel de logos clients** si pertinent
9. Metriques toujours en **gros et gras** avec chiffres accentues
10. **Responsive a 768px** : stack vertical, padding reduit

### Pour creer un nouvel outil :
1. S'integrer visuellement comme une page du site
2. Utiliser les memes cards, boutons, couleurs
3. Inputs : border `#dee2e6`, border-radius `10px`, padding `12px 16px`
4. Resultats/outputs dans des cards avec fond `#f8f9fa` ou `#fff8e5`
5. Barres de progression en `#fcb800`
6. Messages d'erreur/succes : utiliser les couleurs fonctionnelles
7. La texture grain doit etre presente

---

## 18. FICHIERS DE REFERENCE

- **Texture grain**: `grain-texture.webp` (100x100px, tile)
- **Animations Lottie**: Strokes jaunes pour boutons CTA
- **Polices**: Chargees via Google Fonts
  - `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap`
  - `https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap`
  - `https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap`
  - `https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap`
  - `https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&display=swap`
  - `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500&display=swap`
