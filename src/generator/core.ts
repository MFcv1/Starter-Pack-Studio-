import { cp, mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import type {
  BootstrapCommand,
  GenerationLog,
  GenerationOptions,
  GenerationResult,
  PackageManager,
  StarterPack
} from "../shared/types.js";
import { getStarterPack, getDynamicDocsForCombo } from "../shared/starterRegistry.js";
import { renderFile } from "./renderers.js";

const projectNamePattern = /^[a-z0-9][a-z0-9-_]{1,62}$/;
const bundledDesignSkillsRelativePath = path.join("templates", "design-skills", "skills");
const moduleDir = path.dirname(fileURLToPath(import.meta.url));

function log(level: GenerationLog["level"], message: string, detail?: string): GenerationLog {
  return { level, message, detail };
}

function safeJoin(base: string, projectName: string): string {
  const resolvedBase = path.resolve(base);
  const resolvedTarget = path.resolve(resolvedBase, projectName);
  const relativeTarget = path.relative(resolvedBase, resolvedTarget);
  if (relativeTarget.startsWith("..") || path.isAbsolute(relativeTarget)) {
    throw new Error("Destination invalide.");
  }
  return resolvedTarget;
}

async function ensureEmptyOrCreate(targetPath: string): Promise<void> {
  await mkdir(targetPath, { recursive: true });
  const entries = await readdir(targetPath);
  const allowed = new Set([".git"]);
  const blocking = entries.filter((entry) => !allowed.has(entry));
  if (blocking.length > 0) {
    throw new Error(`Le dossier existe deja et n'est pas vide: ${blocking.slice(0, 4).join(", ")}`);
  }
}

async function ensureMissingForOfficialBootstrap(targetPath: string): Promise<void> {
  try {
    await stat(targetPath);
    throw new Error("Le dossier cible existe deja. Choisis un nom de projet neuf pour laisser le CLI creer le dossier.");
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return;
    throw error;
  }
}

async function writeRenderedDocs(targetPath: string, pack: StarterPack, options: GenerationOptions): Promise<string[]> {
  const dynamicDocs = getDynamicDocsForCombo(pack.id, options.providerId);
  const docs = dynamicDocs.filter((doc) => {
    if (doc.path === "@agent.md" && !options.includeAgentMd) return false;
    if (doc.path === "SECURITY.md" && !options.includeSecurityMd) return false;
    return true;
  });

  const written: string[] = [];

  for (const doc of docs) {
    const filePath = path.join(targetPath, doc.path);
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, renderFile(doc.path, pack, options), "utf8");
    written.push(doc.path);
  }

  return written;
}

function selectBootstrap(pack: StarterPack, packageManager: PackageManager): BootstrapCommand | undefined {
  return pack.bootstrapCommands.find((command) => {
    return command.command === packageManager && (!command.appliesToManagers || command.appliesToManagers.includes(packageManager));
  });
}

function renderArgs(args: string[], projectName: string): string[] {
  return args.map((arg) => arg.replaceAll("{{projectName}}", projectName));
}

async function ensureProfessionalStructure(targetPath: string): Promise<string[]> {
  const directories = [
    "docs",
    "src",
    "public",
    "public/media",
    "public/media/images",
    "public/media/videos",
    "public/media/documents",
    "public/media/icons",
    "tests",
    ".github/workflows"
  ];

  for (const directory of directories) {
    await mkdir(path.join(targetPath, directory), { recursive: true });
  }

  return directories.map((directory) => `${directory}/`);
}

async function installDesignSkills(targetPath: string): Promise<{ files: string[]; count: number }> {
  const designSkillsSourcePath = await resolveDesignSkillsSourcePath();
  const sourceStat = await stat(designSkillsSourcePath);
  if (!sourceStat.isDirectory()) {
    throw new Error(`Le dossier de skills design est invalide: ${designSkillsSourcePath}`);
  }

  const targetSkillsPath = path.join(targetPath, ".agents", "skills");
  await mkdir(path.dirname(targetSkillsPath), { recursive: true });
  await cp(designSkillsSourcePath, targetSkillsPath, { recursive: true, force: true });

  const entries = await readdir(targetSkillsPath, { withFileTypes: true });
  const skillDirectories = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  return {
    files: [".agents/", ".agents/skills/", ...skillDirectories.map((name) => `.agents/skills/${name}/`)],
    count: skillDirectories.filter((name) => name !== "_shared").length
  };
}

async function resolveDesignSkillsSourcePath(): Promise<string> {
  const resourcesPath = (process as NodeJS.Process & { resourcesPath?: string }).resourcesPath;
  const candidates = [
    resourcesPath ? path.join(resourcesPath, bundledDesignSkillsRelativePath) : "",
    path.resolve(moduleDir, "..", "..", bundledDesignSkillsRelativePath),
    path.resolve(process.cwd(), bundledDesignSkillsRelativePath),
    path.resolve(process.cwd(), "..", "..", bundledDesignSkillsRelativePath)
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      const candidateStat = await stat(candidate);
      if (candidateStat.isDirectory()) return candidate;
    } catch {
      // Try the next known app location.
    }
  }

  throw new Error("Le pack de skills design embarque est introuvable dans l'application.");
}

