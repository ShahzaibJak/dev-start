import path from "node:path";
import fs from "fs-extra";
import consola from "consola";

/** Extras that can be added to an existing project via `ds-start add` */
export const ADDABLE_EXTRAS = new Set([
  "email",
  "file-uploads",
  "github-workflows",
  "vercel-deploy",
  "zustand",
]);

/** Key dependency markers per extra — used to warn if already present */
const EXTRA_MARKER_DEPS: Record<string, readonly string[]> = {
  email: ["resend", "@react-email/components"],
  "file-uploads": ["@aws-sdk/client-s3"],
  "github-workflows": [],
  "vercel-deploy": [],
  zustand: ["zustand"],
};

const NEXT_CONFIG_PATTERNS = [
  "next.config.js",
  "next.config.mjs",
  "next.config.ts",
];

interface DetectResult {
  /** Resolved absolute path to the project root */
  projectDir: string;
}

/**
 * Validate that the current working directory is a Next.js project root.
 * Returns the resolved absolute path. Throws a descriptive error if validation fails.
 */
export async function detectProject(cwd: string): Promise<DetectResult> {
  const projectDir = path.resolve(cwd);

  // Check for package.json
  const pkgPath = path.join(projectDir, "package.json");
  if (!(await fs.pathExists(pkgPath))) {
    throw new Error(
      `No package.json found in ${projectDir}. Run this command from your project root.`,
    );
  }

  // Check for next.config.*
  let foundNextConfig = false;
  for (const pattern of NEXT_CONFIG_PATTERNS) {
    if (await fs.pathExists(path.join(projectDir, pattern))) {
      foundNextConfig = true;
      break;
    }
  }

  if (!foundNextConfig) {
    throw new Error(
      `No next.config.{js,mjs,ts} found in ${projectDir}. The add command only supports Next.js projects.`,
    );
  }

  return { projectDir };
}

/**
 * Validate that the requested extra is in the supported set.
 * Throws a descriptive error listing valid options if not.
 */
export function validateExtra(extra: string): void {
  if (!ADDABLE_EXTRAS.has(extra)) {
    const valid = [...ADDABLE_EXTRAS].join(", ");
    throw new Error(
      `Unknown extra "${extra}". Available extras: ${valid}`,
    );
  }
}

/**
 * Warn (not error) if the extra's key dependencies are already present in
 * the project's package.json. The user may want to re-add files even if
 * deps are already installed.
 */
export async function warnIfAlreadyAdded(
  projectDir: string,
  extra: string,
): Promise<void> {
  const markers = EXTRA_MARKER_DEPS[extra];
  if (!markers || markers.length === 0) {
    return;
  }

  const pkgPath = path.join(projectDir, "package.json");
  const pkg = await fs.readJson(pkgPath);
  const allDeps: Record<string, unknown> = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  };

  const found = markers.filter((dep) => dep in allDeps);
  if (found.length > 0) {
    consola.warn(
      `It looks like "${extra}" may already be set up (found ${found.join(", ")} in package.json). Continuing anyway.`,
    );
  }
}
