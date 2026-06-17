import type { StarterDecision } from "../../shared/types";

interface RecommendationPanelProps {
  decision: StarterDecision;
}

export function RecommendationPanel({ decision }: RecommendationPanelProps) {
  return (
    <section className="panel recommendation-panel">
      <div className="panel-header">
        <h2>Choix recommandé</h2>
        <span>{decision.rendering}</span>
      </div>
      <div className="verdict-card">
        <div>
          <span className="verdict-kicker">Verdict</span>
          <h2>{decision.title}</h2>
          <p>{decision.estimatedCost}</p>
          <div className="decision-stack" aria-label="Stack recommandée">
            {decision.recommendedStack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="verdict-columns">
          <div>
            <h3>Pourquoi</h3>
            <ul>
              {decision.why.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Coût / limites</h3>
            <ul>
              {decision.costLimits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>À éviter</h3>
            <ul>
              {decision.avoid.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="variant-grid" aria-label="Variantes qui changent le combo">
        {decision.variants.map((variant) => (
          <article className="variant-card" key={variant.id}>
            <strong>{variant.label}</strong>
            <span>{variant.trigger}</span>
            <p>{variant.impact}</p>
            <em>{variant.recommendedAddOn}</em>
            <small>{variant.costImpact}</small>
          </article>
        ))}
      </div>
      <details className="decision-details">
        <summary>Quand changer de combo</summary>
        <div className="decision-detail-grid">
          <div>
            <h3>Bascule</h3>
            <ul>
              {decision.whenChange.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Notes provider</h3>
            <ul>
              {decision.providerNotes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </details>
    </section>
  );
}
