import {
  useWorkflowRunsContext,
  type WorkflowRun,
} from "@/features/workflows/components/providers/workflow-runs-provider";
import { useMemo } from "react";
import { getWorkflowRunSteps } from "@/features/workflows/components/providers/workflow-runs-provider";

/**
 * 워크플로우의 가장 최근 실행 상태와 단계 정보를 제공하는 훅
 */
export const useLatestRunSteps = () => {
  const { runs, pendingRunId, isRunStarting } = useWorkflowRunsContext();

  return useMemo(() => {
    if (isRunStarting) {
      return { runId: undefined, steps: [], isLive: false };
    }

    if (pendingRunId && !runs.some((run) => run.id === pendingRunId)) {
      return { runId: pendingRunId, steps: [], isLive: true };
    }

    const latestRun = runs.reduce<WorkflowRun | undefined>((latest, run) => {
      return !latest || run.createdAt > latest.createdAt ? run : latest;
    }, undefined);

    if (!latestRun) {
      return { runId: undefined, steps: [], isLive: false };
    }

    const isLive =
      latestRun.status === "QUEUED" || latestRun.status === "EXECUTING";

    return {
      runId: latestRun.id,
      steps: getWorkflowRunSteps(latestRun),
      isLive,
    };
  }, [runs, pendingRunId, isRunStarting]);
};
