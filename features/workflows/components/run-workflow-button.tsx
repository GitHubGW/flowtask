import { Button } from "@/components/ui/button";
import { runWorkflowAction } from "@/features/workflows/actions";
import { validateWorkflowGraph } from "@/features/workflows/libs/validate-workflow-graph";
import type { WorkflowStepNode } from "@/features/workflows/types";
import { useReactFlow } from "@xyflow/react";
import { Play } from "lucide-react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const RunWorkflowButton = () => {
  const { id } = useParams<{ id: string }>();
  const { getNodes, getEdges } = useReactFlow<WorkflowStepNode>();
  const [isPending, startTransition] = useTransition();

  const handleRunWorkflow = () => {
    const graph = { nodes: getNodes(), edges: getEdges() };
    const validationError = validateWorkflowGraph(graph);

    if (validationError) {
      toast.error(validationError);
      return;
    }

    startTransition(async () => {
      try {
        await runWorkflowAction(id, graph);
        toast.success("워크플로우를 실행했습니다.");
      } catch {
        toast.error("워크플로우 실행에 실패했습니다.");
      }
    });
  };

  return (
    <Button
      disabled={isPending}
      size="sm"
      variant="secondary"
      onClick={handleRunWorkflow}
    >
      <Play aria-hidden className="fill-current" />
      {isPending ? "워크플로우 실행 중..." : "워크플로우 실행"}
    </Button>
  );
};
