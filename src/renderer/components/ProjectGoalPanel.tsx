import { starterChoices } from "../../shared/recommendationEngine";
import type { StarterId } from "../../shared/types";

interface ProjectGoalPanelProps {
  activeStarterId: StarterId;
  onSelect: (starterId: StarterId) => void;
}

export function ProjectGoalPanel({ activeStarterId, onSelect }: ProjectGoalPanelProps) {
  return (
    <section className="panel goal-panel">
      <div className="panel-header">
        <h2>Starters évidents</h2>
        <span>choisir une base claire, puis lire le verdict</span>
      </div>
      <div className="goal-grid">
        {starterChoices.map((choice) => (
          <button
            className={choice.starterId === activeStarterId ? "goal-card active" : "goal-card"}
            key={choice.starterId}
            onClick={() => onSelect(choice.starterId)}
            type="button"
          >
            <strong>{choice.label}</strong>
            <span>{choice.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
