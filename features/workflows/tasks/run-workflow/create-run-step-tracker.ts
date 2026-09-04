import type { RunStep, WorkflowStepNode } from "@/features/workflows/types";
import { metadata, type RunMetadata } from "@trigger.dev/sdk";

type RunStepUpdate = Pick<RunStep, "status"> &
  Partial<Pick<RunStep, "input" | "durationMs" | "output" | "error">>;

export interface RunStepTracker {
  getSteps: () => RunStep[];
  publish: () => void;
  update: (nodeId: string, update: RunStepUpdate) => void;
}

export const createRunStepTracker = (
  nodes: WorkflowStepNode[]
): RunStepTracker => {
  let steps: RunStep[] = nodes.map((node) => ({
    nodeId: node.id,
    type: node.data.type,
    title: node.data.title,
    status: "pending",
  }));

  const getSteps = () => {
    return steps;
  };

  const publish = () => {
    metadata.set("steps", steps as unknown as RunMetadata[string]);
  };

  const update = (nodeId: string, update: RunStepUpdate) => {
    steps = steps.map((step) =>
      step.nodeId === nodeId ? { ...step, ...update } : step
    );

    publish();
  };

  return { getSteps, publish, update };
};
