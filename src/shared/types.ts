export type ProviderId = "firebase" | "cloudflare" | "vercel" | "netlify" | "local";

export type TechId =
  | "astro"
  | "next"
  | "vite"
  | "firebase"
  | "firestore"
  | "firebase-sql"
  | "cloudflare"
  | "d1"
  | "vercel"
  | "netlify"
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
  openProjectInVSCode(path: string): Promise<void>;
}
