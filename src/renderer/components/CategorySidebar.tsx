interface CategorySidebarProps {
  collapsed: boolean;
  projectsCount: number;
  view: "generator" | "projects" | "library";
  onNavigate: (view: "generator" | "projects" | "library") => void;
  onToggle: () => void;
}

const navItems: Array<{ id: "generator" | "projects" | "library"; label: string; short: string; detail: string }> = [
  { id: "generator", label: "Starter packs", short: "SP", detail: "Choix et génération" },
  { id: "projects", label: "Mes projets", short: "PR", detail: "Historique local" },
  { id: "library", label: "Bibliothèque", short: "BI", detail: "Frameworks, providers, SEO" }
];

export function CategorySidebar({ collapsed, onNavigate, onToggle, projectsCount, view }: CategorySidebarProps) {
  return (
    <aside className={collapsed ? "category-sidebar collapsed" : "category-sidebar"}>
      <div className="brand-block">
        <div className="brand-mark">SP</div>
        <div className="brand-copy">
          <strong>Starter Pack Studio</strong>
          <span>Architecture + project launcher</span>
        </div>
      </div>
      <button className="sidebar-toggle" onClick={onToggle} title={collapsed ? "Ouvrir le menu" : "Réduire le menu"} type="button">
        {collapsed ? "›" : "‹"}
      </button>

      <nav className="sidebar-tabs" aria-label="Navigation principale">
        {navItems.map((item) => (
          <button
            aria-current={view === item.id ? "page" : undefined}
            className={view === item.id ? "sidebar-tab active" : "sidebar-tab"}
            key={item.id}
            onClick={() => onNavigate(item.id)}
            type="button"
          >
            <span className="tab-icon">{item.short}</span>
            <span className="tab-copy">
              <strong>{item.label}</strong>
              <em>{item.id === "projects" ? `${projectsCount} projet${projectsCount > 1 ? "s" : ""}` : item.detail}</em>
            </span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <strong>Version 0.1.17</strong>
        <p>Mise à jour : 18/06/2026 à 01:27</p>
      </div>
    </aside>
  );
}
