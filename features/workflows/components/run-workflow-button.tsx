import { Button } from "@/components/ui/button";
import { runWorkflowAction } from "@/features/workflows/actions";
import { validateWorkflowGraph } from "@/features/workflows/libs/validate-workflow-graph";
import { type StepNodeType } from "@/features/workflows/nodes/node-registry";
import { useReactFlow } from "@xyflow/react";
import { Play } from "lucide-react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const RunWorkflowButton = () => {
  const { id } = useParams<{ id: string }>();
  const { getNodes, getEdges } = useReactFlow<StepNodeType>();
  const [isPending, startTransition] = useTransition();

  const handleRunWorkflow = () => {
    const graph = { nodes: getNodes(), edges: getEdges() };
    const errors = validateWorkflowGraph(graph);

    if (errors.length > 0) {
      const errorMessage = errors.join("\n");
      toast.error(errorMessage);
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
      실행
    </Button>
  );
};
