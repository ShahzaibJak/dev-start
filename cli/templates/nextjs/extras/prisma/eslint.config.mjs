import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "generated/**",
    "next-env.d.ts",
    // Auto-generated files (varlock + next-ts-api):
    "env.d.ts",
    "types/next-ts-api.ts",
  ]),
])

export default eslintConfig
