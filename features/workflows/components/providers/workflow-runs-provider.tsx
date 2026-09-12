"use client";

import { useRealtimeRunsWithTag } from "@trigger.dev/react-hooks";
import { useParams } from "next/navigation";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { runWorkflowTask } from "@/features/workflows/tasks/run-workflow/run-workflow-task";
import type { RunStep } from "@/features/workflows/types";

type UseRealtimeWorkflowRunsResult = ReturnType<
  typeof useRealtimeRunsWithTag<typeof runWorkflowTask>
>;

export type WorkflowRun = UseRealtimeWorkflowRunsResult["runs"][number];

interface WorkflowRunsContextValue {
  runs: WorkflowRun[];
  error: UseRealtimeWorkflowRunsResult["error"];
  pendingRunId?: string;
  isRunStarting: boolean;
  beginRun: () => void;
  trackRun: (runId: string) => void;
  cancelRunStart: () => void;
}

interface WorkflowRunsProviderProps {
  publicAccessToken: string;
  children: React.ReactNode;
}

export const getWorkflowRunSteps = (run: WorkflowRun) => {
  const metadataSteps = run.metadata?.steps as RunStep[] | undefined;
  return run.output?.steps ?? metadataSteps ?? [];
};

const WorkflowRunsContext = createContext<WorkflowRunsContextValue | null>(
  null
);

export const WorkflowRunsProvider = ({
  publicAccessToken,
  children,
}: WorkflowRunsProviderProps) => {
  const { id: workflowId } = useParams<{ id: string }>();
  const [pendingRunId, setPendingRunId] = useState<string>();
  const [isRunStarting, setIsRunStarting] = useState(false);
  const { runs, error } = useRealtimeRunsWithTag<typeof runWorkflowTask>(
    `workflow:${workflowId}`,
    { accessToken: publicAccessToken, skipColumns: ["payload"] }
  );

  const beginRun = useCallback(() => {
    setPendingRunId(undefined);
    setIsRunStarting(true);
  }, []);

  const trackRun = useCallback((runId: string) => {
    setPendingRunId(runId);
    setIsRunStarting(false);
  }, []);

  const cancelRunStart = useCallback(() => {
    setPendingRunId(undefined);
    setIsRunStarting(false);
  }, []);

  const contextValue = useMemo<WorkflowRunsContextValue>(() => {
    return {
      runs,
      error,
      pendingRunId,
      isRunStarting,
      beginRun,
      trackRun,
      cancelRunStart,
    };
  }, [
    runs,
    error,
    pendingRunId,
    isRunStarting,
    beginRun,
    trackRun,
    cancelRunStart,
  ]);

  return (
    <WorkflowRunsContext value={contextValue}>{children}</WorkflowRunsContext>
  );
};

export const useWorkflowRunsContext = () => {
  const context = useContext(WorkflowRunsContext);

  if (!context) {
    throw new Error(
      "워크플로우 실행 훅은 WorkflowRunsProvider 내부에서 사용해야 합니다."
    );
  }

  return context;
};
