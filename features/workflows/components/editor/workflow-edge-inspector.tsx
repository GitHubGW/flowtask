import { Waypoints } from "lucide-react";
import { type Edge, useReactFlow } from "@xyflow/react";

import { Button } from "@/components/ui/button";
import type { WorkflowStepNode } from "@/features/workflows/types";

interface WorkflowEdgeInspectorProps {
  selectedEdge: Edge;
  workflowNodes: WorkflowStepNode[];
}

export const WorkflowEdgeInspector = ({
  selectedEdge,
  workflowNodes,
}: WorkflowEdgeInspectorProps) => {
  const { deleteElements } = useReactFlow<WorkflowStepNode, Edge>();
  const sourceNode = workflowNodes.find(
    (node) => node.id === selectedEdge.source
  );
  const targetNode = workflowNodes.find(
    (node) => node.id === selectedEdge.target
  );

  const handleDeleteEdge = async () => {
    await deleteElements({ edges: [{ id: selectedEdge.id }] });
  };

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <div className="flex items-center gap-3 px-4 pt-5 pb-6">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500 text-white">
          <Waypoints className="size-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <span className="inline-flex rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
            Connection
          </span>
          <h2 className="mt-1 truncate text-sm font-semibold text-slate-950">
            엣지
          </h2>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleDeleteEdge}
          className="border-slate-200 bg-white text-slate-900 shadow-xs hover:bg-slate-50 hover:text-slate-900"
        >
          삭제
        </Button>
      </div>

      <div className="px-4 pb-5">
        <h3 className="text-sm font-semibold text-slate-950">연결 정보</h3>
        <dl className="mt-4 flex flex-col gap-4">
          <div>
            <dt className="text-xs text-slate-500">출발 노드</dt>
            <dd className="mt-1 text-sm font-medium text-slate-800">
              {sourceNode?.data.title ?? "알 수 없는 노드"}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">도착 노드</dt>
            <dd className="mt-1 text-sm font-medium text-slate-800">
              {targetNode?.data.title ?? "알 수 없는 노드"}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};
