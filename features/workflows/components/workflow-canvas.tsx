"use client";

import { useTheme } from "next-themes";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ConnectionLineType,
  Panel,
  type Edge,
} from "@xyflow/react";
import { WorkflowStepNode } from "@/features/workflows/components/workflow-step-node";
import type { StepNodeType } from "@/features/workflows/nodes/node-registry";
import { useLiveblocksFlow, Cursors } from "@liveblocks/react-flow";
import { AvatarStack } from "@liveblocks/react-ui";

const initialNodes: StepNodeType[] = [];

const initialEdges: Edge[] = [];

export const WorkflowCanvas = () => {
  const { resolvedTheme } = useTheme();
  const colorMode = resolvedTheme === "dark" ? "dark" : "light";
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onDelete } =
    useLiveblocksFlow({
      suspense: true,
      nodes: { initial: initialNodes },
      edges: { initial: initialEdges },
    });

  return (
    <div className="size-full min-h-0">
      <ReactFlow
        fitView
        nodeTypes={{ step: WorkflowStepNode }}
        colorMode={colorMode}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDelete={onDelete}
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{ stroke: "var(--border)" }}
        defaultEdgeOptions={{
          type: "smoothstep",
          style: { stroke: "var(--border)" },
        }}
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
