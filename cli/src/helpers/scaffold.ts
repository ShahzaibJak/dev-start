import path from "node:path";
import fs from "fs-extra";
import {
  resolveTemplateBaseDir,
  resolveTemplateExtraDir,
} from "./template-paths.js";

/**
 * Dotfiles that npm strips during publish.
 * Stored with a leading underscore in the template and restored on scaffold.
 */
const DOTFILE_RENAMES: Record<string, string> = {
  _agents: ".agents",
  _claude: ".claude",
  _github: ".github",
  _gitignore: ".gitignore",
  _gitkeep: ".gitkeep",
  _husky: ".husky",
  _prettierignore: ".prettierignore",
  _prettierrc: ".prettierrc",
  "_env.schema": ".env.schema",
};

async function restoreDotEntries(dir: string): Promise<void> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    const renamed = DOTFILE_RENAMES[entry.name];

    if (renamed) {
      const renamedPath = path.join(dir, renamed);
      await fs.rename(entryPath, renamedPath);

      if ((await fs.stat(renamedPath)).isDirectory()) {
        await restoreDotEntries(renamedPath);
      }

      continue;
    }

    if (entry.isDirectory()) {
      await restoreDotEntries(entryPath);
      continue;
    }
  }
}

const SKIPPED_TEMPLATE_FILES = new Set(["bun.lock"]);

type MergeHandler = (sourceDir: string, targetDir: string) => Promise<void>;

function shouldSkipTemplateFile(src: string): boolean {
  return SKIPPED_TEMPLATE_FILES.has(path.basename(src)) || path.basename(src) in MERGE_HANDLERS;
}

async function mergePackageJson(sourceDir: string, targetDir: string): Promise<void> {
  const sourcePath = path.join(sourceDir, "package.json");
  const targetPath = path.join(targetDir, "package.json");

  if (!(await fs.pathExists(sourcePath)) || !(await fs.pathExists(targetPath))) {
    return;
  }

  const sourcePkg = await fs.readJson(sourcePath);
  const targetPkg = await fs.readJson(targetPath);

  const mergeRecord = (key: string) => {
    if (!sourcePkg[key]) {
      return;
    }

    const targetRecord = targetPkg[key] || {};

    targetPkg[key] = {
      ...targetRecord,
      ...sourcePkg[key],
    };
  };

  mergeRecord("scripts");
  mergeRecord("dependencies");
  mergeRecord("devDependencies");
  mergeRecord("peerDependencies");
  mergeRecord("optionalDependencies");
  mergeRecord("lint-staged");
  mergeRecord("config");
  mergeRecord("overrides");

  await fs.writeJson(targetPath, targetPkg, { spaces: 2 });
}

interface MarkdownSection {
  heading: string;
  content: string;
}

function parseMarkdownSections(text: string): { preamble: string; sections: MarkdownSection[] } {
  const lines = text.split("\n");
  let preamble = "";
  const sections: MarkdownSection[] = [];
  let currentHeading = "";
  let currentLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (currentHeading) {
        sections.push({ heading: currentHeading, content: currentLines.join("\n") });
      } else {
        preamble = currentLines.join("\n");
      }
      currentHeading = line;
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }

  if (currentHeading) {
    sections.push({ heading: currentHeading, content: currentLines.join("\n") });
  } else {
    preamble = currentLines.join("\n");
  }

  return { preamble, sections };
}

function mergeMarkdownSections(target: string, source: string): string {
  const targetParsed = parseMarkdownSections(target);
  const sourceParsed = parseMarkdownSections(source);
  const merged = [...targetParsed.sections];

  for (const sourceSection of sourceParsed.sections) {
    const existingIndex = merged.findIndex((s) => s.heading === sourceSection.heading);

    if (existingIndex >= 0) {
      merged[existingIndex] = sourceSection;
    } else {
      merged.push(sourceSection);
    }
  }

  const parts: string[] = [];

  if (targetParsed.preamble.trim()) {
    parts.push(targetParsed.preamble);
  }

  for (const section of merged) {
    parts.push(`${section.heading}\n${section.content}`);
  }

  return `${parts.join("\n").replace(/\n{3,}/gu, "\n\n").trimEnd()}\n`;
}

async function mergeClaudeMd(sourceDir: string, targetDir: string): Promise<void> {
  const sourcePath = path.join(sourceDir, "CLAUDE.md");
  const targetPath = path.join(targetDir, "CLAUDE.md");

  if (!(await fs.pathExists(sourcePath))) {
    return;
  }

  if (!(await fs.pathExists(targetPath))) {
    await fs.copy(sourcePath, targetPath, { overwrite: false });
    return;
  }

  const targetContent = await fs.readFile(targetPath, "utf8");
  const sourceContent = await fs.readFile(sourcePath, "utf8");
  const merged = mergeMarkdownSections(targetContent, sourceContent);

  await fs.writeFile(targetPath, merged);
}

