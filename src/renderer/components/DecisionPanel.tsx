import type { StarterPack } from "../../shared/types";
import { DbFitPanel } from "./DbFitPanel";

interface DecisionPanelProps {
  starter: StarterPack;
}

export function DecisionPanel({ starter }: DecisionPanelProps) {
  const shortBadChoices = starter.badChoices.slice(0, 3);

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Decision d'architecture</h2>
        <span>{starter.shortLabel}</span>
      </div>
      <div className="decision-layout">
        <div>
          <h3>A retenir</h3>
          <p>{starter.intent}</p>
        </div>
        <div>
          <h3>A eviter</h3>
          <ul>
            {shortBadChoices.map((choice) => (
              <li key={choice}>{choice}</li>
            ))}
          </ul>
        </div>
      </div>
      <DbFitPanel database={starter.database} />
    </section>
  );
}
