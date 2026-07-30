"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ConnectionLineType,
  type Edge,
} from "@xyflow/react";
import { StepNode } from "@/features/workflows/components/step-node";
import type { StepNodeType } from "@/features/workflows/nodes/node-registry";
import { useLiveblocksFlow, Cursors } from "@liveblocks/react-flow";

const initialNodes: StepNodeType[] = [
  {
    id: "start",
    type: "step",
    position: { x: 0, y: 0 },
    data: { type: "start", kind: "trigger", title: "Start", values: {} },
  },
  {
    id: "open-url",
    type: "step",
    position: { x: 0, y: 100 },
    data: { type: "open-url", kind: "action", title: "Open URL", values: {} },
  },
];

const initialEdges: Edge[] = [
  { id: "n1-n2", source: "n1", target: "n2" },
  { id: "n1-n3", source: "n1", target: "n3" },
];

export const Canvas = () => {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const colorMode = mounted && resolvedTheme === "dark" ? "dark" : "light";

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
        nodeTypes={{ step: StepNode }}
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
      </ReactFlow>
    </div>
  );
};
