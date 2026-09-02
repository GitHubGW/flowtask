import type { Stagehand } from "@browserbasehq/stagehand";
import type {
  WorkflowActionStepType,
  WorkflowStepType,
} from "@/features/workflows/types";
import { openUrl } from "@/features/workflows/nodes/open-url";
import { act } from "@/features/workflows/nodes/act";
import { extract } from "@/features/workflows/nodes/extract";
import { observe } from "@/features/workflows/nodes/observe";
import { agent } from "@/features/workflows/nodes/agent";

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
    return openUrl({
      url: inputValues.url,
      stagehand: await getStagehand(),
    });
  },
  act: async ({ inputValues, getStagehand }: WorkflowStepExecutorContext) => {
    return act({
      instruction: inputValues.instruction,
      stagehand: await getStagehand(),
    });
  },
  extract: async ({
    inputValues,
    getStagehand,
  }: WorkflowStepExecutorContext) => {
    return extract({
      instruction: inputValues.instruction,
      stagehand: await getStagehand(),
    });
  },
  observe: async ({
    inputValues,
    getStagehand,
  }: WorkflowStepExecutorContext) => {
    return observe({
      instruction: inputValues.instruction,
      stagehand: await getStagehand(),
    });
  },
  agent: async ({ inputValues, getStagehand }: WorkflowStepExecutorContext) => {
    return agent({
      instruction: inputValues.instruction,
      stagehand: await getStagehand(),
    });
  },
} satisfies Record<WorkflowActionStepType, WorkflowStepExecutor>;
