import type { CSSProperties } from "react";
import { techCatalog } from "../../shared/techCatalog";
import type { TechId } from "../../shared/types";
import { BrandLogo, hasBrandLogo } from "./BrandLogo";

interface TechBadgeProps {
  id: TechId;
  compact?: boolean;
}

export function TechBadge({ id, compact = false }: TechBadgeProps) {
  const tech = techCatalog[id];

  return (
    <span
      className={compact ? "tech-badge compact" : "tech-badge"}
      style={{ "--tech-color": tech.color, "--tech-bg": tech.background } as CSSProperties}
      title={tech.hint}
    >
      <span className={hasBrandLogo(id) ? "tech-logo has-brand" : "tech-logo fallback"}>
        <BrandLogo id={id} label={tech.label} />
        {!hasBrandLogo(id) ? tech.short : null}
      </span>
      <span className="tech-label">{tech.label}</span>
    </span>
  );
}
