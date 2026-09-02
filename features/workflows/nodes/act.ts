import type { Stagehand } from "@browserbasehq/stagehand";

interface ActParams {
  instruction: string;
  stagehand: Stagehand;
}

export const act = async ({ instruction, stagehand }: ActParams) => {
  const { success, message } = await stagehand.act(instruction);
  const [page] = stagehand.context.pages();
  return { success, message, url: page.url() };
};
