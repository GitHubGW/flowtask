import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://797196053fb2df0f424a03189f108785@o4512056697159681.ingest.us.sentry.io/4512056701747200",
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1 : 0.1,
  includeLocalVariables: true,
  enableLogs: true,
});
