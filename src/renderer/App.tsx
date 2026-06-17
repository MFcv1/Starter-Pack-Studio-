import { useEffect, useMemo, useState } from "react";
import { starterPacks } from "../shared/starterRegistry";
import type {
  GenerationLog,
  GenerationOptions,
  GenerationResult,
  PackageManager,
  ProjectOperationResult,
  ProjectRecord,
  ProviderId,
  StarterId,
  ToolStatus
} from "../shared/types";
import { CategorySidebar } from "./components/CategorySidebar";
import { DecisionPanel } from "./components/DecisionPanel";
import { GenerationModal, type WorkflowStep } from "./components/GenerationModal";
import { GeneratorPanel } from "./components/GeneratorPanel";
import { HeaderBar } from "./components/HeaderBar";
import { LogPanel } from "./components/LogPanel";
import { ProjectActionModal } from "./components/ProjectActionModal";
import { ProviderPanel } from "./components/ProviderPanel";
import { ProjectsView } from "./components/ProjectsView";
import { StackPanel } from "./components/StackPanel";

const defaultStarterId: StarterId = "site-app-local";

const workflowSteps: WorkflowStep[] = [
  { id: "bootstrap", label: "Starter officiel @latest", detail: "Creation avec le CLI officiel du framework." },
  { id: "structure", label: "Structure pro", detail: "Dossiers source, media, tests et workflows." },
  { id: "skills", label: "Skills UI/UX embarques", detail: "30 skills design + _shared copies dans .agents/skills." },
  { id: "docs", label: "Docs projet", detail: "README, @agent.md, SEO, securite et architecture." },
  { id: "install", label: "Dependances", detail: "Installation avec le package manager choisi." },
  { id: "git", label: "Git", detail: "Initialisation du repository local." },
  { id: "vscode", label: "VS Code", detail: "Ouverture du projet pour commencer a coder." }
];

