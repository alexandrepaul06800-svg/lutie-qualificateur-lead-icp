// Vercel Serverless Function — Proxy API Anthropic
// Route : POST /api/analyze
// Body  : { content: string, icp: object }

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { content, icp } = req.body

  if (!content || !icp) {
    return res.status(400).json({ error: 'Missing content or icp' })
  }

  const prompt = `Tu es un expert en qualification B2B pour une agence Google Ads & Meta Ads.

Voici l'ICP (profil client idéal) de l'agence :
- Secteurs ciblés : ${icp.sectors || 'Non précisé'}
- Taille d'entreprise : ${icp.size || 'Non précisé'}
- Zone géographique : ${icp.geo || 'Non précisé'}
- CA estimé : ${icp.revenue || 'Non précisé'}
- Signaux positifs recherchés : ${icp.positiveSignals || 'Non précisé'}
- Signaux d'exclusion : ${icp.exclusionSignals || 'Non précisé'}
- Problème résolu par l'agence : ${icp.problem || 'Non précisé'}

Voici le contenu public du site web du prospect :
---
${content.slice(0, 8000)}
---

Analyse ce prospect par rapport à l'ICP. Réponds UNIQUEMENT en JSON valide avec cette structure exacte :
{
  "score": <nombre entre 0 et 100>,
  "niveau": <"Hors cible" | "Potentiel" | "Bonne piste" | "Cœur de cible">,
  "criteres": [
    { "nom": "Secteur", "attendu": "...", "detecte": "...", "match": <true|false> },
    { "nom": "Taille", "attendu": "...", "detecte": "...", "match": <true|false> },
    { "nom": "Zone géo", "attendu": "...", "detecte": "...", "match": <true|false> },
    { "nom": "Signal Ads", "attendu": "Présence publicitaire", "detecte": "...", "match": <true|false> },
    { "nom": "Signal exclusion", "attendu": "...", "detecte": "...", "match": <true|false> }
  ],
  "resume": "<2-3 phrases en français décrivant le prospect>",
  "recommandation": "<1-2 phrases avec angle d'approche commercial suggéré>"
}`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`)
    }

    const data = await response.json()
    const text = data.content[0].text

    // Extraire le JSON de la réponse
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in response')

    const result = JSON.parse(jsonMatch[0])
    return res.status(200).json(result)

  } catch (err) {
    console.error('Analyze error:', err)
    return res.status(500).json({ error: 'Erreur lors de l\'analyse. Réessaie.' })
  }
}
