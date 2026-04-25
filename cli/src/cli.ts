import { defineCommand } from "citty";
import consola from "consola";
import { create } from "./commands/create.js";

export const main = defineCommand({
  meta: {
    name: "devstart",
    version: "0.0.1",
    description: "Scaffold a production-ready Next.js app. `devstart` and `devstart init` are equivalent.",
  },
  args: {
    dir: {
      type: "positional",
      description: "Project directory (`devstart my-app` or `devstart init my-app`)",
      required: false,
    },
    yes: {
      type: "boolean",
      alias: "y",
      description: "Accept all defaults",
      default: false,
    },
    "no-git": {
      type: "boolean",
      description: "Skip git initialization",
      default: false,
    },
    "no-install": {
      type: "boolean",
      description: "Skip dependency installation",
      default: false,
    },
    "github-workflows": {
      type: "boolean",
      description: "Include GitHub Actions CI workflow",
      default: false,
    },
    "vercel-deploy": {
      type: "boolean",
      description: "Include Vercel deployment workflow (implies --github-workflows)",
      default: false,
    },
    prisma: {
      type: "boolean",
      description: "Include Prisma ORM",
      default: false,
    },
    auth: {
      type: "boolean",
      description: "Include authentication with Better Auth (requires --prisma)",
      default: false,
    },
    clerk: {
      type: "boolean",
      description: "Include authentication with Clerk (no database required)",
      default: false,
    },
    stripe: {
      type: "boolean",
      description: "Include Stripe billing (requires --auth or --clerk)",
      default: false,
    },
    email: {
      type: "boolean",
      description: "Include transactional email with Resend + React Email",
      default: false,
    },
    base: {
      type: "boolean",
      description: "Scaffold base template only, no extras",
      default: false,
    },
  },
  async run({ args }) {
    let projectDir = args.dir;

    if (!projectDir) {
      projectDir = await consola.prompt("Project name:", {
        type: "text",
        default: "my-app",
        placeholder: "my-app",
      });
    }

    if (typeof projectDir === "symbol") process.exit(0);

    if (args.base && (args.prisma || args.auth || args.clerk || args.vercelDeploy || args.stripe || args.email)) {
      throw new Error(
        "The --base flag cannot be combined with --prisma, --auth, --clerk, --stripe, --email, or --vercel-deploy.",
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

    const hasExplicitFlags = args.githubWorkflows || args.vercelDeploy || args.prisma || args.auth || args.clerk || args.stripe || args.email || args.base;

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
      extras: { db, auth, githubWorkflows, vercelDeploy, stripe, email },
      initGit,
      install,
    });
  },
});
