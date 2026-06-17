import type { GenerationLog, GenerationResult, ToolStatus } from "../../shared/types";

interface LogPanelProps {
  logs: GenerationLog[];
  tools: ToolStatus[];
  result: GenerationResult | null;
}

export function LogPanel({ logs, result, tools }: LogPanelProps) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Validation et logs</h2>
        <span>{result?.projectPath ?? "Aucune génération lancée"}</span>
      </div>
      <div className="tool-strip">
        {tools.map((tool) => (
          <div className={tool.available ? "tool-chip ok" : "tool-chip missing"} key={tool.name}>
            <strong>{tool.name}</strong>
            <span>{tool.available ? tool.version : "manquant"}</span>
          </div>
        ))}
      </div>
      <div className="log-list">
        {(logs.length ? logs : [{ level: "info" as const, message: "Les logs de génération apparaîtront ici." }]).map((entry, index) => (
          <div className={`log-row ${entry.level}`} key={`${entry.message}-${index}`}>
            <strong>{entry.level}</strong>
            <span>{entry.message}</span>
            {entry.detail ? <em>{entry.detail}</em> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
