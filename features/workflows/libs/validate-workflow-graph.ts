import toposort from "toposort";

import { WORKFLOW_VALIDATION_MESSAGES } from "@/features/workflows/constants/workflow-validation-messages";
import type { WorkflowGraph } from "@/features/workflows/types";

/**
 * 워크플로우 그래프의 실행 가능 여부를 검증하는 함수
 *
 * @param nodes - 워크플로우를 구성하는 노드 목록
 * @param edges - 노드 사이의 연결 관계 목록
 * @returns 검증 실패 시 오류 메시지 또는 검증 성공 시 `null`
 */
export const validateWorkflowGraph = ({ nodes, edges }: WorkflowGraph) => {
  const startNodes = nodes.filter((node) => node.data.type === "start");

  if (startNodes.length === 0) {
    return WORKFLOW_VALIDATION_MESSAGES.START_NODE_REQUIRED;
  }

  const actionNodes = nodes.filter((node) => node.data.kind === "action");

  if (actionNodes.length === 0) {
    return WORKFLOW_VALIDATION_MESSAGES.ACTION_NODE_REQUIRED;
  }

  const connectedTargetNodeIds = new Set(edges.map((edge) => edge.target));

  const hasUnconnectedActionNode = actionNodes.some(
    (node) => !connectedTargetNodeIds.has(node.id)
  );

  if (hasUnconnectedActionNode) {
    return WORKFLOW_VALIDATION_MESSAGES.UNCONNECTED_ACTION_NODE;
  }

  try {
    toposort(edges.map((edge) => [edge.source, edge.target]));
  } catch {
    return WORKFLOW_VALIDATION_MESSAGES.INVALID_GRAPH;
  }

  return null;
};
