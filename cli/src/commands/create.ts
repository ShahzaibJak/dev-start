import path from "node:path";
import fs from "fs-extra";
import consola from "consola";
import { initGit } from "../helpers/git.js";
import { installDeps } from "../helpers/install.js";
import { updatePackageJson } from "../helpers/package-json.js";
import { scaffold } from "../helpers/scaffold.js";

const PRISMA_CI_STEP = `
      - name: Generate Prisma client
        run: bun run db:generate

`;

const CI_LINT_MARKER = `      - name: Lint`;

async function patchCiForPrisma(targetDir: string): Promise<void> {
  const ciPath = path.join(targetDir, ".github", "workflows", "ci.yml");

  if (!(await fs.pathExists(ciPath))) {
    return;
  }

  const content = await fs.readFile(ciPath, "utf8");

  if (content.includes("db:generate")) {
    return;
  }

  const patched = content.replace(CI_LINT_MARKER, `${PRISMA_CI_STEP}${CI_LINT_MARKER}`);
  await fs.writeFile(ciPath, patched);
}

export interface CreateOptions {
  projectDir: string;
  template: string;
  extras: {
    auth?: string;
    db?: string;
    githubWorkflows?: string;
    vercelDeploy?: string;
    workflow?: string;
  };
  initGit: boolean;
  install: boolean;
}

export async function create(opts: CreateOptions) {
  const targetDir = path.resolve(process.cwd(), opts.projectDir);
  const projectName = path.basename(targetDir);
  const requestedExtras = [
    opts.extras.db,
    opts.extras.auth,
    opts.extras.workflow,
    opts.extras.githubWorkflows,
    opts.extras.vercelDeploy,
  ].filter((value): value is string => typeof value === "string" && value.length > 0);
  const selectedExtras = requestedExtras.join(" + ");

  const details = [
    `project: ${projectName}`,
    `target directory: ${targetDir}`,
    `template: ${opts.template}`,
    selectedExtras ? `requested extras: ${selectedExtras}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  if (opts.template !== "nextjs") {
    throw new Error(
      `Only the nextjs/base scaffold path is available in the rebuilt template contract.\n\n${details}`,
    );
  }

  const supportedExtras = new Set([
    "better-auth",
    "ds-workflow",
    "github-workflows",
    "prisma",
    "vercel-deploy",
  ]);
  const unsupportedExtras = requestedExtras.filter((extra) => !supportedExtras.has(extra));
  if (unsupportedExtras.length > 0) {
    throw new Error(
      `Unsupported template extras requested: ${unsupportedExtras.join(", ")}.\n\n${details}\n\nSupported extras: prisma, better-auth (requires prisma), ds-workflow, github-workflows, vercel-deploy (requires github-workflows). All combinations are valid.`,
    );
  }

  if (requestedExtras.includes("better-auth") && !requestedExtras.includes("prisma")) {
    throw new Error(
      `The better-auth extra requires prisma.\n\n${details}`,
    );
  }

  if (await fs.pathExists(targetDir)) {
    const existingEntries = await fs.readdir(targetDir);
    if (existingEntries.length > 0) {
      throw new Error(`Target directory already exists and is not empty: ${targetDir}`);
    }
  } else {
    await fs.ensureDir(targetDir);
  }

  const scaffoldLabel = selectedExtras ? `nextjs/base + ${selectedExtras}` : "nextjs/base";

  consola.start(`Scaffolding ${scaffoldLabel} into ${targetDir}`);
  await scaffold("nextjs", targetDir, requestedExtras);
  await updatePackageJson(targetDir, projectName, {});

  if (requestedExtras.includes("prisma") && requestedExtras.includes("github-workflows")) {
    await patchCiForPrisma(targetDir);
  }

  if (opts.initGit) {
    await initGit(targetDir);
  }

  if (opts.install) {
    await installDeps(targetDir);
  }

  const hasDb = requestedExtras.includes("prisma");
  const hasAuth = requestedExtras.includes("better-auth");
  const hasVercelDeploy = requestedExtras.includes("vercel-deploy");

  const nextSteps: string[] = [
    `cd ${projectName}`,
  ];

  if (hasDb) {
    nextSteps.push("# Set your DATABASE_URL in .env.schema");
    if (hasAuth) {
      nextSteps.push("bun run auth:generate");
    }
    nextSteps.push("bun run db:migrate -- --name init");
    nextSteps.push("bun run db:generate");
  }

  nextSteps.push("bun run env:check");
  nextSteps.push("bun run dev");

  if (hasVercelDeploy) {
    nextSteps.push("");
    nextSteps.push("# Vercel deployment setup:");
    nextSteps.push("# 1. Set VERCEL_TOKEN and VERCEL_ORG_ID in GitHub secrets");
    nextSteps.push("# 2. Add VERCEL_PROJECT_ID as a GitHub variable");
    nextSteps.push("# 3. See extras/vercel-deploy/README.md for details");
  }

  const extrasLine = selectedExtras ? `\nExtras: ${selectedExtras}` : "";

  consola.box(
    `${projectName}${extrasLine}\n\nNext steps:\n${nextSteps.map((s) => `  ${s}`).join("\n")}\n\nEdit app/page.tsx to start building.`,
  );
}
