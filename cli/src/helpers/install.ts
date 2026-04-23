import { execSync } from "node:child_process";
import consola from "consola";

export async function installDeps(targetDir: string) {
  consola.start("Installing dependencies with bun...");
  execSync("bun install", { cwd: targetDir, stdio: "inherit" });
}