export function App() {
  const [starterId, setStarterId] = useState<StarterId>(defaultStarterId);
  const starter = useMemo(() => starterPacks.find((pack) => pack.id === starterId) ?? starterPacks[0], [starterId]);
  const primaryProvider = starter.providers.find((provider) => provider.fit === "primary") ?? starter.providers[0];
  const [providerId, setProviderId] = useState<ProviderId>(primaryProvider.id);
  const [projectName, setProjectName] = useState("mon-projet-client");
  const [destinationPath, setDestinationPath] = useState("");
  const [packageManager, setPackageManager] = useState<PackageManager>("pnpm");
  const [tools, setTools] = useState<ToolStatus[]>([]);
  const [logs, setLogs] = useState<GenerationLog[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastResult, setLastResult] = useState<GenerationResult | null>(null);
  const [isGenerationModalOpen, setIsGenerationModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [view, setView] = useState<"generator" | "projects">("generator");
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [projectActionTitle, setProjectActionTitle] = useState("");
  const [projectActionName, setProjectActionName] = useState("");
  const [projectActionLogs, setProjectActionLogs] = useState<GenerationLog[]>([]);
  const [projectActionResult, setProjectActionResult] = useState<ProjectOperationResult | null>(null);
  const [isProjectActionOpen, setIsProjectActionOpen] = useState(false);

  useEffect(() => {
    setProviderId(primaryProvider.id);
  }, [primaryProvider.id, starterId]);

  useEffect(() => {
    void window.studio.getDesktopPath().then(setDestinationPath).catch(() => {
      setDestinationPath("");
    });
    void refreshProjects();
  }, []);

  useEffect(() => {
    const needed = Array.from(new Set([...starter.requiredTools, ...starter.optionalTools]));
    void window.studio.checkTools(needed).then(setTools).catch(() => {
      setTools(needed.map((name) => ({ name, available: false, detail: "Verification indisponible" })));
    });
  }, [starter]);

  useEffect(() => {
    if (!isGenerating) return;
    const timer = window.setInterval(() => {
      setActiveStep((step) => Math.min(step + 1, workflowSteps.length - 1));
    }, 1200);
    return () => window.clearInterval(timer);
  }, [isGenerating]);

  const options: GenerationOptions = {
    starterId: starter.id,
    projectName: normalizeProjectName(projectName),
    destinationPath,
    packageManager,
    providerId,
    mode: "official-bootstrap",
    runInstall: true,
    initGit: true,
    openInVSCode: true,
    includeAgentMd: true,
    includeSecurityMd: true
  };

  async function chooseDirectory() {
    const selected = await window.studio.chooseDirectory();
    if (selected) setDestinationPath(selected);
  }

  async function refreshProjects() {
    const records = await window.studio.listProjects().catch(() => []);
    setProjects(records);
  }

  async function generateProject() {
    setIsGenerating(true);
    setIsGenerationModalOpen(true);
    setActiveStep(0);
    setLogs([{ level: "info", message: "Preparation de la generation..." }]);
    setLastResult(null);

    const result = await window.studio.generateProject(options);
    setActiveStep(result.ok ? workflowSteps.length : Math.min(activeStep, workflowSteps.length - 1));
    setLogs(result.logs);
    setLastResult(result);
    if (result.ok) {
      await refreshProjects();
    }
    setIsGenerating(false);
  }

  function closeGenerationModal() {
    setIsGenerationModalOpen(false);
    if (lastResult?.ok) {
      setView("projects");
      void refreshProjects();
    }
  }

  async function deleteTrackedProject(project: ProjectRecord) {
    const confirmed = window.confirm(
      `Supprimer "${project.name}" de Starter Pack Studio et envoyer le dossier dans la corbeille ?\n\n${project.path}`
    );
    if (!confirmed) return;

    setProjectActionTitle("Suppression du projet");
    setProjectActionName(project.name);
    setProjectActionLogs([{ level: "info", message: "Preparation de la suppression..." }]);
    setProjectActionResult(null);
    setIsProjectActionOpen(true);

    const result = await window.studio.deleteProject(project.id);
    setProjectActionLogs(result.logs);
    setProjectActionResult(result);
    await refreshProjects();
  }

  async function migrateTrackedProject(project: ProjectRecord) {
    const destination = await window.studio.chooseDirectory();
    if (!destination) return;
    const confirmed = window.confirm(
      `Migrer "${project.name}" vers ce dossier ?\n\n${destination}\n\nL'app copiera le projet sans node_modules, reinstallera les dependances, puis enverra l'ancien dossier dans la corbeille si tout est OK.`
    );
    if (!confirmed) return;

    setProjectActionTitle("Migration du projet");
    setProjectActionName(project.name);
    setProjectActionLogs([{ level: "info", message: "Preparation de la migration..." }]);
    setProjectActionResult(null);
    setIsProjectActionOpen(true);

    const result = await window.studio.migrateProject(project.id, destination);
    setProjectActionLogs(result.logs);
    setProjectActionResult(result);
    await refreshProjects();
  }

  return (
    <div className="app-shell">
      <CategorySidebar activeId={starter.id} packs={starterPacks} onSelect={setStarterId} />
      <main className="studio-workspace">
        <div className="workspace-tabs" role="tablist" aria-label="Navigation Starter Pack Studio">
          <button aria-selected={view === "generator"} className={view === "generator" ? "active" : ""} onClick={() => setView("generator")} type="button">
            Starter packs
          </button>
          <button aria-selected={view === "projects"} className={view === "projects" ? "active" : ""} onClick={() => setView("projects")} type="button">
            Mes projets <span>{projects.length}</span>
          </button>
        </div>

        {view === "generator" ? (
          <>
            <HeaderBar starter={starter} result={lastResult} />
            <section className="studio-grid">
              <div className="studio-main-column">
                <DecisionPanel starter={starter} />
                <StackPanel starter={starter} />
                <LogPanel logs={logs} tools={tools} result={lastResult} />
              </div>
              <aside className="studio-inspector">
                <ProviderPanel providerId={providerId} providers={starter.providers} onChange={setProviderId} />
                <GeneratorPanel
                  destinationPath={destinationPath}
                  isGenerating={isGenerating}
                  onChooseDirectory={chooseDirectory}
                  onGenerate={generateProject}
                  onPackageManagerChange={setPackageManager}
                  onProjectNameChange={setProjectName}
                  packageManager={packageManager}
                  projectName={projectName}
                />
              </aside>
            </section>
          </>
        ) : (
          <ProjectsView
            onDeleteProject={(project) => {
              void deleteTrackedProject(project);
            }}
            onMigrateProject={(project) => {
              void migrateTrackedProject(project);
            }}
            onOpenFolder={(targetPath) => {
              void window.studio.openPath(targetPath);
            }}
            onOpenVSCode={(targetPath) => {
              void window.studio.openProjectInVSCode(targetPath);
            }}
            projects={projects}
          />
        )}
      </main>
      <GenerationModal
        activeStep={activeStep}
        isGenerating={isGenerating}
        isOpen={isGenerationModalOpen}
        logs={logs}
        onClose={closeGenerationModal}
        onOpenProject={(targetPath) => {
          void window.studio.openPath(targetPath);
        }}
        projectName={normalizeProjectName(projectName)}
        result={lastResult}
        steps={workflowSteps}
      />
      <ProjectActionModal
        isOpen={isProjectActionOpen}
        logs={projectActionLogs}
        onClose={() => setIsProjectActionOpen(false)}
        projectName={projectActionName}
        result={projectActionResult}
        title={projectActionTitle}
      />
    </div>
  );
}

function normalizeProjectName(value: string): string {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-_]+/g, "-")
      .replace(/^-+|-+$/g, "") || "mon-projet-client"
  );
}
