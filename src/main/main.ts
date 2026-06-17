import path from "node:path";
import { access, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { generateProject } from "../generator/core.js";
import { starterPacks } from "../shared/starterRegistry.js";
import type { GenerationLog, GenerationOptions, GenerationResult, ProjectOperationResult, ProjectRecord, ToolName, ToolStatus } from "../shared/types.js";

const require = createRequire(import.meta.url);
const electron = require("electron") as typeof import("electron");
const { app, BrowserWindow, dialog, ipcMain, shell } = electron;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function rendererUrl(): string {
  if (process.argv.includes("--dev")) {
    return "http://127.0.0.1:5173";
  }
  return pathToFileURL(path.join(__dirname, "../../dist/index.html")).toString();
}

function createWindow(): void {
  const win = new BrowserWindow({
    width: 1520,
    height: 960,
    minWidth: 1120,
    minHeight: 720,
    title: "Starter Pack Studio",
    backgroundColor: "#f7f8f8",
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  void win.loadURL(rendererUrl());
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("studio:get-desktop-path", () => {
  return app.getPath("desktop");
});

ipcMain.handle("studio:choose-directory", async () => {
  const result = await dialog.showOpenDialog({
    title: "Choisir un dossier de destination",
    properties: ["openDirectory", "createDirectory"]
  });
  if (result.canceled || result.filePaths.length === 0) return null;
  return result.filePaths[0];
});

ipcMain.handle("studio:check-tools", async (_event, tools: ToolName[]) => {
  return Promise.all(tools.map(checkTool));
});

ipcMain.handle("studio:generate-project", async (_event, input: GenerationOptions) => {
  const result = await generateProject(input);
  if (result.ok && input.openInVSCode && result.projectPath) {
    await openVsCode(result.projectPath);
  }
  if (result.ok && result.projectPath) {
    await saveGeneratedProject(input, result);
  }
  return result;
});

ipcMain.handle("studio:list-projects", async () => {
  return readProjects();
});

ipcMain.handle("studio:delete-project", async (_event, projectId: string) => {
  return deleteProject(projectId);
});

ipcMain.handle("studio:migrate-project", async (_event, projectId: string, destinationPath: string) => {
  return migrateProject(projectId, destinationPath);
});

ipcMain.handle("studio:open-path", async (_event, targetPath: string) => {
  await shell.openPath(targetPath);
});

ipcMain.handle("studio:open-external-url", async (_event, targetUrl: string) => {
  const url = new URL(targetUrl);
  if (url.protocol !== "https:") {
    throw new Error("Seuls les liens HTTPS sont autorisés.");
  }
  await shell.openExternal(url.toString());
});

ipcMain.handle("studio:open-project-vscode", async (_event, targetPath: string) => {
  await openVsCode(targetPath);
});

function projectsStorePath(): string {
  return path.join(app.getPath("userData"), "starter-pack-projects.json");
}

async function readProjects(): Promise<ProjectRecord[]> {
  try {
    const raw = await readFile(projectsStorePath(), "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isProjectRecord) : [];
  } catch {
    return [];
  }
}

async function writeProjects(projects: ProjectRecord[]): Promise<void> {
  const target = projectsStorePath();
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, JSON.stringify(projects, null, 2), "utf8");
}

async function saveGeneratedProject(input: GenerationOptions, result: GenerationResult): Promise<void> {
  if (!result.projectPath) return;
  const starter = starterPacks.find((pack) => pack.id === input.starterId);
  const record: ProjectRecord = {
    id: `${Date.now()}-${input.projectName}`,
    name: path.basename(result.projectPath),
    path: result.projectPath,
    starterId: input.starterId,
    starterLabel: starter?.label ?? input.starterId,
    providerId: input.providerId,
    packageManager: input.packageManager,
    createdAt: new Date().toISOString(),
    filesCount: result.files.length,
    docsCount: result.files.filter((file) => file.startsWith("docs/")).length,
    skillsCount: result.files.filter((file) => file.startsWith(".agents/skills/") && file !== ".agents/skills/" && !file.includes("_shared")).length,
    gitInitialized: input.initGit && result.logs.some((log) => log.message.toLowerCase().includes("commande terminee: git")),
    dependenciesInstalled: input.runInstall && result.logs.some((log) => log.message.toLowerCase().includes(`commande terminee: ${input.packageManager}`)),
    openedInVSCode: input.openInVSCode
  };

  const projects = await readProjects();
  const nextProjects = [record, ...projects.filter((project) => project.path.toLowerCase() !== record.path.toLowerCase())].slice(0, 100);
  await writeProjects(nextProjects);
}

function isProjectRecord(value: unknown): value is ProjectRecord {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ProjectRecord>;
  return typeof candidate.id === "string" && typeof candidate.name === "string" && typeof candidate.path === "string";
}

function lockedFolderMessage(): string {
  if (process.platform === "darwin") {
    return "Le dossier semble verrouille ou inaccessible. Ferme VS Code/Finder sur ce projet, verifie les permissions, puis recommence.";
  }
  if (process.platform === "win32") {
    return "Le dossier est verrouille par Windows. Ferme VS Code/Explorateur sur ce projet puis recommence.";
  }
  return "Le dossier semble verrouille ou inaccessible. Ferme les applications qui l'utilisent, verifie les permissions, puis recommence.";
}

async function deleteProject(projectId: string): Promise<ProjectOperationResult> {
  const logs: GenerationLog[] = [];
  const projects = await readProjects();
  const project = projects.find((record) => record.id === projectId);
  if (!project) {
    return { ok: false, logs, error: "Projet introuvable dans Starter Pack Studio." };
  }

  logs.push(log("info", `Suppression du projet: ${project.name}`));
  if (await pathExists(project.path)) {
    const removed = await removeProjectFolder(project.path, logs);
    if (!removed) {
      return {
        ok: false,
        logs,
        error: lockedFolderMessage()
      };
    }
  } else {
    logs.push(log("warning", "Dossier deja absent du disque."));
  }

  await writeProjects(projects.filter((record) => record.id !== projectId));
  logs.push(log("success", "Projet retire de Mes projets."));
  return { ok: true, logs };
}

async function migrateProject(projectId: string, destinationRoot: string): Promise<ProjectOperationResult> {
  const logs: GenerationLog[] = [];
  const projects = await readProjects();
  const project = projects.find((record) => record.id === projectId);
  if (!project) {
    return { ok: false, logs, error: "Projet introuvable dans Starter Pack Studio." };
  }

  const sourcePath = path.resolve(project.path);
  const targetPath = path.resolve(destinationRoot, project.name);
  logs.push(log("info", `Migration de ${project.name}`));
  logs.push(log("info", `Source: ${sourcePath}`));
  logs.push(log("info", `Destination: ${targetPath}`));

  if (!(await pathExists(sourcePath))) {
    return { ok: false, logs, error: "Le dossier source n'existe plus sur le disque." };
  }
  if (sourcePath.toLowerCase() === targetPath.toLowerCase()) {
    return { ok: false, logs, error: "La destination est identique au dossier actuel." };
  }
  if (await pathExists(targetPath)) {
    return { ok: false, logs, error: "Un dossier existe deja a cette destination." };
  }

  try {
    await mkdir(path.dirname(targetPath), { recursive: true });
    logs.push(log("info", "Copie des fichiers projet sans dependances ni caches lourds..."));
    await cp(sourcePath, targetPath, {
      recursive: true,
      filter: (source) => shouldCopyForMigration(sourcePath, source)
    });
    logs.push(log("success", "Fichiers projet copies."));

    if (await pathExists(path.join(targetPath, "package.json"))) {
      const install = await runProjectCommand(project.packageManager, ["install"], targetPath);
      logs.push(...install.logs);
      if (!install.ok) {
        return {
          ok: false,
          logs,
          error: "La copie est faite, mais la reinstallation des dependances a echoue. L'ancien dossier reste intact."
        };
      }
    } else {
      logs.push(log("warning", "Aucun package.json detecte, installation ignoree."));
    }

    const sourceRemoved = await removeProjectFolder(sourcePath, logs, "Ancien dossier");
    if (!sourceRemoved) {
      logs.push(log("warning", `Migration conservee, mais l'ancien dossier est reste sur place. ${lockedFolderMessage()}`));
    }

    const migratedProject: ProjectRecord = {
      ...project,
      path: targetPath,
      dependenciesInstalled: true,
      migratedAt: new Date().toISOString()
    };
    await writeProjects(projects.map((record) => (record.id === project.id ? migratedProject : record)));
    logs.push(log("success", "Migration terminee."));
    return { ok: true, logs, project: migratedProject };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Migration impossible.";
    logs.push(log("error", message));
    if (await pathExists(targetPath)) {
      logs.push(log("warning", "Nettoyage du dossier de destination incomplet..."));
      await rm(targetPath, { recursive: true, force: true }).catch(() => undefined);
    }
    return { ok: false, logs, error: message };
  }
}

function shouldCopyForMigration(rootPath: string, sourcePath: string): boolean {
  const relative = path.relative(rootPath, sourcePath);
  if (!relative) return true;
  const ignoredSegments = new Set(["node_modules", ".next", "dist", "build", ".turbo", ".vite", ".cache", "coverage"]);
  return !relative.split(path.sep).some((segment) => ignoredSegments.has(segment));
}

async function pathExists(targetPath: string): Promise<boolean> {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function removeProjectFolder(targetPath: string, logs: GenerationLog[], label = "Dossier"): Promise<boolean> {
  try {
    await shell.trashItem(targetPath);
    logs.push(log("success", `${label} envoye dans la corbeille.`));
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Corbeille indisponible.";
    logs.push(log("warning", `Corbeille indisponible: ${message}`));
    try {
      await rm(targetPath, { recursive: true, force: true });
      logs.push(log("success", `${label} supprime du disque.`));
      return true;
    } catch (removeError) {
      const removeMessage = removeError instanceof Error ? removeError.message : "Suppression impossible.";
      logs.push(log("error", removeMessage));
      return false;
    }
  }
}

function runProjectCommand(command: "pnpm" | "npm", args: string[], cwd: string): Promise<{ ok: boolean; logs: GenerationLog[] }> {
  const logs: GenerationLog[] = [log("info", `Commande: ${command} ${args.join(" ")}`)];
  return new Promise((resolve) => {
    let child: ReturnType<typeof spawn>;
    try {
      child = spawn(resolveCommand(command), args, {
        cwd,
        shell: process.platform === "win32",
        windowsHide: true
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Commande impossible.";
      resolve({ ok: false, logs: [...logs, log("error", message)] });
      return;
    }

    child.stdout?.on("data", (chunk: Buffer) => {
      const text = chunk.toString("utf8").trim();
      if (text) logs.push(log("info", text));
    });
    child.stderr?.on("data", (chunk: Buffer) => {
      const text = chunk.toString("utf8").trim();
      if (text) logs.push(log("warning", text));
    });
    child.on("error", (error) => {
      resolve({ ok: false, logs: [...logs, log("error", error.message)] });
    });
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ ok: true, logs: [...logs, log("success", `Commande terminee: ${command}`)] });
      } else {
        resolve({ ok: false, logs: [...logs, log("error", `Commande echouee avec le code ${code}: ${command}`)] });
      }
    });
  });
}

function log(level: GenerationLog["level"], message: string, detail?: string): GenerationLog {
  return { level, message, detail };
}

function checkTool(name: ToolName): Promise<ToolStatus> {
  const command = resolveCommand(name);
  const args = name === "code" ? ["--version"] : ["--version"];

  return new Promise((resolve) => {
    let child: ReturnType<typeof spawn>;
    try {
      child = spawn(command, args, { shell: process.platform === "win32", windowsHide: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Tool check impossible.";
      resolve({ name, available: false, detail: message });
      return;
    }
    let output = "";
    let errorOutput = "";

    child.stdout?.on("data", (chunk: Buffer) => {
      output += chunk.toString("utf8");
    });
    child.stderr?.on("data", (chunk: Buffer) => {
      errorOutput += chunk.toString("utf8");
    });
    child.on("error", (error) => {
      resolve({ name, available: false, detail: error.message });
    });
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ name, available: true, version: output.split(/\r?\n/)[0]?.trim() || "available" });
      } else {
        resolve({ name, available: false, detail: errorOutput.trim() || `Exit code ${code}` });
      }
    });
  });
}

async function openVsCode(projectPath: string): Promise<void> {
  await new Promise<void>((resolve) => {
    try {
      const child = spawn(resolveCommand("code"), [projectPath], {
        detached: true,
        shell: process.platform === "win32",
        stdio: "ignore",
        windowsHide: true
      });
      child.on("error", () => {
        void shell.openPath(projectPath).finally(resolve);
      });
      child.unref();
      resolve();
    } catch {
      void shell.openPath(projectPath).finally(resolve);
    }
  });
}

function resolveCommand(name: ToolName): string {
  if (process.platform === "win32") {
    if (name === "pnpm" || name === "npm" || name === "code" || name === "firebase" || name === "wrangler" || name === "stripe") {
      return `${name}.cmd`;
    }
  }
  return name;
}
