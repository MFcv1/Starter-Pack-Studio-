import type { SitelinkMap } from "../../shared/types";

interface GoogleArchitecturePanelProps {
  sitelinkMap?: SitelinkMap;
}

export function GoogleArchitecturePanel({ sitelinkMap }: GoogleArchitecturePanelProps) {
  if (!sitelinkMap) return null;

  return (
    <section className="panel google-architecture-panel">
      <div className="panel-header">
        <h2>Architecture Google</h2>
        <span>routes crawlables, maillage, sitelinks</span>
      </div>
      <div className="google-architecture-body">
        <div className="google-architecture-intro">
          <strong>Préparer les raccourcis sous le résultat principal</strong>
          <p>{sitelinkMap.summary}</p>
        </div>
        <div className="sitelink-candidates">
          {sitelinkMap.candidatePages.slice(0, 6).map((page) => (
            <article key={page.route}>
              <code>{page.route}</code>
              <strong>{page.label}</strong>
              <span>{page.role}</span>
            </article>
          ))}
        </div>
        <details className="sitelink-details">
          <summary>Voir la structure à donner aux agents IA</summary>
          <div className="sitelink-columns">
            <div>
              <h3>Menu principal</h3>
              <ul>
                {sitelinkMap.primaryNavigation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>À éviter</h3>
              <ul>
                {sitelinkMap.avoid.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}
