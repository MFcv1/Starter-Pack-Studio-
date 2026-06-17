import type { DatabaseRecommendation } from "../../shared/types";

interface DbFitPanelProps {
  database?: DatabaseRecommendation;
}

const dbTone: Record<DatabaseRecommendation["primary"], string> = {
  none: "neutral",
  firestore: "firebase",
  sql: "sql",
  d1: "cloudflare",
  hybrid: "hybrid"
};

const dbLabels: Record<DatabaseRecommendation["primary"], string> = {
  none: "No DB",
  firestore: "Document DB",
  sql: "SQL",
  d1: "Edge SQL",
  hybrid: "Hybride"
};

export function DbFitPanel({ database }: DbFitPanelProps) {
  if (!database) return null;

  const firestoreFit = database.whenFirestoreFits.slice(0, 2).join(" · ");
  const sqlFit = database.whenSqlFits.slice(0, 2).join(" · ");

  return (
    <div className={`db-fit-card ${dbTone[database.primary]}`}>
      <div className="db-fit-heading">
        <span>{dbLabels[database.primary]}</span>
        <strong>{database.label}</strong>
      </div>
      <p>{database.summary}</p>
      <div className="db-fit-signals">
        <span>
          <strong>Firestore</strong>
          {firestoreFit}
        </span>
        <span>
          <strong>SQL</strong>
          {sqlFit}
        </span>
      </div>
      <strong className="db-warning">{database.warning}</strong>
    </div>
  );
}
