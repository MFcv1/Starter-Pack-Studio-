import type { StarterPack } from "../../shared/types";
import { StackLogoStrip } from "./StackLogoStrip";

interface StackPanelProps {
  starter: StarterPack;
}

export function StackPanel({ starter }: StackPanelProps) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Stack et fichiers générés</h2>
        <span>{starter.docs.length} docs</span>
      </div>
      <div className="stack-panel-strip">
        <StackLogoStrip techIds={starter.stackTechIds} />
      </div>
      <div className="stack-docs-layout">
        <div className="stack-list">
          {starter.recommendedStack.map((item) => (
            <div className="stack-item" key={item}>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
        <div className="doc-table">
          {starter.docs.map((doc) => (
            <div className="doc-row" key={doc.path}>
              <strong>{doc.path}</strong>
              <span>{doc.purpose}</span>
              <em>{doc.required ? "required" : "optional"}</em>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
