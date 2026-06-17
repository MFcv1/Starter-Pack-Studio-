import type { ProjectRecord } from "../../shared/types";

interface ProjectsViewProps {
  projects: ProjectRecord[];
  onDeleteProject: (project: ProjectRecord) => void;
  onMigrateProject: (project: ProjectRecord) => void;
  onOpenFolder: (path: string) => void;
  onOpenVSCode: (path: string) => void;
}

export function ProjectsView({ onDeleteProject, onMigrateProject, onOpenFolder, onOpenVSCode, projects }: ProjectsViewProps) {
  if (projects.length === 0) {
    return (
      <section className="panel projects-empty">
        <span className="project-folder-visual" aria-hidden="true" />
        <div>
          <span className="overline">Mes projets</span>
          <h2>Aucun starter genere pour le moment</h2>
          <p>Quand un projet sera pret, il apparaitra ici avec ses raccourcis Explorer et VS Code.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="projects-view">
      <div className="projects-view-header">
        <div>
          <span className="overline">Mes projets</span>
          <h1>Bibliotheque projets</h1>
          <p>Les starters generes par l'app restent accessibles ici, meme apres redemarrage.</p>
        </div>
        <strong>{projects.length} projet{projects.length > 1 ? "s" : ""}</strong>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={`${project.id}-${project.path}`}>
            <div className="project-card-main">
              <span className="project-folder-visual" aria-hidden="true" />
              <div>
                <h2>{project.name}</h2>
                <p>{project.path}</p>
              </div>
            </div>

            <div className="project-meta">
              <span>{project.starterLabel}</span>
              <span>{project.providerId}</span>
              <span>{project.packageManager}</span>
              <span>{formatDate(project.createdAt)}</span>
            </div>

            <div className="project-stats">
              <span>
                <strong>{project.docsCount}</strong>
                docs
              </span>
              <span>
                <strong>{project.skillsCount || 30}</strong>
                skills
              </span>
              <span>
                <strong>{project.filesCount}</strong>
                elements
              </span>
            </div>

            <div className="project-actions">
              <button onClick={() => onOpenFolder(project.path)} type="button">
                Ouvrir le dossier
              </button>
              <button onClick={() => onOpenVSCode(project.path)} type="button">
                Ouvrir dans VS Code
              </button>
              <button onClick={() => onMigrateProject(project)} type="button">
                Migrer
              </button>
              <button className="danger" onClick={() => onDeleteProject(project)} type="button">
                Supprimer
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date inconnue";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}
