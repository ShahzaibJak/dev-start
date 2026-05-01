import { AUTH_PROVIDERS, DATABASE_ADAPTERS } from "./modules.js";
import type { CreateOptions } from "./commands/create.js";

export interface InitPreset {
  id: string;
  label: string;
  extras: CreateOptions["extras"];
}

export const RECOMMENDED_PRODUCTION_PRESET: InitPreset = {
  id: "recommended-production",
  label: "Recommended production starter",
  extras: {
    db: DATABASE_ADAPTERS.prisma,
    auth: AUTH_PROVIDERS.betterAuth,
    email: "email",
    githubWorkflows: "github-workflows",
  },
};
