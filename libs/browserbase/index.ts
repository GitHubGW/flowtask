import "server-only";

import Browserbase from "@browserbasehq/sdk";

const BROWSERBASE_API_KEY = process.env.BROWSERBASE_API_KEY;

if (!BROWSERBASE_API_KEY) {
  throw new Error("BROWSERBASE_API_KEY가 설정되지 않았습니다.");
}

export const browserbase = new Browserbase({
  apiKey: BROWSERBASE_API_KEY,
  maxRetries: 1,
  timeout: 15000,
});
