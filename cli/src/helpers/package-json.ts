import path from "node:path";
import fs from "fs-extra";

export async function updatePackageJson(
  targetDir: string,
  projectName: string,
  extraDeps: Record<string, string>,
) {
  const pkgPath = path.join(targetDir, "package.json");
  const pkg = await fs.readJson(pkgPath);

  // Set project name
  pkg.name = projectName;

  // Merge extra dependencies
  if (Object.keys(extraDeps).length > 0) {
    pkg.dependencies = {
      ...pkg.dependencies,
      ...extraDeps,
    };
  }

  await fs.writeJson(pkgPath, pkg, { spaces: 2 });
}
