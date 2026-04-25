import path from "node:path";
import fs from "fs-extra";
import consola from "consola";
import {
  DOTFILE_RENAMES,
  MERGE_HANDLERS,
  SKIPPED_TEMPLATE_FILES,
} from "./scaffold.js";
import { resolveTemplateExtraDir } from "./template-paths.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** How a file will be handled during an add operation */
export type FileAction = "merge" | "create" | "conflict";

/** A single file entry in the conflict scan */
export interface FileEntry {
  /** Path relative to the project root */
  relativePath: string;
  /** Absolute path to the source file in the template extra */
  sourcePath: string;
  /** Absolute path to the target file in the project */
  targetPath: string;
  /** How this file should be handled */
  action: FileAction;
}

/** Result of scanning an extra against the target project */
export interface ConflictScanResult {
  /** Extra name that was scanned */
  extra: string;
  /** Files that will be merged via existing merge handlers */
  mergeable: FileEntry[];
  /** Files that don't exist in the target — safe to copy */
  created: FileEntry[];
  /** Files that exist in both source and target with no merge handler */
  conflicts: FileEntry[];
}

/** User's chosen resolution for a conflicting file */
export type ConflictResolution = "overwrite" | "skip" | "abort";

// ---------------------------------------------------------------------------
// Known sub-template directories inside extras (excluded from add scans)
// ---------------------------------------------------------------------------

const EXTRA_SUB_TEMPLATE_DIRS: Record<string, readonly string[]> = {
  stripe: ["better-auth", "clerk"],
  email: ["better-auth", "better-auth-stripe"],
};

// ---------------------------------------------------------------------------
// Conflict scanning
// ---------------------------------------------------------------------------

/**
 * Resolve a single path segment accounting for dotfile renames.
 * Template dirs/files use underscore prefixes (_github, _gitignore) but the
 * target project uses the dotfile version (.github, .gitignore).
 */
function resolveSegment(segment: string): string {
  return DOTFILE_RENAMES[segment] ?? segment;
}

/**
 * Resolve all segments of a relative path, applying dotfile renames to each.
 * e.g. `_github/workflows/ci.yml` → `.github/workflows/ci.yml`
 */
function resolveTargetRelPath(relPath: string): string {
  const segments = relPath.split(path.sep);
  return segments.map(resolveSegment).join(path.sep);
}

/**
 * Recursively collect all files in a directory, returning paths relative to
 * the root. Skips files in SKIPPED_TEMPLATE_FILES and sub-template dirs.
 */
async function collectFiles(
  dir: string,
  root: string,
  excludeDirs: ReadonlySet<string>,
): Promise<string[]> {
  const results: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relFromRoot = path.relative(root, fullPath);

    if (entry.isDirectory()) {
      // Skip known sub-template directories at the top level
      if (dir === root && excludeDirs.has(entry.name)) {
        continue;
      }
      const nested = await collectFiles(fullPath, root, excludeDirs);
      results.push(...nested);
    } else {
      if (SKIPPED_TEMPLATE_FILES.has(entry.name)) {
        continue;
      }
      results.push(relFromRoot);
    }
  }

  return results;
}

/**
 * Scan an extra's template directory against the target project and categorize
 * every file as mergeable, create, or conflict. Read-only — no filesystem mutations.
 */
export async function scanConflicts(
  extra: string,
  projectDir: string,
): Promise<ConflictScanResult> {
  const extraDir = await resolveTemplateExtraDir("nextjs", extra);

  if (!(await fs.pathExists(extraDir))) {
    throw new Error(`Template extra "nextjs/${extra}" not found at ${extraDir}`);
  }

  const excludeDirs = new Set(EXTRA_SUB_TEMPLATE_DIRS[extra] ?? []);
  const sourceFiles = await collectFiles(extraDir, extraDir, excludeDirs);

  const result: ConflictScanResult = {
    extra,
    mergeable: [],
    created: [],
    conflicts: [],
  };

  for (const relPath of sourceFiles) {
    const filename = path.basename(relPath);
    const sourcePath = path.join(extraDir, relPath);

    // Resolve dotfile renames in all path segments
    // e.g. _github/workflows/deploy.yml → .github/workflows/deploy.yml
    const targetRelPath = resolveTargetRelPath(relPath);
    const targetPath = path.join(projectDir, targetRelPath);

    const entry: FileEntry = {
      relativePath: targetRelPath,
      sourcePath,
      targetPath,
      action: "create",
    };

    // Check if this file has a merge handler (keyed by source filename)
    if (filename in MERGE_HANDLERS) {
      entry.action = "merge";
      result.mergeable.push(entry);
      continue;
    }

    // Check for dotfile rename match in merge handlers
    // e.g. _gitignore → .gitignore, _env.schema → .env.schema
    const dotName = DOTFILE_RENAMES[filename];
    if (dotName && dotName in MERGE_HANDLERS) {
      entry.action = "merge";
      result.mergeable.push(entry);
      continue;
    }

    // Check if the target already exists
    if (await fs.pathExists(targetPath)) {
      entry.action = "conflict";
      result.conflicts.push(entry);
      continue;
    }

    result.created.push(entry);
  }

  return result;
}

