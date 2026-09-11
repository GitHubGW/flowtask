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
import { sendEmail } from "@/features/workflows/nodes/send-email";

export interface WorkflowStepExecutorContext {
  inputValues: Record<string, string>;
  getStagehand: () => Promise<Stagehand>;
}

export type WorkflowStepExecutor = (
  context: WorkflowStepExecutorContext
) => Promise<unknown>;

/**
 * 스텝 타입과 실행 함수를 연결하는 매핑 객체
 */
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
  observe: async ({
    inputValues,
    getStagehand,
  }: WorkflowStepExecutorContext) => {
    return observe({
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
  act: async ({ inputValues, getStagehand }: WorkflowStepExecutorContext) => {
    return act({
      instruction: inputValues.instruction,
      stagehand: await getStagehand(),
    });
  },
  "send-email": async ({ inputValues }: WorkflowStepExecutorContext) => {
    return sendEmail({
      to: inputValues.to,
      subject: inputValues.subject,
      html: inputValues.html,
    });
  },
  agent: async ({ inputValues, getStagehand }: WorkflowStepExecutorContext) => {
    return agent({
      instruction: inputValues.instruction,
      stagehand: await getStagehand(),
    });
  },
} satisfies Record<WorkflowActionStepType, WorkflowStepExecutor>;
