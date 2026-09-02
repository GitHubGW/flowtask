import type { Stagehand } from "@browserbasehq/stagehand";

interface ExtractParams {
  instruction: string;
  stagehand: Stagehand;
}

export const extract = async ({ instruction, stagehand }: ExtractParams) => {
  const { extraction } = await stagehand.extract(instruction);
  return { extraction };
};
