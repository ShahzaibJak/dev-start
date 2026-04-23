import { execSync } from "node:child_process";

export async function initGit(targetDir: string) {
  execSync("git init", { cwd: targetDir, stdio: "ignore" });
  execSync("git add -A", { cwd: targetDir, stdio: "ignore" });
  execSync('git commit -m "initial commit from devstart" --no-verify', {
    cwd: targetDir,
    stdio: "ignore",
  });
}
