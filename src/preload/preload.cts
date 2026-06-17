import { contextBridge, ipcRenderer } from "electron";
import type { DesktopApi, GenerationOptions, ToolName } from "../shared/types.js";

const api: DesktopApi = {
  getDesktopPath: () => ipcRenderer.invoke("studio:get-desktop-path"),
  chooseDirectory: () => ipcRenderer.invoke("studio:choose-directory"),
  checkTools: (tools: ToolName[]) => ipcRenderer.invoke("studio:check-tools", tools),
  generateProject: (options: GenerationOptions) => ipcRenderer.invoke("studio:generate-project", options),
  listProjects: () => ipcRenderer.invoke("studio:list-projects"),
  deleteProject: (projectId: string) => ipcRenderer.invoke("studio:delete-project", projectId),
  migrateProject: (projectId: string, destinationPath: string) => ipcRenderer.invoke("studio:migrate-project", projectId, destinationPath),
  openPath: (path: string) => ipcRenderer.invoke("studio:open-path", path),
  openExternalUrl: (url: string) => ipcRenderer.invoke("studio:open-external-url", url),
  openProjectInVSCode: (path: string) => ipcRenderer.invoke("studio:open-project-vscode", path)
};

contextBridge.exposeInMainWorld("studio", api);
