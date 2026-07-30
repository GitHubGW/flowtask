"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  type Edge,
  type Connection,
} from "@xyflow/react";
import { StepNode } from "@/features/workflows/components/step-node";
import type { StepNodeType } from "@/features/workflows/nodes/node-registry";

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
  const [nodes, setNodes, handleNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, handleEdgesChange] = useEdgesState(initialEdges);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const colorMode = mounted && resolvedTheme === "dark" ? "dark" : "light";

  const handleConnect = (connection: Connection) => {
    setEdges((edges) => addEdge(connection, edges));
  };

  return (
    <div className="size-full min-h-0">
      <ReactFlow
        fitView
        nodeTypes={{ step: StepNode }}
        colorMode={colorMode}
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{ stroke: "var(--border)" }}
        defaultEdgeOptions={{
          type: "smoothstep",
          style: { stroke: "var(--border)" },
        }}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
