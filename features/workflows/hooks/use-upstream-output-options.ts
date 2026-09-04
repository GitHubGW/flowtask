"use client";

import { getIncomers, useEdges, useNodes } from "@xyflow/react";
import { workflowStepRegistry } from "@/features/workflows/nodes/workflow-step-registry";
import type {
  WorkflowStepNode,
  WorkflowStepType,
} from "@/features/workflows/types";

export interface UpstreamOutputOption {
  stepType: WorkflowStepType;
  label: string;
  token: string;
}

/**
 * 선택한 노드에서 참조 가능한 상위 노드의 출력 옵션을 제공하는 훅
 */
export const useUpstreamOutputOptions = (
  selectedNode: WorkflowStepNode | undefined
) => {
  const workflowNodes = useNodes<WorkflowStepNode>();
  const workflowEdges = useEdges();

  if (!selectedNode) {
    return [];
  }

  const visitedNodeIds = new Set([selectedNode.id]);
  const upstreamNodes: WorkflowStepNode[] = [];

  const collectUpstreamNodes = (node: WorkflowStepNode) => {
    const incomers = getIncomers(node, workflowNodes, workflowEdges);

    for (const incomer of incomers) {
      if (visitedNodeIds.has(incomer.id)) {
        continue;
      }

      visitedNodeIds.add(incomer.id);
      upstreamNodes.push(incomer);
      collectUpstreamNodes(incomer);
    }
  };

  collectUpstreamNodes(selectedNode);

  return upstreamNodes.flatMap((node) =>
    workflowStepRegistry[node.data.type].outputs.map((output) => ({
      stepType: node.data.type,
      label: `${node.data.title} · ${output.label}`,
      token: `{{ ${node.id}.${output.path} }}`,
    }))
  );
};
