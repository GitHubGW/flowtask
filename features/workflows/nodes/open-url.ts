import type { Stagehand } from "@browserbasehq/stagehand";

interface OpenUrlParams {
  url: string;
  stagehand: Stagehand;
}

export const openUrl = async ({ url, stagehand }: OpenUrlParams) => {
  const [page] = stagehand.context.pages();
  await page.goto(url, { waitUntil: "load", timeoutMs: 30_000 });
  return { title: await page.title(), url: page.url() };
};
