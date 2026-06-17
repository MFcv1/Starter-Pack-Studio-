export type ProviderId = "firebase" | "cloudflare" | "vercel" | "netlify" | "aws" | "local";

export type TechId =
  | "astro"
  | "angular"
  | "aws"
  | "cms"
  | "django"
  | "react"
  | "next"
  | "nest"
  | "nuxt"
  | "node-api"
  | "vite"
  | "remix"
  | "render"
  | "rails"
  | "laravel"
  | "fastapi"
  | "firebase"
  | "firestore"
  | "firebase-sql"
  | "cloudflare"
  | "mongodb"
  | "mysql"
  | "redis"
  | "supabase"
  | "sveltekit"
  | "d1"
  | "vercel"
  | "netlify"
  | "queue"
  | "search"
  | "stripe"
  | "postgres"
  | "seo"
  | "auth"
  | "storage";

export type StarterId =
  | "landing-page"
  | "site-vitrine-simple"
  | "vitrine-editable"
  | "site-app-local"
  | "marketplace-locale"
  | "marketplace-stripe"
  | "app-metier-sql"
  | "dashboard-admin";

export type PackageManager = "pnpm" | "npm";

export type GenerationMode = "official-bootstrap";

export type ToolName = "node" | "git" | "pnpm" | "npm" | "code" | "firebase" | "wrangler" | "stripe";

export type LogLevel = "info" | "success" | "warning" | "error";

export interface StarterDoc {
  path: string;
  purpose: string;
  required: boolean;
}

export interface ProviderRecommendation {
  id: ProviderId;
  label: string;
  fit: "primary" | "good" | "possible" | "avoid";
  reason: string;
}

export interface DatabaseRecommendation {
  primary: "none" | "firestore" | "sql" | "d1" | "hybrid";
  label: string;
  summary: string;
  whenFirestoreFits: string[];
  whenSqlFits: string[];
  warning: string;
}

export interface ArchitectureCombo {
  id: string;
  label: string;
  fit: "recommended" | "lean" | "scalable" | "specialized" | "avoid";
  stack: string[];
  estimatedCost: string;
  firebaseRole: "not-needed" | "optional" | "recommended" | "required";
  bestFor: string;
  tradeoffs: string[];
  details: string[];
}

export interface StarterChoice {
  starterId: StarterId;
  label: string;
  description: string;
}

export interface ProviderServiceKnowledge {
  label: string;
  freeTier: string;
  paidFrom: string;
  bestFor: string;
  watch: string;
}

export interface ProviderKnowledge {
  id: ProviderId;
  label: string;
  summary: string;
  bestFor: string[];
  avoidFor: string[];
  pricing: string;
  services: ProviderServiceKnowledge[];
  tags: string[];
  watch: string[];
  sources: string[];
}

export interface SeoKnowledge {
  id: string;
  label: string;
  defaultRendering: "astro-ssg" | "next-ssg" | "next-isr" | "next-ssr" | "csr-private";
  bestFor: string[];
  avoidFor: string[];
  googleRequirements: string[];
  requiredArtifacts: string[];
  sitelinkGuidance: string[];
  antiPatterns: string[];
  sources: string[];
}

export interface StarterVariant {
  id: string;
  label: string;
  trigger: string;
  impact: string;
  recommendedAddOn: string;
  costImpact: string;
}

export interface StarterDecision {
  starterId: StarterId;
  title: string;
  recommendedStack: string[];
  recommendedProvider: ProviderId;
  rendering: string;
  estimatedCost: string;
  why: string[];
  costLimits: string[];
  whenChange: string[];
  avoid: string[];
  variants: StarterVariant[];
  providerNotes: string[];
  sourceIds: string[];
}

export interface SitelinkCandidatePage {
  route: string;
  label: string;
  role: string;
  title: string;
  h1: string;
  metaDescription: string;
  schema: string[];
  internalLinks: string[];
}

export interface SitelinkMap {
  summary: string;
  primaryNavigation: string[];
  homepageSections: string[];
  footerNavigation: string[];
  candidatePages: SitelinkCandidatePage[];
  avoid: string[];
}

export interface BootstrapCommand {
  label: string;
  command: "pnpm" | "npm";
  args: string[];
  appliesToManagers?: PackageManager[];
}

export interface StarterPack {
  id: StarterId;
  label: string;
  shortLabel: string;
  intent: string;
  example: string;
  defaultMode: GenerationMode;
  recommendedStack: string[];
  stackTechIds?: TechId[];
  database?: DatabaseRecommendation;
  architectureCombos?: ArchitectureCombo[];
  sitelinkMap?: SitelinkMap;
  alternatives: string[];
  providers: ProviderRecommendation[];
  badChoices: string[];
  docs: StarterDoc[];
  requiredTools: ToolName[];
  optionalTools: ToolName[];
  bootstrapCommands: BootstrapCommand[];
  notes: string[];
}

export interface GenerationOptions {
  starterId: StarterId;
  projectName: string;
  destinationPath: string;
  packageManager: PackageManager;
  providerId: ProviderId;
  mode: GenerationMode;
  runInstall: boolean;
  initGit: boolean;
  openInVSCode: boolean;
  includeAgentMd: boolean;
  includeSecurityMd: boolean;
}

export interface GenerationLog {
  level: LogLevel;
  message: string;
  detail?: string;
}

export interface GenerationResult {
  ok: boolean;
  projectPath?: string;
  logs: GenerationLog[];
  files: string[];
  error?: string;
}

export interface ProjectRecord {
  id: string;
  name: string;
  path: string;
  starterId: StarterId;
  starterLabel: string;
  providerId: ProviderId;
  packageManager: PackageManager;
  createdAt: string;
  filesCount: number;
  docsCount: number;
  skillsCount: number;
  gitInitialized: boolean;
  dependenciesInstalled: boolean;
  openedInVSCode: boolean;
  migratedAt?: string;
}

export interface ProjectOperationResult {
  ok: boolean;
  logs: GenerationLog[];
  project?: ProjectRecord;
  error?: string;
}

export interface ToolStatus {
  name: ToolName;
  available: boolean;
  version?: string;
  detail?: string;
}

export interface DesktopApi {
  getDesktopPath(): Promise<string>;
  chooseDirectory(): Promise<string | null>;
  checkTools(tools: ToolName[]): Promise<ToolStatus[]>;
  generateProject(options: GenerationOptions): Promise<GenerationResult>;
  listProjects(): Promise<ProjectRecord[]>;
  deleteProject(projectId: string): Promise<ProjectOperationResult>;
  migrateProject(projectId: string, destinationPath: string): Promise<ProjectOperationResult>;
  openPath(path: string): Promise<void>;
  openExternalUrl(url: string): Promise<void>;
  openProjectInVSCode(path: string): Promise<void>;
}
