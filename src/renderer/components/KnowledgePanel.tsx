import { providerKnowledgeBase, seoKnowledgeBase } from "../../shared/recommendationEngine";
import type { ProviderId, StarterDecision } from "../../shared/types";

interface KnowledgePanelProps {
  decision: StarterDecision;
  providerId: ProviderId;
}

export function KnowledgePanel({ decision, providerId }: KnowledgePanelProps) {
  const selectedProvider = providerKnowledgeBase.find((provider) => provider.id === providerId);
  const relatedProviders = providerKnowledgeBase.filter((provider) => decision.sourceIds.includes(provider.id));
  const relatedSeo = seoKnowledgeBase.filter((seo) => decision.sourceIds.includes(seo.id));

  return (
    <section className="panel knowledge-panel">
      <div className="panel-header">
        <h2>Base de décision</h2>
        <span>coûts, limites, sources</span>
      </div>
      <details open>
        <summary>{selectedProvider ? selectedProvider.label : "Provider sélectionné"}</summary>
        {selectedProvider ? (
          <div className="knowledge-body">
            <p>{selectedProvider.summary}</p>
            <div className="knowledge-services">
              {selectedProvider.services.slice(0, 3).map((service) => (
                <article key={service.label}>
                  <strong>{service.label}</strong>
                  <span>{service.freeTier}</span>
                  <em>{service.watch}</em>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </details>
      <details>
        <summary>Comparatif lié au starter</summary>
        <div className="knowledge-list">
          {relatedProviders.map((provider) => (
            <article key={provider.id}>
              <strong>{provider.label}</strong>
              <span>{provider.pricing}</span>
            </article>
          ))}
          {relatedSeo.map((seo) => (
            <article key={seo.id}>
              <strong>{seo.label}</strong>
              <span>{seo.bestFor.join(" · ")}</span>
            </article>
          ))}
        </div>
      </details>
      <details>
        <summary>Sources officielles</summary>
        <ul className="source-list">
          {[...relatedProviders.flatMap((provider) => provider.sources), ...relatedSeo.flatMap((seo) => seo.sources)].map((source) => (
            <li key={source}>
              <a href={source}>{source.replace(/^https?:\/\//, "")}</a>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
