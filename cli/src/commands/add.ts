import { defineCommand } from "citty";
import consola from "consola";
import {
  ADDABLE_EXTRAS,
  detectProject,
  validateExtra,
  warnIfAlreadyAdded,
} from "../helpers/detect-project.js";
import {
  applyExtra,
  resolveConflicts,
  scanConflicts,
} from "../helpers/conflict.js";

/** Next-steps hints shown after each extra is applied */
const EXTRA_NEXT_STEPS: Record<string, readonly string[]> = {
  email: [
    "Set RESEND_API_KEY in .env.schema",
    "Run `bun run email:dev` to preview email templates",
  ],
  "file-uploads": [
    "Set S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET in .env.schema",
    "Set S3_ENDPOINT for R2/MinIO/Backblaze (omit for AWS S3)",
    "Use <FileUpload /> component — see components/file-upload.tsx",
  ],
  "github-workflows": [
    "GitHub Actions CI workflow added at .github/workflows/ci.yml",
    "Push to GitHub to trigger the workflow",
  ],
  "vercel-deploy": [
    "Set VERCEL_TOKEN and VERCEL_ORG_ID in GitHub secrets",
    "Add VERCEL_PROJECT_ID as a GitHub variable",
    "See extras/vercel-deploy/README.md for details",
  ],
};

export const add = defineCommand({
  meta: {
    name: "add",
    description: "Add an extra to an existing Next.js project",
  },
  args: {
    extra: {
      type: "positional",
      description: `Extra to add (${[...ADDABLE_EXTRAS].join(", ")})`,
      required: true,
    },
  },
  async run({ args }) {
    const extra = args.extra;

    // 1. Validate extra name
    validateExtra(extra);

    // 2. Detect and validate project root
    const { projectDir } = await detectProject(process.cwd());

    // 3. Warn if extra appears already present
    await warnIfAlreadyAdded(projectDir, extra);

    // 4. Scan for conflicts
    consola.start(`Scanning "${extra}" against your project...`);
    const scanResult = await scanConflicts(extra, projectDir);

    // 5. Display summary
    const total =
      scanResult.created.length +
      scanResult.mergeable.length +
      scanResult.conflicts.length;

    consola.info(
      `${total} file${total === 1 ? "" : "s"}: ` +
        `${scanResult.created.length} new, ` +
        `${scanResult.mergeable.length} merge, ` +
        `${scanResult.conflicts.length} conflict${scanResult.conflicts.length === 1 ? "" : "s"}`,
    );

    // 6. Resolve conflicts when present
    const resolutions = await resolveConflicts(scanResult.conflicts);

    // 7. Apply the extra
    consola.start(`Adding "${extra}"...`);
    await applyExtra(scanResult, resolutions, projectDir);
    consola.success(`Added "${extra}" to your project.`);

    // 8. Print next-steps
    const steps = EXTRA_NEXT_STEPS[extra];
    if (steps && steps.length > 0) {
      consola.box(
        `Next steps:\n${steps.map((s) => `  ${s}`).join("\n")}\n\nDependencies were not installed — run \`bun install\` when ready.`,
      );
    }
  },
});
