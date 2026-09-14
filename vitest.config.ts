import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "node",
    coverage: {
      provider: "v8",
      include: ["features/workflows/libs/**/*.ts"],
      exclude: [
        "features/workflows/libs/**/*.test.ts",
        "features/workflows/libs/**/index.ts",
      ],
      reporter: ["text", "html"],
    },
  },
});
