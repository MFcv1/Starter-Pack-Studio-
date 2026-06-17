import { getDynamicDocsForCombo, getDynamicStackForCombo } from "../../shared/starterRegistry";
import type { ProviderId, StarterPack } from "../../shared/types";
import { StackLogoStrip } from "./StackLogoStrip";

interface StackPanelProps {
  starter: StarterPack;
  providerId: ProviderId;
}

export function StackPanel({ starter, providerId }: StackPanelProps) {
  const docs = getDynamicDocsForCombo(starter.id, providerId);
  const { stack, techIds } = getDynamicStackForCombo(starter.id, providerId);

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Stack et fichiers générés</h2>
        <span>{docs.length} docs</span>
      </div>
      <div className="stack-panel-strip">
        <StackLogoStrip techIds={techIds} />
      </div>
      <div className="stack-docs-layout">
        <div className="stack-list">
          {stack.map((item) => (
            <div className="stack-item" key={item}>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
        <div className="doc-table">
          {docs.map((doc) => (
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
