import type { GenerationLog, ProjectOperationResult } from "../../shared/types";

interface ProjectActionModalProps {
  isOpen: boolean;
  title: string;
  projectName: string;
  logs: GenerationLog[];
  result: ProjectOperationResult | null;
  onClose: () => void;
}

export function ProjectActionModal({ isOpen, logs, onClose, projectName, result, title }: ProjectActionModalProps) {
  if (!isOpen) return null;

  const isDone = Boolean(result);
  const isSuccess = Boolean(result?.ok);

  return (
    <div className="generation-modal-backdrop" role="presentation">
      <section aria-labelledby="project-action-title" aria-modal="true" className="project-action-modal" role="dialog">
        <div className="generation-modal-header">
          <div>
            <span className="modal-kicker">Mes projets</span>
            <h2 id="project-action-title">{title}</h2>
            <p>{projectName}</p>
          </div>
          <span className={`modal-status ${!isDone ? "running" : isSuccess ? "success" : "error"}`}>
            {!isDone ? "En cours" : isSuccess ? "Termine" : "Action requise"}
          </span>
        </div>

        <div className="project-action-body">
          <div className="modal-logs project-action-logs">
            {(logs.length ? logs : [{ level: "info" as const, message: "Preparation..." }]).slice(-9).map((log, index) => (
              <p className={log.level} key={`${log.level}-${index}-${log.message}`}>
                <strong>{log.level}</strong>
                <span>{log.message}</span>
              </p>
            ))}
          </div>
          {result?.error && <p className="project-action-error">{result.error}</p>}
        </div>

        <div className="modal-actions">
          <button disabled={!isDone} onClick={onClose} type="button">
            Fermer
          </button>
        </div>
      </section>
    </div>
  );
}
