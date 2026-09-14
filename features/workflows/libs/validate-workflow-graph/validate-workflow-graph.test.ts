import type { Edge } from "@xyflow/react";
import { describe, expect, test } from "vitest";

import { WORKFLOW_VALIDATION_MESSAGES } from "@/features/workflows/constants/workflow-validation-messages";
import type { WorkflowStepNode } from "@/features/workflows/types";

import { validateWorkflowGraph } from "./validate-workflow-graph";

const createStartNode = (): WorkflowStepNode => {
  return {
    id: "start",
    type: "step",
    position: { x: 0, y: 0 },
    data: {
      type: "start",
      kind: "trigger",
      title: "시작",
      inputValues: {},
    },
  };
};

const createActionNode = (id: string): WorkflowStepNode => {
  return {
    id,
    type: "step",
    position: { x: 0, y: 0 },
    data: {
      type: "open-url",
      kind: "action",
      title: "URL 열기",
      inputValues: {},
    },
  };
};

const createEdge = (source: string, target: string): Edge => {
  return {
    id: `${source}-${target}`,
    source,
    target,
  };
};

describe("validateWorkflowGraph", () => {
  test("시작 노드와 액션 노드가 순서대로 연결되면 검증에 성공한다", () => {
    const startNode = createStartNode();
    const firstActionNode = createActionNode("action-1");
    const secondActionNode = createActionNode("action-2");

    const result = validateWorkflowGraph({
      nodes: [startNode, firstActionNode, secondActionNode],
      edges: [
        createEdge(startNode.id, firstActionNode.id),
        createEdge(firstActionNode.id, secondActionNode.id),
      ],
    });

    expect(result).toBeNull();
  });

  test("시작 노드가 없으면 오류 메시지를 반환한다", () => {
    const actionNode = createActionNode("action-1");
    const result = validateWorkflowGraph({ nodes: [actionNode], edges: [] });

    expect(result).toBe(WORKFLOW_VALIDATION_MESSAGES.START_NODE_REQUIRED);
  });

  test("액션 노드가 없으면 오류 메시지를 반환한다", () => {
    const startNode = createStartNode();
    const result = validateWorkflowGraph({ nodes: [startNode], edges: [] });

    expect(result).toBe(WORKFLOW_VALIDATION_MESSAGES.ACTION_NODE_REQUIRED);
  });

  test("연결되지 않은 액션 노드가 있으면 오류 메시지를 반환한다", () => {
    const startNode = createStartNode();
    const actionNode = createActionNode("action-1");
    const result = validateWorkflowGraph({
      nodes: [startNode, actionNode],
      edges: [],
    });

    expect(result).toBe(WORKFLOW_VALIDATION_MESSAGES.UNCONNECTED_ACTION_NODE);
  });

  test("순환 연결이 있으면 오류 메시지를 반환한다", () => {
    const startNode = createStartNode();
    const firstActionNode = createActionNode("action-1");
    const secondActionNode = createActionNode("action-2");

    const result = validateWorkflowGraph({
      nodes: [startNode, firstActionNode, secondActionNode],
      edges: [
        createEdge(startNode.id, firstActionNode.id),
        createEdge(firstActionNode.id, secondActionNode.id),
        createEdge(secondActionNode.id, firstActionNode.id),
      ],
    });

    expect(result).toBe(WORKFLOW_VALIDATION_MESSAGES.INVALID_GRAPH);
  });
});
