import type { Stagehand } from "@browserbasehq/stagehand";

interface OpenUrlParams {
  url: string;
  stagehand: Stagehand;
}

export const openUrl = async ({ url, stagehand }: OpenUrlParams) => {
  const pages = await stagehand.context.pages();
  const page = pages[0];

  await page.goto(url, { waitUntil: "load", timeoutMs: 30_000 });

  return { url: page.url(), title: await page.title() };
};
