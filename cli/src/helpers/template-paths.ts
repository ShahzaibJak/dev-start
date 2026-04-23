import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function findCliRoot(startDir: string): Promise<string> {
  const candidates = [
    path.resolve(startDir, ".."),
    path.resolve(startDir, "..", ".."),
    path.resolve(startDir, "..", "..", ".."),
  ];

  for (const candidate of candidates) {
    const templatesDir = path.join(candidate, "templates");
    if (await fs.pathExists(templatesDir)) {
      return candidate;
    }
  }

  throw new Error(`Unable to locate CLI templates relative to ${startDir}`);
}

export async function resolveCliRoot(): Promise<string> {
  return findCliRoot(__dirname);
}

export async function resolveTemplateBaseDir(template: string): Promise<string> {
  const cliRoot = await resolveCliRoot();
  return path.join(cliRoot, "templates", template, "base");
}

export async function resolveTemplateExtraDir(
  template: string,
  extra: string,
): Promise<string> {
  const cliRoot = await resolveCliRoot();
  return path.join(cliRoot, "templates", template, "extras", extra);
}
