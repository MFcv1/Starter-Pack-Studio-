import type { ProviderRecommendation } from "../../shared/types";

interface ProviderFitBadgeProps {
  fit: ProviderRecommendation["fit"];
}

const fitLabels: Record<ProviderRecommendation["fit"], string> = {
  primary: "Meilleur choix",
  good: "Très cohérent",
  possible: "Possible",
  avoid: "À éviter"
};

export function ProviderFitBadge({ fit }: ProviderFitBadgeProps) {
  return <em className={`fit-chip ${fit}`}>{fitLabels[fit]}</em>;
}
