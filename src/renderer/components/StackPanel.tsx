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
    <section className="panel stack-workbench-panel">
      <div className="panel-header stack-workbench-header">
        <div>
          <span className="overline">Stack / Files</span>
          <h2>Base générée</h2>
        </div>
        <span>{stack.length} couches · {docs.length} fichiers</span>
      </div>
      <div className="stack-panel-strip">
        <StackLogoStrip techIds={techIds} />
      </div>
      <div className="stack-docs-layout">
        <div className="stack-list" aria-label="Stack recommandee">
          <span className="stack-section-label">Stack</span>
          {stack.map((item) => (
            <div className="stack-item" key={item}>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
        <div className="doc-table" aria-label="Fichiers generes">
          <div className="doc-row doc-row-head">
            <strong>Fichier</strong>
            <span>Rôle</span>
            <em>État</em>
          </div>
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
