import type { Stagehand } from "@browserbasehq/stagehand";

interface ObserveParams {
  instruction: string;
  stagehand: Stagehand;
}

export const observe = async ({ instruction, stagehand }: ObserveParams) => {
  const result = await stagehand.observe(instruction);
  const matches = result.map((observation) => ({
    selector: observation.selector,
    description: observation.description,
  }));

  return { matches };
};
