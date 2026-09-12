"use client";

import { useCallback, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ConnectionLineType,
  getOutgoers,
  MarkerType,
  Panel,
  useReactFlow,
  type ReactFlowProps,
  type Edge,
  type IsValidConnection,
} from "@xyflow/react";
import { WorkflowStepNodeRenderer } from "@/features/workflows/components/editor/workflow-step-node-renderer";
import type {
  WorkflowGraph,
  WorkflowStepNode,
} from "@/features/workflows/types";
import { useLiveblocksFlow, Cursors } from "@liveblocks/react-flow";
import { AvatarStack } from "@liveblocks/react-ui";
import { CircleAlert, Map as MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLatestRunSteps } from "@/features/workflows/hooks/use-latest-run-steps";
import { useWorkflowRunsContext } from "@/features/workflows/components/providers/workflow-runs-provider";

const INITIAL_WORKFLOW_GRAPH: WorkflowGraph = {
  nodes: [],
  edges: [],
};

const WORKFLOW_CANVAS_OPTIONS: ReactFlowProps<WorkflowStepNode, Edge> = {
  fitView: true,
  fitViewOptions: { maxZoom: 0.95 },
  nodeTypes: { step: WorkflowStepNodeRenderer },
  connectionLineType: ConnectionLineType.Straight,
  connectionLineStyle: { stroke: "var(--color-slate-300)", strokeWidth: 1.1 },
  defaultViewport: { x: 0, y: 0, zoom: 0.95 },
  defaultEdgeOptions: {
    type: "straight" as const,
    style: { stroke: "var(--color-slate-300)", strokeWidth: 1.1 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "var(--color-slate-300)",
      width: 20,
      height: 20,
    },
  },
  proOptions: { hideAttribution: true },
};

export const WorkflowCanvas = () => {
  const { resolvedTheme } = useTheme();
  const [isMiniMapOpen, setIsMiniMapOpen] = useState(false);
  const { steps } = useLatestRunSteps();
  const { error: runsError } = useWorkflowRunsContext();
  const { getNodes, getEdges } = useReactFlow<WorkflowStepNode, Edge>();
  const colorMode = resolvedTheme === "dark" ? "dark" : "light";
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onDelete } =
    useLiveblocksFlow({
      suspense: true,
      nodes: { initial: INITIAL_WORKFLOW_GRAPH.nodes },
      edges: { initial: INITIAL_WORKFLOW_GRAPH.edges },
    });

  const stepStatusByNodeId = useMemo(
    () => new Map(steps.map((step) => [step.nodeId, step.status])),
    [steps]
  );
  const verticalEdges = useMemo(() => {
    return edges.map((edge) => {
      const targetStatus = stepStatusByNodeId.get(edge.target);
      const executionColor =
        targetStatus === "done"
          ? "var(--color-emerald-500)"
          : targetStatus === "failed"
            ? "var(--color-red-500)"
            : "var(--color-slate-300)";
      const color = edge.selected ? "var(--color-violet-500)" : executionColor;

      return {
        ...edge,
        type: "straight",
        interactionWidth: 24,
        style: { stroke: color, strokeWidth: edge.selected ? 1.1 : 1.1 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color,
          width: 20,
          height: 20,
        },
      };
    });
  }, [edges, stepStatusByNodeId]);

  const isValidConnection = useCallback<IsValidConnection<Edge>>(
    ({ source, target }) => {
      const currentNodes = getNodes();
      const currentEdges = getEdges();

      if (source === target) {
        return false;
      }

      const hasConnectedSource = currentEdges.some(
        (edge) => edge.source === source
      );
      const hasConnectedTarget = currentEdges.some(
        (edge) => edge.target === target
      );

      if (hasConnectedSource || hasConnectedTarget) {
        return false;
      }

      const targetNode = currentNodes.find((node) => node.id === target);

      if (!targetNode) {
        return false;
      }

      const createsCycle = (
        node: WorkflowStepNode,
        visitedNodeIds = new Set<string>()
      ): boolean => {
        if (visitedNodeIds.has(node.id)) {
          return false;
        }

        visitedNodeIds.add(node.id);

        return getOutgoers(node, currentNodes, currentEdges).some((outgoer) => {
          return outgoer.id === source || createsCycle(outgoer, visitedNodeIds);
        });
      };

      return !createsCycle(targetNode);
    },
    [getEdges, getNodes]
  );

  return (
    <div className="size-full min-h-0 bg-slate-50/60">
      <ReactFlow
        {...WORKFLOW_CANVAS_OPTIONS}
        nodes={nodes}
        edges={verticalEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDelete={onDelete}
        isValidConnection={isValidConnection}
        deleteKeyCode={["Backspace", "Delete"]}
        colorMode={colorMode}
      >
        <Cursors />
        {runsError && (
          <Panel position="top-center">
            <div
              role="alert"
              className="flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-600 shadow-sm"
            >
              <CircleAlert className="size-4" aria-hidden />
              실행 상태를 실시간으로 불러오지 못했어요. 페이지를 새로고침해
              주세요.
            </div>
          </Panel>
        )}
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1.25}
          color="var(--color-slate-300)"
        />
        <Controls className="overflow-hidden rounded-xl! border! border-slate-200! bg-white! shadow-sm!" />
        {isMiniMapOpen && (
          <MiniMap
            position="bottom-right"
            pannable
            zoomable
            nodeColor="#c4b5fd"
            nodeStrokeColor="#a480f7"
            maskColor="rgb(248 250 252 / 0.72)"
            className="mb-14! overflow-hidden! rounded-xl! border! border-slate-200! bg-white! shadow-sm!"
            ariaLabel="워크플로우 미니맵"
          />
        )}
        <Panel position="bottom-right">
          <Button
            type="button"
            size="icon"
            aria-label={isMiniMapOpen ? "미니맵 닫기" : "미니맵 열기"}
            aria-pressed={isMiniMapOpen}
            onClick={() => setIsMiniMapOpen((isOpen) => !isOpen)}
            className="size-10 rounded-xl bg-violet-500 text-white shadow-sm hover:bg-violet-600"
          >
            <MapIcon className="size-4" aria-hidden />
          </Button>
        </Panel>
        <Panel position="top-right">
          <div className="rounded-full border border-slate-200 bg-white p-1">
            <AvatarStack size={28} max={5} />
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};
