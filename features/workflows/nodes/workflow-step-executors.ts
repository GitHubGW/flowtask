import type { Stagehand } from "@browserbasehq/stagehand";
import type {
  WorkflowActionStepType,
  WorkflowStepType,
} from "@/features/workflows/types";
import { openUrl } from "@/features/workflows/nodes/open-url";
import { act } from "@/features/workflows/nodes/act";

export interface WorkflowStepExecutorContext {
  inputValues: Record<string, string>;
  getStagehand: () => Promise<Stagehand>;
}

export type WorkflowStepExecutor = (
  context: WorkflowStepExecutorContext
) => Promise<unknown>;

export const workflowStepExecutors: Partial<
  Record<WorkflowStepType, WorkflowStepExecutor>
> = {
  "open-url": async ({
    inputValues,
    getStagehand,
  }: WorkflowStepExecutorContext) => {
    const stagehand = await getStagehand();
    return openUrl({ url: inputValues.url, stagehand });
  },
  act: async ({ inputValues, getStagehand }: WorkflowStepExecutorContext) => {
    const stagehand = await getStagehand();
    return act({ instruction: inputValues.instruction, stagehand });
  },
} satisfies Record<WorkflowActionStepType, WorkflowStepExecutor>;
