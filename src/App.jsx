import { useState, useEffect, useRef } from "react"
import Lottie from "lottie-react"
import "./App.css"

const ICP_FIELDS = [
  { key: "secteurs", label: "Secteurs ciblés", placeholder: "Ex : E-commerce mode, beauté, maison" },
  { key: "taille", label: "Taille d'entreprise", placeholder: "Ex : 10-200 salariés, PME" },
  { key: "geo", label: "Zone géographique", placeholder: "Ex : France, Belgique, Suisse" },
  { key: "ca", label: "CA estimé", placeholder: "Ex : 500k€ - 5M€" },
  { key: "signaux_positifs", label: "Signaux positifs", placeholder: "Ex : Site e-commerce avec budget Ads visible, présence Google Shopping" },
  { key: "signaux_exclusion", label: "Signaux d'exclusion", placeholder: "Ex : Dropshipping, marketplace uniquement" },
  { key: "probleme", label: "Problème résolu", placeholder: "Ex : ROAS insuffisant, tracking défaillant" },
]

const DEFAULT_ICP = {
  secteurs: "",
  taille: "",
  geo: "",
  ca: "",
  signaux_positifs: "",
  signaux_exclusion: "",
  probleme: "",
}

function LottieButton({ href, children, className = "" }) {
  const [animData, setAnimData] = useState(null)
  const lottieRef = useRef(null)

  const handleMouseEnter = () => {
    if (!animData) {
      fetch("/lottie-btn.json")
        .then(r => r.json())
        .then(data => {
          setAnimData(data)
          setTimeout(() => lottieRef.current?.play(), 50)
        })
        .catch(() => {})
    } else {
      lottieRef.current?.play()
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn--primary lottie-btn ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => lottieRef.current?.stop()}
    >
      {animData && (
        <Lottie
          lottieRef={lottieRef}
          animationData={animData}
          loop
          autoplay={false}
          style={{ width: 24, height: 24 }}
        />
      )}
      {children}
    </a>
  )
}

function ScoreBadge({ score }) {
  let niveau, color, bg
  if (score >= 70) { niveau = "Coeur de cible"; color = "#057a55"; bg = "#d1fae5" }
  else if (score >= 55) { niveau = "Bonne piste"; color = "#065f46"; bg = "#a7f3d0" }
  else if (score >= 40) { niveau = "Potentiel"; color = "#92400e"; bg = "#fef3c7" }
  else { niveau = "Hors cible"; color = "#991b1b"; bg = "#fee2e2" }

  return (
    <div className="score-display">
      <div className="score-circle" style={{ color, borderColor: color, background: bg }}>
        <span className="score-number">{score}</span>
        <span className="score-max">/100</span>
      </div>
      <span className="score-badge" style={{ color, background: bg, border: `1.5px solid ${color}` }}>
        {niveau}
      </span>
    </div>
  )
}

