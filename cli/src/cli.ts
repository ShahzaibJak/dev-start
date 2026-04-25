import { defineCommand } from "citty";
import consola from "consola";
import { create } from "./commands/create.js";
import { add } from "./commands/add.js";

const initArgs = {
  dir: {
    type: "positional" as const,
    description: "Project directory",
    required: false,
  },
  yes: {
    type: "boolean" as const,
    alias: "y",
    description: "Accept all defaults",
    default: false,
  },
  "no-git": {
    type: "boolean" as const,
    description: "Skip git initialization",
    default: false,
  },
  "no-install": {
    type: "boolean" as const,
    description: "Skip dependency installation",
    default: false,
  },
  "github-workflows": {
    type: "boolean" as const,
    description: "Include GitHub Actions CI workflow",
    default: false,
  },
  "vercel-deploy": {
    type: "boolean" as const,
    description: "Include Vercel deployment workflow (implies --github-workflows)",
    default: false,
  },
  prisma: {
    type: "boolean" as const,
    description: "Include Prisma ORM",
    default: false,
  },
  auth: {
    type: "boolean" as const,
    description: "Include authentication with Better Auth (requires --prisma)",
    default: false,
  },
  clerk: {
    type: "boolean" as const,
    description: "Include authentication with Clerk (no database required)",
    default: false,
  },
  stripe: {
    type: "boolean" as const,
    description: "Include Stripe billing (requires --auth or --clerk)",
    default: false,
  },
  email: {
    type: "boolean" as const,
    description: "Include transactional email with Resend + React Email",
    default: false,
  },
  "file-uploads": {
    type: "boolean" as const,
    description: "Include S3-compatible file uploads",
    default: false,
  },
  base: {
    type: "boolean" as const,
    description: "Scaffold base template only, no extras",
    default: false,
  },
};

async function runInit(args: Record<string, unknown>): Promise<void> {
  let projectDir = args.dir;

  if (!projectDir) {
    projectDir = await consola.prompt("Project name:", {
      type: "text",
      default: "my-app",
      placeholder: "my-app",
    });
  }

  if (typeof projectDir === "symbol") process.exit(0);

  if (typeof projectDir !== "string" || projectDir.length === 0) {
    throw new Error("Project directory is required.");
  }

  if (args.base && (args.prisma || args.auth || args.clerk || args.vercelDeploy || args.stripe || args.email || args.fileUploads)) {
    throw new Error(
      "The --base flag cannot be combined with --prisma, --auth, --clerk, --stripe, --email, --file-uploads, or --vercel-deploy.",
    );
  }

  if (args.auth && args.clerk) {
    throw new Error(
      "Cannot use both --auth (Better Auth) and --clerk. Choose one auth provider.",
    );
  }

  let initGit = args.git === false ? false : !args.noGit;
  let install = args.install === false ? false : !args.noInstall;
  let db = args.prisma ? "prisma" : undefined;
  let auth = args.auth ? "better-auth" : args.clerk ? "clerk" : undefined;
  let githubWorkflows = (args.githubWorkflows || args.vercelDeploy) ? "github-workflows" : undefined;
  let vercelDeploy = args.vercelDeploy ? "vercel-deploy" : undefined;
  let stripe = args.stripe ? "stripe" : undefined;
  let email = args.email ? "email" : undefined;
  let fileUploads = args.fileUploads ? "file-uploads" : undefined;

  const hasExplicitFlags = args.githubWorkflows || args.vercelDeploy || args.prisma || args.auth || args.clerk || args.stripe || args.email || args.fileUploads || args.base;

  if (!args.yes && !hasExplicitFlags) {
    const prismaChoice = await consola.prompt("Add Prisma?", {
      type: "confirm",
      initial: false,
    });
    if (typeof prismaChoice === "symbol") process.exit(0);
    db = prismaChoice ? "prisma" : undefined;

    const authOptions = db
      ? ["None", "Better Auth (requires Prisma)", "Clerk"]
      : ["None", "Clerk"];

    const authChoice = await consola.prompt("Auth provider:", {
      type: "select",
      options: authOptions,
      initial: "None",
    });
    if (typeof authChoice === "symbol") process.exit(0);

    if (authChoice === "Better Auth (requires Prisma)") {
      auth = "better-auth";
    } else if (authChoice === "Clerk") {
      auth = "clerk";
    } else {
      auth = undefined;
    }

    if (auth) {
      const stripeChoice = await consola.prompt("Add Stripe billing?", {
        type: "confirm",
        initial: false,
      });
      if (typeof stripeChoice === "symbol") process.exit(0);
      stripe = stripeChoice ? "stripe" : undefined;
    }

    const emailChoice = await consola.prompt("Add transactional email (Resend)?", {
      type: "confirm",
      initial: false,
    });
    if (typeof emailChoice === "symbol") process.exit(0);
    email = emailChoice ? "email" : undefined;

    const fileUploadsChoice = await consola.prompt("Add file uploads (S3-compatible)?", {
      type: "confirm",
      initial: false,
    });
    if (typeof fileUploadsChoice === "symbol") process.exit(0);
    fileUploads = fileUploadsChoice ? "file-uploads" : undefined;

    const githubWorkflowsChoice = await consola.prompt("Add GitHub Actions CI?", {
      type: "confirm",
      initial: false,
    });
    if (typeof githubWorkflowsChoice === "symbol") process.exit(0);
    githubWorkflows = githubWorkflowsChoice ? "github-workflows" : undefined;

    if (githubWorkflows) {
      const vercelDeployChoice = await consola.prompt("Add Vercel deployment?", {
        type: "confirm",
        initial: false,
        });
      if (typeof vercelDeployChoice === "symbol") process.exit(0);
      vercelDeploy = vercelDeployChoice ? "vercel-deploy" : undefined;
    }

    const installChoice = await consola.prompt("Install dependencies?", {
      type: "confirm",
      initial: true,
    });
    if (typeof installChoice === "symbol") process.exit(0);
    install = installChoice;
  }

  if (auth === "better-auth" && !db) {
    throw new Error("Better Auth requires Prisma.");
  }

  if (stripe && !auth) {
    throw new Error("Stripe billing requires an auth provider. Use --stripe with --auth or --clerk.");
  }

  await create({
    projectDir,
    template: "nextjs",
    extras: { db, auth, githubWorkflows, vercelDeploy, stripe, email, fileUploads },
    initGit,
    install,
  });
}

/** The `init` subcommand — same as running devstart without a subcommand. */
const init = defineCommand({
  meta: {
    name: "init",
    description: "Scaffold a production-ready Next.js app",
  },
  args: initArgs,
  async run({ args }) {
    await runInit(args);
  },
});

/** Root command — routes to `init` or `add` subcommands. */
export const main = defineCommand({
  meta: {
    name: "devstart",
    version: "0.0.1",
    description: "Scaffold and extend production-ready Next.js apps",
  },
  subCommands: {
    init,
    add,
  },
});
