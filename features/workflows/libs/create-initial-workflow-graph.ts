import type {
  WorkflowGraph,
  WorkflowStepNode,
} from "@/features/workflows/types";

export const createInitialWorkflowGraph = (): WorkflowGraph => {
  const startNode: WorkflowStepNode = {
    id: crypto.randomUUID(),
    type: "step",
    position: { x: 0, y: 0 },
    deletable: false,
    data: { type: "start", kind: "trigger", title: "시작", inputValues: {} },
  };

  return {
    nodes: [startNode],
    edges: [],
  };
};
