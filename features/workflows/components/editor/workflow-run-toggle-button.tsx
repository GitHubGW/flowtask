"use client";

import { Button } from "@/components/ui/button";
import {
  cancelWorkflowAction,
  runWorkflowAction,
} from "@/features/workflows/actions";
import { useLatestRunSteps } from "@/features/workflows/hooks/use-latest-run-steps";
import { useWorkflowRunsContext } from "@/features/workflows/components/providers/workflow-runs-provider";
import { WORKFLOW_MESSAGES } from "@/features/workflows/constants/workflow-messages";
import { useProPlan } from "@/features/workflows/hooks/use-pro-plan";
import { validateWorkflowGraph } from "@/features/workflows/libs/validate-workflow-graph";
import type { WorkflowStepNode } from "@/features/workflows/types";
import { useReactFlow } from "@xyflow/react";
import { Play, Square } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export const WorkflowRunToggleButton = () => {
  const { id } = useParams<{ id: string }>();
  const { getNodes, getEdges } = useReactFlow<WorkflowStepNode>();
  const { runId, isLive } = useLatestRunSteps();
  const [isPending, startTransition] = useTransition();
  const [cancelledRunId, setCancelledRunId] = useState<string>();
  const { isLoaded, hasProPlan, goToPricing } = useProPlan();
  const { beginRun, trackRun, cancelRunStart } = useWorkflowRunsContext();
  const isRunActive = isLive && runId !== cancelledRunId;

  const handleRunWorkflow = () => {
    const graph = { nodes: getNodes(), edges: getEdges() };
    const validationError = validateWorkflowGraph(graph);

    if (validationError) {
      toast.error(validationError);
      return;
    }

    const usesAgentNode = graph.nodes.some(
      (node) => node.data.type === "agent"
    );

    if (usesAgentNode && !hasProPlan) {
      toast.info(WORKFLOW_MESSAGES.AGENT_NODE_PRO_REQUIRED);
      goToPricing();
      return;
    }

    beginRun();

    startTransition(async () => {
      try {
        const handle = await runWorkflowAction(id, graph);
        trackRun(handle.id);
        toast.success(WORKFLOW_MESSAGES.RUN_REQUESTED);
      } catch {
        cancelRunStart();
        toast.error(WORKFLOW_MESSAGES.RUN_ERROR);
      }
    });
  };

  const handleCancelWorkflow = () => {
    if (!runId) {
      return;
    }

    startTransition(async () => {
      try {
        await cancelWorkflowAction(runId);
        setCancelledRunId(runId);
        toast.success(WORKFLOW_MESSAGES.CANCEL_SUCCESS);
      } catch {
        toast.error(WORKFLOW_MESSAGES.CANCEL_ERROR);
      }
    });
  };

  if (isRunActive) {
    return (
      <Button
        disabled={isPending}
        size="sm"
        variant="destructive"
        onClick={handleCancelWorkflow}
        className="h-8 rounded-lg px-3"
      >
        <Square aria-hidden className="fill-current" />
        {isPending ? "중지 중..." : "중지"}
      </Button>
    );
  }

  return (
    <Button
      disabled={isPending || !isLoaded}
      size="sm"
      onClick={handleRunWorkflow}
      className="h-8 rounded-lg bg-violet-500 px-3 text-white shadow-sm hover:bg-violet-600"
    >
      <Play aria-hidden className="fill-current" />
      {isPending ? "실행 중..." : "실행"}
    </Button>
  );
};
