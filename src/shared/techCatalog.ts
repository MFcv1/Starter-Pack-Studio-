import type { ProviderRecommendation, TechId } from "./types.js";

export interface TechMeta {
  id: TechId;
  label: string;
  short: string;
  kind: "ui-library" | "framework" | "build-tool" | "backend" | "provider" | "database" | "payment" | "capability";
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
  angular: {
    id: "angular",
    label: "Angular",
    short: "NG",
    kind: "framework",
    color: "#dd0031",
    background: "#fff0f3",
    hint: "Framework frontend opinionné, fort pour grosses apps d'entreprise."
  },
  aws: {
    id: "aws",
    label: "AWS",
    short: "AWS",
    kind: "provider",
    color: "#ff9900",
    background: "#fff4df",
    hint: "Cloud généraliste: S3, CloudFront, Lambda, RDS, ECS, beaucoup de puissance et de configuration."
  },
  cms: {
    id: "cms",
    label: "CMS",
    short: "CMS",
    kind: "capability",
    color: "#5b4fd8",
    background: "#f0eeff",
    hint: "Source de contenu éditable: Sanity, Strapi, Directus, Contentful, WordPress headless."
  },
  django: {
    id: "django",
    label: "Django",
    short: "DJ",
    kind: "backend",
    color: "#0c4b33",
    background: "#e7f4ee",
    hint: "Backend Python complet avec ORM, admin, auth et structure durable."
  },
  react: {
    id: "react",
    label: "React",
    short: "R",
    kind: "ui-library",
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
  nest: {
    id: "nest",
    label: "NestJS",
    short: "NS",
    kind: "backend",
    color: "#e0234e",
    background: "#fff0f4",
    hint: "Backend Node structuré: API, modules, services, guards, jobs, équipes backend."
  },
  nuxt: {
    id: "nuxt",
    label: "Nuxt",
    short: "NX",
    kind: "framework",
    color: "#00dc82",
    background: "#e9fbf3",
    hint: "Framework fullstack Vue, proche du rôle de Next mais dans l'écosystème Vue."
  },
  "node-api": {
    id: "node-api",
    label: "Node API",
    short: "API",
    kind: "backend",
    color: "#43853d",
    background: "#edf7e9",
    hint: "Express/Fastify/Hono: API légère quand tu veux contrôler le serveur sans gros framework."
  },
  vite: {
    id: "vite",
    label: "Vite",
    short: "V",
    kind: "build-tool",
    color: "#7c3aed",
    background: "#f2edff",
    hint: "SPA rapide pour dashboard/admin privé."
  },
  remix: {
    id: "remix",
    label: "Remix",
    short: "RM",
    kind: "framework",
    color: "#121212",
    background: "#eeeeee",
    hint: "Framework React fullstack centré web standards, loaders/actions et formulaires serveur."
  },
  render: {
    id: "render",
    label: "Render/Railway",
    short: "RR",
    kind: "provider",
    color: "#5b5bd6",
    background: "#efefff",
    hint: "Déploiement simple de backends Node/Python/Ruby et services persistants."
  },
  rails: {
    id: "rails",
    label: "Rails",
    short: "RB",
    kind: "backend",
    color: "#cc0000",
    background: "#fff0f0",
    hint: "Framework Ruby productif pour apps CRUD, SaaS, admin, conventions fortes."
  },
  laravel: {
    id: "laravel",
    label: "Laravel",
    short: "LV",
    kind: "backend",
    color: "#ff2d20",
    background: "#fff0ee",
    hint: "Framework PHP complet: backend, auth, queues, jobs, admin, écosystème très riche."
  },
  fastapi: {
    id: "fastapi",
    label: "FastAPI",
    short: "FA",
    kind: "backend",
    color: "#009688",
    background: "#e7f7f5",
    hint: "API Python moderne, rapide, typée, très pratique avec data/IA."
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
  mongodb: {
    id: "mongodb",
    label: "MongoDB",
    short: "MDB",
    kind: "database",
    color: "#13aa52",
    background: "#e8f8ee",
    hint: "Base document JSON, utile pour contenus souples, événements, profils variables."
  },
  mysql: {
    id: "mysql",
    label: "MySQL",
    short: "MY",
    kind: "database",
    color: "#00618a",
    background: "#e7f3f8",
    hint: "SQL relationnel très répandu, souvent choisi avec Laravel, Rails ou hébergement classique."
  },
  redis: {
    id: "redis",
    label: "Redis",
    short: "RD",
    kind: "database",
    color: "#dc382d",
    background: "#fff0ee",
    hint: "Cache, sessions, rate limit, files d'attente; rarement la source de vérité principale."
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
  sveltekit: {
    id: "sveltekit",
    label: "SvelteKit",
    short: "SK",
    kind: "framework",
    color: "#ff3e00",
    background: "#fff0eb",
    hint: "Framework fullstack Svelte, très bon DX et peu de runtime client."
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
  queue: {
    id: "queue",
    label: "Queues/Jobs",
    short: "Q",
    kind: "capability",
    color: "#5c6f82",
    background: "#edf2f6",
    hint: "Traitements en arrière-plan: emails, exports, sync, webhooks, tâches longues."
  },
  search: {
    id: "search",
    label: "Search",
    short: "SR",
    kind: "capability",
    color: "#b45309",
    background: "#fff3df",
    hint: "Recherche texte/facettes: Algolia, Meilisearch, Typesense, OpenSearch."
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
  if (provider.id === "aws") return "aws";
  return null;
}
