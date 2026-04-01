# Outil V — Qualificateur de lead B2B par IA

## Nom public
**"Ce lead correspond-il vraiment à ta cible ?"**
Slug suggéré : `/outils/qualificateur-lead`

## Résumé
L'utilisateur définit son ICP une fois. Ensuite, pour chaque lead entrant, il colle l'URL du site — l'IA analyse automatiquement l'entreprise et la score par rapport à l'ICP défini, avec un verdict structuré et une recommandation commerciale.

## Cible principale
Profil 2 — Scale-up / PME B2B en génération de leads (SaaS, services B2B, conseil, formation)

## Douleur adressée
"On génère 200 leads/mois mais les commerciaux disent que 70% sont hors-cible." Le problème n'est pas le volume — c'est que personne ne qualifie rapidement et objectivement. Ce travail est soit inexistant, soit fait manuellement et de façon incohérente selon le commercial.

## Accroche
> "Colle l'URL d'un lead. En 10 secondes, tu sais s'il correspond à ta cible."

## Comment ça marche

### Écran 1 — Définition de l'ICP (une seule fois, sauvegardé)

**Critères firmographiques**
| Champ | Type | Exemple |
|---|---|---|
| Secteurs ciblés | tags multi-sélection | SaaS B2B, E-commerce, Retail |
| Taille d'entreprise | fourchette | 10 à 200 salariés |
| Zone géographique | tags | France, Europe francophone |
| CA estimé | fourchette | 1M à 20M€ |

**Critères qualitatifs**
| Champ | Type | Exemple |
|---|---|---|
| Signaux positifs recherchés | texte libre | "dépense en Google Ads", "a une équipe marketing", "vend en ligne" |
| Signaux d'exclusion | texte libre | "grand compte avec DSI", "organisme public", "franchise" |
| Problème que ton offre résout | texte libre | "tracking défaillant, ROAS qui plonge, landing pages non optimisées" |

> Stockage : localStorage côté client. Pas de compte requis. L'ICP persiste entre les sessions.

### Écran 2 — Analyse d'un lead

L'utilisateur entre une URL et clique sur "Analyser".

