import { useWorkflowRunsContext } from "@/features/workflows/components/providers/workflow-runs-provider";
import { useMemo } from "react";
import { getWorkflowRunSteps } from "@/features/workflows/components/providers/workflow-runs-provider";

/**
 * 워크플로우 실행 기록을 최신순으로 정렬하는 훅
 */
export const useWorkflowConsoleRuns = () => {
  const { runs } = useWorkflowRunsContext();

  return useMemo(() => {
    const sortedRuns = runs.toSorted((firstRun, secondRun) => {
      return secondRun.createdAt.getTime() - firstRun.createdAt.getTime();
    });

    return sortedRuns.map((run) => {
      const isLive = run.status === "QUEUED" || run.status === "EXECUTING";

      return {
        id: run.id,
        status: run.status,
        createdAt: run.createdAt,
        isLive,
        steps: getWorkflowRunSteps(run),
      };
    });
  }, [runs]);
};
