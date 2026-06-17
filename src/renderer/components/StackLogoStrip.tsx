import type { TechId } from "../../shared/types";
import { TechBadge } from "./TechBadge";

interface StackLogoStripProps {
  techIds?: TechId[];
}

export function StackLogoStrip({ techIds = [] }: StackLogoStripProps) {
  if (techIds.length === 0) return null;

  return (
    <div className="stack-logo-strip" aria-label="Technologies principales">
      {techIds.map((id) => (
        <TechBadge compact id={id} key={id} />
      ))}
    </div>
  );
}
