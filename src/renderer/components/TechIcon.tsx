import type { CSSProperties } from "react";
import { techCatalog } from "../../shared/techCatalog";
import type { TechId } from "../../shared/types";
import { BrandLogo, hasBrandLogo } from "./BrandLogo";

interface TechIconProps {
  id: TechId;
}

export function TechIcon({ id }: TechIconProps) {
  const tech = techCatalog[id];

  return (
    <span
      className={hasBrandLogo(id) ? "tech-icon has-brand" : "tech-icon fallback"}
      style={{ "--tech-color": tech.color, "--tech-bg": tech.background } as CSSProperties}
      title={tech.label}
    >
      <BrandLogo id={id} label={tech.label} />
      {!hasBrandLogo(id) ? tech.short : null}
    </span>
  );
}
