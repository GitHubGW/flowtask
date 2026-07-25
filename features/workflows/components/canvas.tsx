"use client";

import { useCallback, useSyncExternalStore } from "react";
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
  type Node,
  type Edge,
  type OnConnect,
  type ColorMode,
} from "@xyflow/react";

const initialNodes: Node[] = [
  {
    id: "n1",
    type: "input",
    position: { x: 0, y: 0 },
    data: { label: "Node 1" },
  },
  {
    id: "n2",
    position: { x: 0, y: 100 },
    data: { label: "Node 2" },
  },
  {
    id: "n3",
    position: { x: 0, y: 200 },
    data: { label: "Node 3" },
  },
];

const initialEdges: Edge[] = [
  {
    id: "n1-n2",
    source: "n1",
    target: "n2",
  },
  {
    id: "n1-n3",
    source: "n1",
    target: "n3",
  },
];

const emptySubscribe = () => () => {};

const useIsMounted = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
};

export const Canvas = () => {
  const mounted = useIsMounted();
  const { resolvedTheme } = useTheme();
  const [nodes, setNodes, handleNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, handleEdgesChange] = useEdgesState(initialEdges);

  console.log("nodes", nodes);
  console.log("edges", edges);

  const colorMode: ColorMode = !mounted
    ? "light"
    : resolvedTheme === "dark"
      ? "dark"
      : "light";

  const handleConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((edgesSnapshot) => addEdge(connection, edgesSnapshot));
    },
    [setEdges]
  );

  return (
    <div className="size-full min-h-0">
      <ReactFlow
        fitView
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
