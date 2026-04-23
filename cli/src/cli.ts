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

    if (args.base && (args.prisma || args.auth || args.vercelDeploy)) {
      throw new Error(
        "The --base flag cannot be combined with --prisma, --auth, or --vercel-deploy.",
      );
    }

    let initGit = args.git === false ? false : !args.noGit;
    let install = args.install === false ? false : !args.noInstall;
    let db = args.prisma ? "prisma" : undefined;
    let auth = args.auth ? "better-auth" : undefined;
    let githubWorkflows = (args.githubWorkflows || args.vercelDeploy) ? "github-workflows" : undefined;
    let vercelDeploy = args.vercelDeploy ? "vercel-deploy" : undefined;

    if (!args.yes && !args.githubWorkflows && !args.vercelDeploy && !args.prisma && !args.auth && !args.base) {
      const prismaChoice = await consola.prompt("Add Prisma?", {
        type: "confirm",
        initial: false,
      });
      if (typeof prismaChoice === "symbol") process.exit(0);
      db = prismaChoice ? "prisma" : undefined;

      if (db) {
        const authChoice = await consola.prompt("Add authentication? (Better Auth + Prisma)", {
          type: "confirm",
          initial: false,
        });
        if (typeof authChoice === "symbol") process.exit(0);
        auth = authChoice ? "better-auth" : undefined;
      }

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

    if (auth && !db) {
      throw new Error("Better Auth requires Prisma.");
    }

    await create({
      projectDir,
      template: "nextjs",
      extras: { db, auth, githubWorkflows, vercelDeploy },
      initGit,
      install,
    });
  },
});