function resolveExecutable(command: string): string {
  if (process.platform !== "win32") return command;
  if (command.endsWith(".cmd") || command.endsWith(".exe")) return command;
  if (["npm", "pnpm", "firebase", "wrangler", "stripe", "code"].includes(command)) {
    return `${command}.cmd`;
  }
  return command;
}

function runCommand(command: string, args: string[], cwd: string): Promise<{ logs: GenerationLog[]; ok: boolean }> {
  return new Promise((resolve) => {
    const executable = resolveExecutable(command);
    const logs: GenerationLog[] = [log("info", `Commande: ${command} ${args.join(" ")}`)];
    const child = spawn(executable, args, { cwd, shell: process.platform === "win32", windowsHide: true });

    child.stdout.on("data", (chunk: Buffer) => {
      const message = chunk.toString("utf8").trim();
      if (message) logs.push(log("info", message));
    });
    child.stderr.on("data", (chunk: Buffer) => {
      const message = chunk.toString("utf8").trim();
      if (message) logs.push(log("warning", message));
    });
    child.on("error", (error) => {
      logs.push(log("error", `Commande introuvable ou impossible: ${command}`, error.message));
      resolve({ logs, ok: false });
    });
    child.on("close", (code) => {
      if (code === 0) {
        logs.push(log("success", `Commande terminee: ${command}`));
        resolve({ logs, ok: true });
      } else {
        logs.push(log("error", `Commande echouee avec le code ${code}: ${command}`));
        resolve({ logs, ok: false });
      }
    });
  });
}

async function writeMinimalScaffold(targetPath: string, pack: StarterPack, options: GenerationOptions): Promise<string[]> {
  const files: Array<[string, string]> = [
    [
      "package.json",
      JSON.stringify(
        {
          name: options.projectName,
          version: "0.1.0",
          private: true,
          scripts: {
            dev: "echo \"Starter minimal: lance le bootstrap officiel depuis docs/DECISION-MATRIX.md\"",
            build: "echo \"No build configured yet\"",
            lint: "echo \"No lint configured yet\""
          }
        },
        null,
        2
      ) + "\n"
    ],
    [
      ".gitignore",
      ["node_modules", "dist", ".env", ".env.local", ".DS_Store", ".firebase", ".wrangler", "coverage"].join("\n") + "\n"
    ],
    [
      "src/README.md",
      `# Source\n\nCe dossier est un scaffold minimal pour ${pack.label}. Utilise les commandes officielles dans docs/DECISION-MATRIX.md pour remplacer ce squelette par un starter framework complet.\n`
    ]
  ];

  const written: string[] = [];
  for (const [relativePath, content] of files) {
    const filePath = path.join(targetPath, relativePath);
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, content, "utf8");
    written.push(relativePath);
  }
  return written;
}

export async function generateProject(options: GenerationOptions): Promise<GenerationResult> {
  const logs: GenerationLog[] = [];
  const files: string[] = [];

  try {
    const pack = getStarterPack(options.starterId);
    if (!pack) throw new Error("Starter inconnu.");
    if (!projectNamePattern.test(options.projectName)) {
      throw new Error("Nom de projet invalide. Utilise minuscules, chiffres, tirets ou underscores.");
    }

    const targetPath = safeJoin(options.destinationPath, options.projectName);
    logs.push(log("info", `Creation du projet ${options.projectName}`));
    logs.push(log("info", `Destination: ${targetPath}`));

    await ensureMissingForOfficialBootstrap(targetPath);
    const bootstrap = selectBootstrap(pack, options.packageManager);
    if (bootstrap) {
      logs.push(log("info", `Bootstrap officiel: ${bootstrap.label}`));
      const parent = path.dirname(targetPath);
      await mkdir(parent, { recursive: true });
      const bootstrapResult = await runCommand(bootstrap.command, renderArgs(bootstrap.args, options.projectName), parent);
      logs.push(...bootstrapResult.logs);
      if (!bootstrapResult.ok) {
        throw new Error("Le bootstrap officiel a echoue. Corrige l'outil manquant ou la commande avant de continuer.");
      }
    } else {
      logs.push(log("warning", "Aucun bootstrap officiel compatible. Generation scaffold minimal."));
      await ensureEmptyOrCreate(targetPath);
      files.push(...(await writeMinimalScaffold(targetPath, pack, options)));
    }

    files.push(...(await ensureProfessionalStructure(targetPath)));
    const designSkills = await installDesignSkills(targetPath);
    files.push(...designSkills.files);
    logs.push(log("success", `Skills IA design installes: ${designSkills.count} skills + _shared`));
    files.push(...(await writeRenderedDocs(targetPath, pack, options)));

    if (options.initGit) {
      const gitResult = await runCommand("git", ["init"], targetPath);
      logs.push(...gitResult.logs);
    }

    if (options.runInstall) {
      const installResult = await runCommand(options.packageManager, ["install"], targetPath);
      logs.push(...installResult.logs);
      if (!installResult.ok) {
        throw new Error("L'installation des dependances a echoue.");
      }
    }

    logs.push(log("success", "Starter genere."));
    return { ok: true, projectPath: targetPath, logs, files };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue.";
    logs.push(log("error", message));
    return { ok: false, logs, files, error: message };
  }
}
