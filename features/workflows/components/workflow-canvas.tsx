"use client";

import { useTheme } from "next-themes";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ConnectionLineType,
  Panel,
  type ReactFlowProps,
  type Edge,
} from "@xyflow/react";
import { WorkflowStepNodeRenderer } from "@/features/workflows/components/workflow-step-node-renderer";
import type {
  WorkflowGraph,
  WorkflowStepNode,
} from "@/features/workflows/types";
import { useLiveblocksFlow, Cursors } from "@liveblocks/react-flow";
import { AvatarStack } from "@liveblocks/react-ui";

const INITIAL_WORKFLOW_GRAPH: WorkflowGraph = {
  nodes: [],
  edges: [],
};

const WORKFLOW_CANVAS_OPTIONS: ReactFlowProps<WorkflowStepNode, Edge> = {
  nodeTypes: { step: WorkflowStepNodeRenderer },
  connectionLineType: ConnectionLineType.SmoothStep,
  connectionLineStyle: { stroke: "var(--border)" },
  defaultViewport: { x: 0, y: 0, zoom: 1.2 },
  defaultEdgeOptions: {
    type: "smoothstep" as const,
    style: { stroke: "var(--border)" },
  },
};

export const WorkflowCanvas = () => {
  const { resolvedTheme } = useTheme();
  const colorMode = resolvedTheme === "dark" ? "dark" : "light";

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onDelete } =
    useLiveblocksFlow({
      suspense: true,
      nodes: { initial: INITIAL_WORKFLOW_GRAPH.nodes },
      edges: { initial: INITIAL_WORKFLOW_GRAPH.edges },
    });

  return (
    <div className="size-full min-h-0">
      <ReactFlow
        {...WORKFLOW_CANVAS_OPTIONS}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDelete={onDelete}
        colorMode={colorMode}
      >
        <Cursors />
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-right">
          <AvatarStack size={30} max={5} />
        </Panel>
      </ReactFlow>
    </div>
  );
};