// ---------------------------------------------------------------------------
// Conflict resolution prompts
// ---------------------------------------------------------------------------

/**
 * Present conflict resolution prompts to the user. Returns a map of
 * relative path → resolution. Throws if the user chooses abort.
 */
export async function resolveConflicts(
  conflicts: FileEntry[],
): Promise<Map<string, ConflictResolution>> {
  const resolutions = new Map<string, ConflictResolution>();

  if (conflicts.length === 0) {
    return resolutions;
  }

  consola.warn(`${conflicts.length} file${conflicts.length === 1 ? "" : "s"} already exist${conflicts.length === 1 ? "s" : ""} in the project:`);
  for (const entry of conflicts) {
    consola.log(`  - ${entry.relativePath}`);
  }

  // Bulk option for 3+ conflicts
  if (conflicts.length >= 3) {
    const bulkChoice = await consola.prompt("How would you like to handle these conflicts?", {
      type: "select",
      options: ["Decide per file", "Overwrite all", "Skip all", "Abort"],
    });

    if (typeof bulkChoice === "symbol") process.exit(0);

    if (bulkChoice === "Abort") {
      throw new Error("Add operation aborted by user.");
    }

    if (bulkChoice === "Overwrite all") {
      for (const entry of conflicts) {
        resolutions.set(entry.relativePath, "overwrite");
      }
      return resolutions;
    }

    if (bulkChoice === "Skip all") {
      for (const entry of conflicts) {
        resolutions.set(entry.relativePath, "skip");
      }
      return resolutions;
    }

    // Fall through to per-file resolution
  }

  // Per-file resolution
  for (const entry of conflicts) {
    const choice = await consola.prompt(`${entry.relativePath}:`, {
      type: "select",
      options: ["Overwrite", "Skip", "Abort"],
    });

    if (typeof choice === "symbol") process.exit(0);

    if (choice === "Abort") {
      throw new Error("Add operation aborted by user.");
    }

    resolutions.set(
      entry.relativePath,
      choice === "Overwrite" ? "overwrite" : "skip",
    );
  }

  return resolutions;
}

// ---------------------------------------------------------------------------
// Apply extra
// ---------------------------------------------------------------------------

/**
 * Apply a scanned extra to the project using the scan results and user
 * conflict resolutions. Performs actual filesystem mutations.
 */
export async function applyExtra(
  scanResult: ConflictScanResult,
  resolutions: Map<string, ConflictResolution>,
  projectDir: string,
): Promise<void> {
  const extraDir = await resolveTemplateExtraDir("nextjs", scanResult.extra);

  // 1. Merge mergeable files via their handlers
  for (const entry of scanResult.mergeable) {
    const filename = path.basename(entry.sourcePath);

    // Try direct filename match first, then dotfile rename match
    const handler = MERGE_HANDLERS[filename]
      ?? (DOTFILE_RENAMES[filename] ? MERGE_HANDLERS[DOTFILE_RENAMES[filename]] : undefined);

    if (handler) {
      await handler(extraDir, projectDir);
    }
  }

  // 2. Copy new files
  for (const entry of scanResult.created) {
    await fs.ensureDir(path.dirname(entry.targetPath));
    await fs.copy(entry.sourcePath, entry.targetPath, { overwrite: false });
  }

  // 3. Handle conflicts per resolution
  for (const entry of scanResult.conflicts) {
    const resolution = resolutions.get(entry.relativePath);

    if (resolution === "overwrite") {
      await fs.ensureDir(path.dirname(entry.targetPath));
      await fs.copy(entry.sourcePath, entry.targetPath, { overwrite: true });
    }
    // skip → no-op
  }

  // Dotfile renames are already resolved in the target paths during scanning,
  // so there is no need to call restoreDotEntries here.
}
