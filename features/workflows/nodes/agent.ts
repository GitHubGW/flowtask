import type { Stagehand } from "@browserbasehq/stagehand";

interface AgentParams {
  instruction: string;
  stagehand: Stagehand;
}

export const agent = async ({ instruction, stagehand }: AgentParams) => {
  const { success, message, completed } = await stagehand
    .agent()
    .execute({ instruction });
  return { success, message, completed };
};
