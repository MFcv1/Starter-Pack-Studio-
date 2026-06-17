import type { StarterId, StarterPack } from "../../shared/types";

interface CategorySidebarProps {
  activeId: StarterId;
  packs: StarterPack[];
  onSelect: (id: StarterId) => void;
}

export function CategorySidebar({ activeId, packs, onSelect }: CategorySidebarProps) {
  return (
    <aside className="category-sidebar">
      <div className="brand-block">
        <div className="brand-mark">SP</div>
        <div>
          <strong>Starter Pack Studio</strong>
          <span>Architecture + project launcher</span>
        </div>
      </div>

      <nav className="category-nav" aria-label="Starter packs">
        {packs.map((pack) => (
          <button
            className={pack.id === activeId ? "category-card active" : "category-card"}
            key={pack.id}
            onClick={() => onSelect(pack.id)}
            type="button"
          >
            <strong>{pack.label}</strong>
            <span>{pack.intent}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <strong>Règle de décision</strong>
        <p>Choisir le plus petit starter qui couvre le besoin réel, puis documenter les limites.</p>
      </div>
    </aside>
  );
}