async function mergeGitignore(sourceDir: string, targetDir: string): Promise<void> {
  const sourcePath = path.join(sourceDir, "_gitignore");
  const targetPath = path.join(targetDir, "_gitignore");

  if (!(await fs.pathExists(sourcePath))) {
    return;
  }

  if (!(await fs.pathExists(targetPath))) {
    await fs.copy(sourcePath, targetPath, { overwrite: false });
    return;
  }

  const targetLines = (await fs.readFile(targetPath, "utf8")).split("\n");
  const sourceLines = (await fs.readFile(sourcePath, "utf8")).split("\n");
  const seen = new Set<string>();
  const mergedLines: string[] = [];

  for (const line of [...targetLines, ...sourceLines]) {
    if (seen.has(line)) {
      continue;
    }

    seen.add(line);
    mergedLines.push(line);
  }

  await fs.writeFile(targetPath, `${mergedLines.join("\n").replace(/\n+$/u, "")}\n`);
}

async function mergeEnvSchema(sourceDir: string, targetDir: string): Promise<void> {
  const sourcePath = path.join(sourceDir, "_env.schema");
  const targetPath = path.join(targetDir, "_env.schema");

  if (!(await fs.pathExists(sourcePath))) {
    return;
  }

  if (!(await fs.pathExists(targetPath))) {
    await fs.copy(sourcePath, targetPath, { overwrite: false });
    return;
  }

  const targetContent = (await fs.readFile(targetPath, "utf8")).trimEnd();
  const sourceContent = (await fs.readFile(sourcePath, "utf8")).trimEnd();

  await fs.writeFile(targetPath, `${targetContent}\n\n${sourceContent}\n`);
}

const MERGE_HANDLERS: Record<string, MergeHandler> = {
  _gitignore: mergeGitignore,
  "_env.schema": mergeEnvSchema,
  "CLAUDE.md": mergeClaudeMd,
  "package.json": mergePackageJson,
};

async function applyExtras(template: string, targetDir: string, extras: string[]): Promise<void> {
  for (const extra of extras) {
    const extraDir = await resolveTemplateExtraDir(template, extra);

    if (!(await fs.pathExists(extraDir))) {
      throw new Error(`Template extra "${template}/${extra}" not found at ${extraDir}`);
    }

    await fs.copy(extraDir, targetDir, {
      overwrite: true,
      filter: (src) => !shouldSkipTemplateFile(src),
    });

    for (const [filename, handler] of Object.entries(MERGE_HANDLERS)) {
      if (!(await fs.pathExists(path.join(extraDir, filename)))) {
        continue;
      }

      await handler(extraDir, targetDir);
    }
  }
}

async function ensureExecutableFiles(dir: string): Promise<void> {
  if (!(await fs.pathExists(dir))) {
    return;
  }

  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile()) {
      continue;
    }

    await fs.chmod(path.join(dir, entry.name), 0o755);
  }
}

async function ensureExecutableWorkflowScripts(targetDir: string): Promise<void> {
  const scriptsDir = path.join(targetDir, ".claude", "scripts");

  await ensureExecutableFiles(scriptsDir);
}

async function ensureExecutableHuskyHooks(targetDir: string): Promise<void> {
  const huskyDir = path.join(targetDir, ".husky");
  await ensureExecutableFiles(huskyDir);
}

async function createAgentsSkillsSymlink(targetDir: string): Promise<void> {
  const claudeSkillsDir = path.join(targetDir, ".claude", "skills");

  if (!(await fs.pathExists(claudeSkillsDir))) {
    return;
  }

  const agentsDir = path.join(targetDir, ".agents");
  await fs.ensureDir(agentsDir);

  const symlinkPath = path.join(agentsDir, "skills");

  if (await fs.pathExists(symlinkPath)) {
    return;
  }

  await fs.symlink(path.join("..", ".claude", "skills"), symlinkPath);
}

export async function scaffold(template: string, targetDir: string, extras: string[] = []): Promise<void> {
  const templateDir = await resolveTemplateBaseDir(template);

  if (!(await fs.pathExists(templateDir))) {
    throw new Error(`Template "${template}" not found at ${templateDir}`);
  }

  // Copy entire base template
  await fs.copy(templateDir, targetDir, { overwrite: false });

  await applyExtras(template, targetDir, extras);

  // Restore dotfiles stripped from the published package.
  await restoreDotEntries(targetDir);
  await ensureExecutableWorkflowScripts(targetDir);
  await ensureExecutableHuskyHooks(targetDir);
  await createAgentsSkillsSymlink(targetDir);
}
