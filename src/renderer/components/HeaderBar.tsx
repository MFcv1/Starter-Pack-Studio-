import type { GenerationResult, StarterPack } from "../../shared/types";
import { StackLogoStrip } from "./StackLogoStrip";

interface HeaderBarProps {
  starter: StarterPack;
  result: GenerationResult | null;
}

export function HeaderBar({ starter, result }: HeaderBarProps) {
  return (
    <header className="header-bar">
      <div>
        <span className="overline">Starter recommandé</span>
        <h1>{starter.label}</h1>
        <p>{starter.example}</p>
        <StackLogoStrip techIds={starter.stackTechIds} />
      </div>
      <div className={result?.ok ? "status-pill success" : result ? "status-pill error" : "status-pill"}>
        {result?.ok ? "Projet généré" : result ? "À corriger" : "Prêt"}
      </div>
    </header>
  );
}