**Pipeline technique**
1. Fetch de l'URL via proxy backend (pour éviter les CORS) ou via Jina Reader API (`r.jina.ai/[url]`)
2. Extraction du texte brut (page d'accueil + /about + /services si disponibles)
3. Appel API Claude avec le contenu scrappé + l'ICP défini → analyse et scoring

**Prompt envoyé à Claude (template)**
```
Tu es un expert en qualification B2B.

Voici l'ICP (profil client idéal) de mon entreprise :
- Secteurs : [secteurs]
- Taille : [taille]
- Zone : [zone]
- CA : [ca]
- Signaux positifs : [signaux_positifs]
- Signaux d'exclusion : [signaux_exclusion]
- Problème résolu : [problème]

Voici le contenu public du site web du prospect :
[contenu_scrappé]

Analyse ce prospect par rapport à l'ICP et fournis :
1. Un score de 0 à 100
2. Un tableau critère par critère (attendu / détecté / match)
3. Un résumé en 2-3 phrases en langage naturel
4. Une recommandation commerciale avec angle d'approche suggéré

Réponds en JSON structuré.
```

**Structure de réponse JSON attendue de Claude**
```json
{
  "score": 78,
  "niveau": "Bonne piste",
  "criteres": [
    {"nom": "Secteur", "attendu": "E-commerce", "detecte": "Boutique Shopify mode", "match": true},
    {"nom": "Taille", "attendu": "10-200 salariés", "detecte": "~20-50 (estimé)", "match": true},
    ...
  ],
  "resume": "Cette entreprise est une PME e-commerce française dans la mode...",
  "recommandation": "À contacter. Angle suggéré : Google Ads tag détecté, tracking probablement non structuré."
}
```

### Outputs

**Score ICP** (grand format) : X / 100
**Niveau** : Hors cible (0–30) / Potentiel (31–55) / Bonne piste (56–75) / Cœur de cible (76–100)

**Tableau d'analyse par critère**
| Critère | Attendu | Détecté | Match |
|---|---|---|---|
| Secteur | E-commerce | Boutique Shopify mode | ✅ |
| Taille | 10–200 salariés | ~20–50 (estimé) | ✅ |
| Zone géo | France | .fr, mentions Lyon | ✅ |
| Signal Ads | Google Ads tag | Détecté | ✅ |
| Signal exclusion | Pas de grand compte | PME indépendante | ✅ |

**Résumé IA** (2–3 phrases en langage naturel)

**Recommandation commerciale** avec angle d'approche suggéré

**Historique des analyses** : les 10 dernières URLs analysées avec leur score (localStorage)

## UX & Copywriting

### Écran 1 — Setup ICP

**Headline** : "Dis-moi qui est ton client idéal."
**Sous-titre** : "2 minutes de setup. Ensuite, colle n'importe quelle URL — on score le fit en 10 secondes."

**Bouton "Voir un exemple"** : pré-remplit avec un ICP type (agence Ads ciblant des e-commerçants 500k-5M€) → montre le format sans effort.

**Labels conversationnels** :
- "Dans quels secteurs travaillent tes meilleurs clients ?" (pas "Secteurs ciblés")
- "Combien de personnes environ ?" (pas "Taille d'entreprise")
- "Où sont-ils ?" (pas "Zone géographique")
- "Quels signaux montrent qu'ils sont prêts à acheter ?" (pas "Signaux positifs")
- "Qui tu ne veux PAS en client ?" (pas "Signaux d'exclusion")

**Bouton de fin** : "Enregistrer mon ICP et analyser un lead →"

### Écran 2 — Analyse

**Headline** : "Colle le site de ton lead."
**Sous-titre** : "On analyse le fit avec ton ICP en quelques secondes."

**Input** : grand champ centré, placeholder `https://nomdelentreprise.fr`
**Bouton** : "Analyser ce lead" — jaune, large
**État loading** : animation + texte rotatif "Lecture du site..." / "Analyse du profil..." / "Comparaison avec ton ICP..."

**Historique** : lien discret "Mes X dernières analyses" en bas de page

### Résultats

Score en grand (ex : 78/100) + badge niveau
Tableau critères : compact, lisible
**Recommandation commerciale** : card mise en avant fond `#fff8e5`, titre "Comment les approcher :" — c'est la valeur perçue la plus forte

### Règles UX
- ICP sauvegardé → bouton "Modifier mon ICP" discret en haut à droite
- Erreur site inaccessible → message humain : "Ce site n'a pas pu être analysé. Essaie avec la page /about ou une autre URL."
- Analyse terminée → bouton "Analyser un autre lead" immédiatement visible

## Edge cases
- Site inaccessible (erreur 403/404/timeout) → message "Site inaccessible — essaie avec une autre URL (page /about par exemple)"
- Site trop pauvre en contenu (< 200 mots) → avertissement "Contenu insuffisant pour une analyse fiable"
- ICP non défini → rediriger vers l'écran 1
- Erreur API Claude → message d'erreur explicite avec possibilité de réessayer
- URL sans http → auto-ajouter `https://`

## Considérations techniques importantes
- **Clé API** : en v1, clé Anthropic côté client (acceptable pour un usage interne limité). En v2, proxy backend obligatoire pour sécuriser la clé.
- **Coût API** : environ 0.005–0.02€ par analyse selon la longueur du site (Claude Haiku recommandé pour limiter les coûts)
- **Rate limiting** : limiter à 10 analyses/heure en v1 pour éviter les abus (localStorage counter)
- **RGPD** : seules des données publiques (site web) sont envoyées. Pas de données personnelles. Mentionner dans l'interface.
- **Scraping** : Jina Reader (`r.jina.ai/`) est gratuit et efficace pour extraire le texte. Alternative : Firecrawl (payant, plus fiable).

## Stack technique
- Vite + React
- CSS pur
- Deux écrans gérés via useState (ICP setup / analyse)
- localStorage pour persistance de l'ICP et historique
- Jina Reader API pour le scraping (fetch côté client via r.jina.ai)
- API Anthropic (Claude) via une Vercel Serverless Function (proxy backend pour sécuriser la clé API)
- Déploiement : Vercel (frontend + serverless function dans le même repo)

## Design & UI
Respecter la charte graphique Lutie (`CHARTE_GRAPHIQUE_LUTIE.md`) :
- Écran 1 (ICP) : formulaire structuré en 2 blocs (firmographique / qualitatif), cards `border-radius: 15px`
- Écran 2 : input URL + bouton jaune "Analyser" + loader pendant l'analyse (animation)
- Score : grand chiffre centré, couleur selon niveau (vert/jaune/orange/rouge)
- Tableau critères : fond `#f8f9fa`, icônes ✅ / ❌
- Recommandation commerciale : card mise en avant, fond `#fff8e5`

## CTA
Texte : "Tu veux améliorer la qualité de tes leads à la source ? On analyse tes campagnes."
Destination : page de prise de contact / calendly Lutie

## Statut
- [ ] Maquette
- [ ] Développement
- [ ] Mise en ligne
