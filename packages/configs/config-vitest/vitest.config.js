/// <reference types="vitest" />

const { configDefaults, defineConfig } = require("vitest/config");
const react = require("@vitejs/plugin-react");

module.exports = defineConfig({
  plugins: [react()],
  test: {
    setupFiles: "./src/setupTests.ts",
    globals: true,
    exclude: [...configDefaults.exclude, "src/e2e/*"],
    deps: {
      experimentalOptimizer: {
        web: { enabled: true },
        ssr: { enabled: true },
      },
    },
    environment: "jsdom",
    benchmark: { reporters: ["default"] },
    reporters: ["default"],
    passWithNoTests: true,
    coverage: {
      provider: "v8",
    },
  },
});
