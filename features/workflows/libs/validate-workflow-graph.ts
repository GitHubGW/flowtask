import toposort from "toposort";
import type { WorkflowGraph } from "@/features/workflows/types";

export const validateWorkflowGraph = ({ nodes, edges }: WorkflowGraph) => {
  const triggerNodes = nodes.filter((node) => node.data.kind === "trigger");

  if (triggerNodes.length === 0) {
    return "워크플로우에는 하나의 트리거 노드가 존재해야 합니다.";
  }

  const actionNodes = nodes.filter((node) => node.data.kind === "action");

  if (actionNodes.length === 0) {
    return "워크플로우에는 하나 이상의 액션 노드가 존재해야 합니다.";
  }

  const connectedTargetNodeIds = new Set(edges.map((edge) => edge.target));

  const hasUnconnectedActionNode = actionNodes.some(
    (node) => !connectedTargetNodeIds.has(node.id)
  );

  if (hasUnconnectedActionNode) {
    return "트리거 노드와 연결되지 않은 액션 노드가 존재합니다.";
  }

  try {
    toposort(edges.map((edge) => [edge.source, edge.target]));
  } catch {
    return "워크플로우 그래프가 유효하지 않습니다.";
  }

  return null;
};
