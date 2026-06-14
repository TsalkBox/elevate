import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
  globalIgnores([
    "vitest.workspace.ts",
    "commitlint.config.js",
    "**/vitest.config.ts",
    "**/src/test/**",
  ]),
])
