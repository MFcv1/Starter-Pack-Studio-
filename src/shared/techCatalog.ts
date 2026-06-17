import type { ProviderRecommendation, TechId } from "./types.js";

export interface TechMeta {
  id: TechId;
  label: string;
  short: string;
  kind: "framework" | "provider" | "database" | "payment" | "capability";
  color: string;
  background: string;
  hint: string;
}

export const techCatalog: Record<TechId, TechMeta> = {
  astro: {
    id: "astro",
    label: "Astro",
    short: "A",
    kind: "framework",
    color: "#ff5d01",
    background: "#fff0e8",
    hint: "HTML prerendu, peu de JS, parfait landing/vitrine SEO."
  },
  react: {
    id: "react",
    label: "React",
    short: "R",
    kind: "framework",
    color: "#087ea4",
    background: "#e7f7fc",
    hint: "Librairie UI: elle construit les composants, pas tout le framework web."
  },
  next: {
    id: "next",
    label: "Next.js",
    short: "N",
    kind: "framework",
    color: "#111111",
    background: "#f0f0f0",
    hint: "React fullstack, SSR/SSG, workflows publics + app."
  },
  vite: {
    id: "vite",
    label: "Vite",
    short: "V",
    kind: "framework",
    color: "#7c3aed",
    background: "#f2edff",
    hint: "SPA rapide pour dashboard/admin privé."
  },
  firebase: {
    id: "firebase",
    label: "Firebase",
    short: "F",
    kind: "provider",
    color: "#f57c00",
    background: "#fff3df",
    hint: "Auth, App Hosting, Firestore, Storage, Functions."
  },
  firestore: {
    id: "firestore",
    label: "Firestore",
    short: "FS",
    kind: "database",
    color: "#f4a000",
    background: "#fff7db",
    hint: "Documents realtime, bon pour annonces/backoffice léger."
  },
  "firebase-sql": {
    id: "firebase-sql",
    label: "SQL Connect",
    short: "SQL",
    kind: "database",
    color: "#1a73e8",
    background: "#eaf2ff",
    hint: "PostgreSQL managé dans Firebase, auth + SDKs typés."
  },
  cloudflare: {
    id: "cloudflare",
    label: "Cloudflare",
    short: "CF",
    kind: "provider",
    color: "#f38020",
    background: "#fff0df",
    hint: "Pages, Workers, D1, R2, KV, edge et coût bas."
  },
  supabase: {
    id: "supabase",
    label: "Supabase",
    short: "SB",
    kind: "provider",
    color: "#3ecf8e",
    background: "#e8fbf3",
    hint: "Backend Postgres, Auth, Storage et APIs: alternative open-source orientée SQL."
  },
  d1: {
    id: "d1",
    label: "D1",
    short: "D1",
    kind: "database",
    color: "#6b4eff",
    background: "#efedff",
    hint: "SQL serverless SQLite pour Workers/Pages."
  },
  vercel: {
    id: "vercel",
    label: "Vercel",
    short: "▲",
    kind: "provider",
    color: "#111111",
    background: "#f2f2f2",
    hint: "Next natif, previews, SSR, ISR, DX produit."
  },
  netlify: {
    id: "netlify",
    label: "Netlify",
    short: "N",
    kind: "provider",
    color: "#00ad9f",
    background: "#e4fbf7",
    hint: "Static, forms, previews, functions."
  },
  stripe: {
    id: "stripe",
    label: "Stripe",
    short: "S",
    kind: "payment",
    color: "#635bff",
    background: "#efedff",
    hint: "Paiements, Connect, webhooks, remboursements."
  },
  postgres: {
    id: "postgres",
    label: "Postgres",
    short: "PG",
    kind: "database",
    color: "#336791",
    background: "#eaf3f9",
    hint: "Relations, contraintes, audit, reporting."
  },
  seo: {
    id: "seo",
    label: "SEO",
    short: "SEO",
    kind: "capability",
    color: "#087d78",
    background: "#e1f2f0",
    hint: "HTML initial, sitemap, metadata, schema."
  },
  auth: {
    id: "auth",
    label: "Auth",
    short: "ID",
    kind: "capability",
    color: "#116149",
    background: "#e7f5ef",
    hint: "Comptes, rôles, sessions, permissions."
  },
  storage: {
    id: "storage",
    label: "Storage",
    short: "R2",
    kind: "capability",
    color: "#7a4b00",
    background: "#fff1d2",
    hint: "Images, documents, médias, uploads."
  }
};

export function providerTechId(provider: ProviderRecommendation): TechId | null {
  if (provider.id === "firebase") return "firebase";
  if (provider.id === "cloudflare") return "cloudflare";
  if (provider.id === "vercel") return "vercel";
  if (provider.id === "netlify") return "netlify";
  return null;
}
