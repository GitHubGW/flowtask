import { sentryEsbuildPlugin } from "@sentry/esbuild-plugin";
import { esbuildPlugin } from "@trigger.dev/build/extensions";
import { defineConfig } from "@trigger.dev/sdk";

export default defineConfig({
  project: "proj_lhrsnziejtjsefnkhwmh",
  runtime: "node",
  logLevel: "log",
  maxDuration: 3600,
  build: {
    extensions: [
      esbuildPlugin(
        sentryEsbuildPlugin({
          org: "devgw",
          project: "browser-automation-agent",
          authToken: process.env.SENTRY_AUTH_TOKEN,
        }),
        { placement: "last", target: "deploy" }
      ),
    ],
  },
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
      randomize: true,
    },
  },
  dirs: ["features", "trigger"],
});
