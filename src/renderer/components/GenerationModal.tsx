import type { GenerationLog, GenerationResult } from "../../shared/types";

export interface WorkflowStep {
  id: string;
  label: string;
  detail: string;
}

interface GenerationModalProps {
  isOpen: boolean;
  isGenerating: boolean;
  activeStep: number;
  logs: GenerationLog[];
  projectName: string;
  result: GenerationResult | null;
  steps: WorkflowStep[];
  onClose: () => void;
  onOpenProject: (path: string) => void;
}

export function GenerationModal({
  activeStep,
  isGenerating,
  isOpen,
  logs,
  onClose,
  onOpenProject,
  projectName,
  result,
  steps
}: GenerationModalProps) {
  if (!isOpen) return null;

  const hasResult = Boolean(result);
  const isSuccess = Boolean(result?.ok);
  const failed = hasResult && !isSuccess;
  const completedSteps = hasResult && isSuccess ? steps.length : activeStep;
  const progress = hasResult ? (isSuccess ? 100 : Math.max(12, Math.round((activeStep / steps.length) * 100))) : Math.round(((activeStep + 0.35) / steps.length) * 100);
  const recentLogs = logs.slice(-5);
  const docsCount = result?.files.filter((file) => file.startsWith("docs/")).length ?? 0;
  const skillCount = result?.files.filter((file) => file.startsWith(".agents/skills/") && file !== ".agents/skills/" && !file.includes("_shared")).length ?? 0;

  return (
    <div className="generation-modal-backdrop" role="presentation">
      <section aria-labelledby="generation-modal-title" aria-modal="true" className="generation-modal" role="dialog">
        <div className="generation-modal-header">
          <div>
            <span className="modal-kicker">Starter Pack Studio</span>
            <h2 id="generation-modal-title">
              {failed ? "Generation a verifier" : isSuccess ? "Projet pret" : "Creation du starter"}
            </h2>
            <p>{projectName}</p>
          </div>
          <span className={`modal-status ${failed ? "error" : isSuccess ? "success" : "running"}`}>
            {failed ? "Action requise" : isSuccess ? "Termine" : "En cours"}
          </span>
        </div>

        <div className="progress-track" aria-label="Progression de generation">
          <div className="progress-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
        </div>

        <ol className="modal-steps">
          {steps.map((step, index) => {
            const state = failed && index === activeStep ? "error" : index < completedSteps ? "done" : index === activeStep && isGenerating ? "active" : "pending";
            return (
              <li className={`modal-step ${state}`} key={step.id}>
                <span className="step-dot">{state === "done" ? "OK" : index + 1}</span>
                <div>
                  <strong>{step.label}</strong>
                  <span>{step.detail}</span>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="modal-recap">
          <div>
            <strong>{result?.files.length ?? 0}</strong>
            <span>elements ajoutes</span>
          </div>
          <div>
            <strong>{docsCount}</strong>
            <span>docs projet</span>
          </div>
          <div>
            <strong>{skillCount || 30}</strong>
            <span>skills UI/UX</span>
          </div>
        </div>

        {recentLogs.length > 0 && (
          <div className="modal-logs">
            {recentLogs.map((log, index) => (
              <p className={log.level} key={`${log.level}-${index}-${log.message}`}>
                <strong>{log.level}</strong>
                <span>{log.message}</span>
              </p>
            ))}
          </div>
        )}

        {result?.projectPath && <p className="modal-path">{result.projectPath}</p>}

        <div className="modal-actions">
          {result?.projectPath && (
            <button onClick={() => onOpenProject(result.projectPath!)} type="button">
              Ouvrir le dossier
            </button>
          )}
          <button disabled={isGenerating} onClick={onClose} type="button">
            {isGenerating ? "Generation en cours" : "Fermer"}
          </button>
        </div>
      </section>
    </div>
  );
}
