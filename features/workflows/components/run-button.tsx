import { Button } from "@/components/ui/button";
import { runWorkflowAction } from "@/features/workflows/actions";
import { validateGraph } from "@/features/workflows/libs/validate-graph";
import { StepNodeType } from "@/features/workflows/nodes/node-registry";
import { useReactFlow } from "@xyflow/react";
import { Play } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface RunButtonProps {
  workflowId: string;
}

export const RunButton = ({ workflowId }: RunButtonProps) => {
  const { getNodes, getEdges } = useReactFlow<StepNodeType>();
  const [isPending, startTransition] = useTransition();

  const handleRunWorkflow = async () => {
    const graph = { nodes: getNodes(), edges: getEdges() };
    const problems = validateGraph(graph);

    if (problems.length > 0) {
      toast.error(problems[0]);
      return;
    }

    startTransition(async () => {
      await runWorkflowAction(workflowId, graph);
    });
  };

  return (
    <Button
      disabled={isPending}
      size="sm"
      variant="secondary"
      onClick={handleRunWorkflow}
    >
      <Play fill="primary" />
      실행
    </Button>
  );
};
