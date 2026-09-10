import * as Sentry from "@sentry/node";
import { tasks } from "@trigger.dev/sdk";

Sentry.init({
  defaultIntegrations: false,
  dsn: process.env.SENTRY_DSN,
  environment:
    process.env.NODE_ENV === "production" ? "production" : "development",
});

tasks.onFailure(({ error, task, ctx }) => {
  Sentry.captureException(error, {
    tags: {
      "trigger.task_id": task,
      "trigger.run_id": ctx.run.id,
      "trigger.environment": ctx.environment.type,
    },
  });
});