function CriteresTable({ criteres }) {
  return (
    <div className="criteres-table">
      <div className="criteres-header">
        <span>Critère</span>
        <span>Attendu</span>
        <span>Détecté</span>
        <span>Match</span>
      </div>
      {criteres.map((c, i) => (
        <div key={i} className="criteres-row">
          <span className="critere-nom">{c.nom}</span>
          <span className="critere-attendu">{c.attendu}</span>
          <span className="critere-detecte">{c.detecte}</span>
          <span className="critere-match">{c.match ? "✅" : "❌"}</span>
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const [icpConfig, setIcpConfig] = useState(() => {
    try {
      const saved = localStorage.getItem("lutie-icp-config")
      return saved ? JSON.parse(saved) : DEFAULT_ICP
    } catch {
      return DEFAULT_ICP
    }
  })
  const [showIcpConfig, setShowIcpConfig] = useState(() => {
    try {
      const saved = localStorage.getItem("lutie-icp-config")
      const parsed = saved ? JSON.parse(saved) : null
      return !parsed || Object.values(parsed).every(v => !v)
    } catch {
      return true
    }
  })

  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    localStorage.setItem("lutie-icp-config", JSON.stringify(icpConfig))
  }, [icpConfig])

  const handleIcpChange = (key, value) => {
    setIcpConfig(prev => ({ ...prev, [key]: value }))
  }

  const handleAnalyze = async () => {
    setError("")
    setResult(null)

    if (!url.startsWith("http")) {
      setError("L'URL doit commencer par https://")
      return
    }

    setLoading(true)

    try {
      // Step 1: Fetch page content via Jina Reader
      const jinaUrl = `https://r.jina.ai/${encodeURIComponent(url)}`
      let pageContent = ""
      try {
        const jinaRes = await fetch(jinaUrl)
        if (!jinaRes.ok) throw new Error("Jina error")
        pageContent = await jinaRes.text()
        // Limit to reasonable size
        pageContent = pageContent.slice(0, 8000)
      } catch {
        setError("Impossible de lire le site. Essaie avec l'URL complète (avec https://).")
        setLoading(false)
        return
      }

      // Step 2: Send to backend API
      const apiRes = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, pageContent, icpConfig }),
      })

      const data = await apiRes.json()

      if (!apiRes.ok) {
        setError(data.error || "Une erreur est survenue lors de l'analyse.")
        setLoading(false)
        return
      }

      setResult(data)
    } catch {
      setError("Une erreur inattendue est survenue. Réessaie dans quelques instants.")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setUrl("")
    setError("")
  }

  return (
    <div className="tool-wrapper">
      <div className="grain-overlay" />
      <div className="tool-container">

        {/* Header */}
        <header className="tool-header">
          <img
            src="https://cdn.prod.website-files.com/68b6be52d4cf251987cb0b82/68b7ba9e3b082f85f53e7e3e_lutie-logo.svg"
            alt="Lutie"
            height="32"
            className="tool-logo"
          />
          <h1 className="tool-title">Ce prospect correspond-il à ton profil client idéal&nbsp;?</h1>
          <p className="tool-subtitle">Entre l'URL d'un prospect. L'IA analyse son site et le compare à ton ICP — en 30 secondes.</p>
        </header>

        {/* Section 1 : ICP Config */}
        <div className="card icp-card">
          <button
            className="icp-toggle"
            onClick={() => setShowIcpConfig(s => !s)}
            aria-expanded={showIcpConfig}
          >
            <span className="icp-toggle-icon">{showIcpConfig ? "▾" : "▸"}</span>
            <span className="icp-toggle-title">Mon ICP (Profil Client Idéal)</span>
            {!showIcpConfig && (
              <span className="icp-toggle-hint">Cliquer pour modifier</span>
            )}
          </button>

          {showIcpConfig && (
            <div className="icp-fields">
              <p className="icp-desc">Configure ton ICP une fois — il sera sauvegardé pour toutes tes analyses.</p>
              <div className="grid-2">
                {ICP_FIELDS.map(field => (
                  <div key={field.key} className="input-group">
                    <label className="input-label">{field.label}</label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={icpConfig[field.key]}
                      onChange={e => handleIcpChange(field.key, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <p className="icp-saved-hint">Sauvegarde automatique activée</p>
            </div>
          )}
        </div>

        {/* Section 2 : Analyser un prospect */}
        {!result ? (
          <div className="card analyze-card">
            <h2 className="analyze-title">Analyser un prospect</h2>
            <p className="analyze-desc">
              Entre l'URL du site de ton prospect. L'IA va lire son site et évaluer sa compatibilité avec ton ICP.
            </p>

            <div className="url-input-row">
              <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
                <label className="input-label">URL du prospect</label>
                <input
                  type="text"
                  placeholder="https://exemple.com"
                  value={url}
                  onChange={e => {
                    setUrl(e.target.value)
                    setError("")
                  }}
                  onKeyDown={e => e.key === "Enter" && !loading && handleAnalyze()}
                  disabled={loading}
                />
                {error && <p className="error-msg">{error}</p>}
              </div>
              <button
                className="btn btn--primary analyze-btn"
                onClick={handleAnalyze}
                disabled={loading || !url.trim()}
              >
                {loading ? (
                  <>
                    <span className="spinner" />
                    Analyse en cours…
                  </>
                ) : (
                  "Analyser ce prospect"
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="result-section">
            {/* Score */}
            <div className="card result-header-card">
              <div className="result-url-label">Analyse de</div>
              <div className="result-url">{url}</div>
              <ScoreBadge score={result.score} />
            </div>

            {/* Critères */}
            <div className="card">
              <h3 className="section-title">Analyse par critère</h3>
              {result.criteres && <CriteresTable criteres={result.criteres} />}
            </div>

            {/* Résumé & Recommandation */}
            <div className="grid-2">
              <div className="card">
                <h3 className="section-title">Résumé</h3>
                <p className="result-text">{result.resume}</p>
              </div>
              <div className="card card--highlight">
                <h3 className="section-title">Recommandation commerciale</h3>
                <p className="result-text">{result.recommandation}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="result-actions">
              <button className="btn btn--secondary" onClick={handleReset}>
                ← Analyser un autre prospect
              </button>
              <LottieButton href="https://lutie.webflow.io/contact">
                Tu veux qu'on qualifie tes leads pour toi ?
              </LottieButton>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="tool-footer">
          Outil gratuit par <a href="https://lutie.webflow.io" target="_blank" rel="noopener noreferrer">Lutie</a> — Agence Google Ads &amp; Meta Ads
        </footer>
      </div>
    </div>
  )
}
