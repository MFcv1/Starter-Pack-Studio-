import { providerTechId } from "../../shared/techCatalog";
import type { ProviderId, ProviderRecommendation } from "../../shared/types";
import { ProviderFitBadge } from "./ProviderFitBadge";
import { TechBadge } from "./TechBadge";

interface ProviderPanelProps {
  providerId: ProviderId;
  providers: ProviderRecommendation[];
  onChange: (id: ProviderId) => void;
}

export function ProviderPanel({ providerId, providers, onChange }: ProviderPanelProps) {
  return (
    <section className="panel inspector-panel">
      <div className="panel-header">
        <h2>Hebergement</h2>
        <span>provider recommande selon besoin</span>
      </div>
      <div className="provider-list">
        {providers.map((provider) => {
          const techId = providerTechId(provider);
          return (
            <button
              className={provider.id === providerId ? "provider-card active" : "provider-card"}
              key={provider.id}
              onClick={() => onChange(provider.id)}
              type="button"
            >
              <div className="provider-card-head">
                {techId ? <TechBadge compact id={techId} /> : null}
                <ProviderFitBadge fit={provider.fit} />
              </div>
              <strong>{provider.label}</strong>
              <span>{provider.reason}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
