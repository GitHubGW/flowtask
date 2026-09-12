import { WORKFLOW_ERROR_MESSAGES } from "@/features/workflows/constants/workflow-error-messages";
import { interpolateWorkflowValues } from "@/features/workflows/libs/interpolate-workflow-values";
import { workflowStepExecutors } from "@/features/workflows/nodes/workflow-step-executors";
import type { RunStepTracker } from "@/features/workflows/tasks/run-workflow/create-run-step-tracker";
import type {
  WorkflowNodeOutputs,
  WorkflowStepNode,
} from "@/features/workflows/types";
import type { Stagehand } from "@browserbasehq/stagehand";
import { metadata } from "@trigger.dev/sdk";

interface ExecuteWorkflowStepParams {
  node: WorkflowStepNode;
  outputs: WorkflowNodeOutputs;
  getStagehand: () => Promise<Stagehand>;
  updateRunStep: RunStepTracker["update"];
}

export const executeWorkflowStep = async ({
  node,
  outputs,
  getStagehand,
  updateRunStep,
}: ExecuteWorkflowStepParams) => {
  const startedAt = Date.now();

  try {
    const executor = workflowStepExecutors[node.data.type];

    if (!executor) {
      throw new Error(WORKFLOW_ERROR_MESSAGES.STEP_EXECUTOR_NOT_FOUND);
    }

    const interpolatedInputValues = Object.fromEntries(
      Object.entries(node.data.inputValues).map(([key, value]) => [
        key,
        interpolateWorkflowValues(value, outputs),
      ])
    );

    updateRunStep(node.id, {
      status: "running",
      input: interpolatedInputValues,
    });

    await metadata.flush();

    const output = await executor({
      inputValues: interpolatedInputValues,
      getStagehand,
    });

    outputs[node.id] = output;

    updateRunStep(node.id, {
      status: "done",
      durationMs: Date.now() - startedAt,
      output,
    });
  } catch (error) {
    updateRunStep(node.id, {
      status: "failed",
      durationMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : String(error),
    });

    await metadata.flush();

    throw error;
  }
};
