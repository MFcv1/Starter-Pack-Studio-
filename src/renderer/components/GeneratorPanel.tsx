import type { PackageManager } from "../../shared/types";

interface GeneratorPanelProps {
  projectName: string;
  destinationPath: string;
  packageManager: PackageManager;
  isGenerating: boolean;
  onProjectNameChange: (value: string) => void;
  onPackageManagerChange: (value: PackageManager) => void;
  onChooseDirectory: () => void;
  onGenerate: () => void;
}

export function GeneratorPanel({
  destinationPath,
  isGenerating,
  onChooseDirectory,
  onGenerate,
  onPackageManagerChange,
  onProjectNameChange,
  packageManager,
  projectName
}: GeneratorPanelProps) {
  return (
    <section className="panel inspector-panel">
      <div className="panel-header generator-header">
        <div>
          <span className="overline">Générer</span>
          <h2>Projet</h2>
        </div>
        <span>{destinationPath ? "prêt" : "destination requise"}</span>
      </div>
      <div className="generator-form">
        <label>
          Nom du projet
          <input onChange={(event) => onProjectNameChange(event.target.value)} value={projectName} />
        </label>

        <label>
          Destination
          <div className="path-picker">
            <input readOnly value={destinationPath} />
            <button onClick={onChooseDirectory} type="button">Choisir</button>
          </div>
        </label>

        <label>
          Package manager
          <select onChange={(event) => onPackageManagerChange(event.target.value as PackageManager)} value={packageManager}>
            <option value="pnpm">pnpm</option>
            <option value="npm">npm</option>
          </select>
        </label>

        <div className="generation-strategy" aria-label="Workflow automatique">
          <strong>Pipeline</strong>
          <span>Bootstrap officiel, docs, skills, logs.</span>
        </div>

        <button className="generate-button" disabled={isGenerating || !destinationPath} onClick={onGenerate} type="button">
          {isGenerating ? "Génération..." : "Créer le projet"}
        </button>
      </div>
    </section>
  );
}
