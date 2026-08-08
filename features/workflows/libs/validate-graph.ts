import type { WorkflowGraph } from "@/libs/db/schema";
import toposort from "toposort";

export const validateGraph = ({ nodes, edges }: WorkflowGraph) => {
  const problems = [];
  const triggerNodesCount = nodes.filter(
    (node) => node.data.kind === "trigger"
  ).length;

  if (triggerNodesCount > 1) {
    problems.push("하나의 워크플로우에 하나의 트리거 노드만 존재해야 합니다.");
  }

  if (edges.length === 0) {
    problems.push("워크플로우에 하나 이상의 노드가 존재해야 합니다.");
  } else {
    try {
      toposort(edges.map((edge) => [edge.source, edge.target]));
    } catch {
      problems.push("워크플로우 그래프가 유효하지 않습니다.");
    }
  }

  return problems;
};
