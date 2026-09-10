"use client";

import { Button } from "@/components/ui/button";
import {
  cancelWorkflowAction,
  runWorkflowAction,
} from "@/features/workflows/actions";
import { useLatestRunSteps } from "@/features/workflows/hooks/use-latest-run-steps";
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
  const isRunActive = isLive && runId !== cancelledRunId;

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

  const handleCancelWorkflow = () => {
    if (!runId) {
      return;
    }

    startTransition(async () => {
      try {
        await cancelWorkflowAction(runId);
        setCancelledRunId(runId);
        toast.success("워크플로우를 중지했습니다.");
      } catch {
        toast.error("워크플로우 중지에 실패했습니다.");
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
      >
        <Square aria-hidden className="fill-current" />
        {isPending ? "중지 중..." : "중지"}
      </Button>
    );
  }

  return (
    <Button
      disabled={isPending}
      size="sm"
      variant="secondary"
      onClick={handleRunWorkflow}
    >
      <Play aria-hidden className="fill-current" />
      {isPending ? "실행 중..." : "실행"}
    </Button>
  );
};
