import type { ArchitectureCombo } from "../../shared/types";

interface ComboPanelProps {
  combos?: ArchitectureCombo[];
}

const fitLabels: Record<ArchitectureCombo["fit"], string> = {
  recommended: "Simple recommande",
  lean: "Formulaire/API legere",
  scalable: "Scalable",
  specialized: "Avec backoffice",
  avoid: "A eviter"
};

const firebaseLabels: Record<ArchitectureCombo["firebaseRole"], string> = {
  "not-needed": "Firebase inutile",
  optional: "Firebase optionnel",
  recommended: "Firebase coherent",
  required: "Firebase requis"
};

export function ComboPanel({ combos }: ComboPanelProps) {
  if (!combos?.length) return null;

  return (
    <section className="panel combo-panel">
      <div className="panel-header">
        <h2>Options d'hebergement et donnees</h2>
        <span>details seulement si le verdict change</span>
      </div>
      <div className="combo-help">
        <strong>Comment lire ces choix ?</strong>
        <span>
          Ces options expliquent les bascules possibles. Le verdict au-dessus reste le choix par defaut tant que ce starter n'ajoute pas formulaire serveur,
          comptes, donnees ou gros fichiers.
        </span>
      </div>
      <div className="combo-list">
        {combos.map((combo, index) => (
          <details className={`combo-card ${combo.fit}`} key={combo.id} open={index === 0}>
            <summary>
              <span className="combo-rank">{fitLabels[combo.fit]}</span>
              <strong>{combo.label}</strong>
              <em>{combo.estimatedCost}</em>
              <span className="combo-toggle" aria-hidden="true" />
            </summary>
            <div className="combo-body">
              <div className="combo-stack" aria-label="Stack">
                {combo.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className={`firebase-role ${combo.firebaseRole}`}>{firebaseLabels[combo.firebaseRole]}</div>
              <p>{combo.bestFor}</p>
              <div className="combo-columns">
                <div>
                  <h3>Points a surveiller</h3>
                  <ul>
                    {combo.tradeoffs.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Decision</h3>
                  <ul>
                    {combo.details.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
