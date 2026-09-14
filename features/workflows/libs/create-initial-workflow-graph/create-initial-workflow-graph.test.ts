import { afterEach, describe, expect, test, vi } from "vitest";

import { createInitialWorkflowGraph } from "./create-initial-workflow-graph";

describe("createInitialWorkflowGraph", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("삭제할 수 없는 시작 노드와 빈 엣지 목록을 생성한다", () => {
    const workflowNodeId = "00000000-0000-4000-8000-000000000000";

    const randomUUIDSpy = vi.spyOn(globalThis.crypto, "randomUUID");
    randomUUIDSpy.mockReturnValue(workflowNodeId);

    const expectedStartNode = {
      id: workflowNodeId,
      type: "step",
      position: { x: 0, y: 0 },
      deletable: false,
      data: { type: "start", kind: "trigger", title: "시작", inputValues: {} },
    };
    const result = createInitialWorkflowGraph();

    expect(randomUUIDSpy).toHaveBeenCalledOnce();
    expect(result).toEqual({ nodes: [expectedStartNode], edges: [] });
  });
});
