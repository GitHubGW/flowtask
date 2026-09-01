"use client";

import { getIncomers, useEdges, useNodes } from "@xyflow/react";
import {
  nodeRegistry,
  type WorkflowNodeType,
  type StepNodeType,
} from "@/features/workflows/nodes/node-registry";

export interface UpstreamOutputOption {
  type: WorkflowNodeType;
  label: string;
  token: string;
}

export const useUpstreamOutputOptions = (
  selectedNode: StepNodeType | undefined
) => {
  const workflowNodes = useNodes<StepNodeType>();
  const workflowEdges = useEdges();

  if (!selectedNode) {
    return [];
  }

  const visitedNodeIds = new Set([selectedNode.id]);
  const upstreamNodes: StepNodeType[] = [];

  const collectUpstreamNodes = (node: StepNodeType) => {
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
    nodeRegistry[node.data.type].outputs.map((output) => ({
      type: node.data.type,
      label: `${node.data.title} · ${output.label}`,
      token: `{{ ${node.id}.${output.path} }}`,
    }))
  );
};
