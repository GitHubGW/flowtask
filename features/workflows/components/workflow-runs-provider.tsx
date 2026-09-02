"use client";

import { useRealtimeRunsWithTag } from "@trigger.dev/react-hooks";
import { createContext, useContext, useMemo } from "react";
import type {
  RunStep,
  runWorkflowTask,
} from "@/features/workflows/tasks/run-workflow";
import { useParams } from "next/navigation";

interface WorkflowRunsProviderProps {
  publicAccessToken: string;
  children: React.ReactNode;
}

interface LatestRunSteps {
  steps: RunStep[];
  isLive: boolean;
}

const isRunStep = (value: unknown): value is RunStep => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  if (!("nodeId" in value) || !("status" in value)) {
    return false;
  }

  return (
    typeof value.nodeId === "string" &&
    (value.status === "pending" ||
      value.status === "running" ||
      value.status === "done" ||
      value.status === "failed")
  );
};

const getRunSteps = (value: unknown) => {
  return Array.isArray(value) && value.every(isRunStep) ? value : [];
};

const WorkflowRunsContext = createContext<LatestRunSteps | null>(null);

export const WorkflowRunsProvider = ({
  publicAccessToken,
  children,
}: WorkflowRunsProviderProps) => {
  const { id } = useParams();
  const { runs } = useRealtimeRunsWithTag<typeof runWorkflowTask>(
    `workflow:${id}`,
    {
      accessToken: publicAccessToken,
      skipColumns: ["payload"],
    }
  );

  const latestRun = runs.reduce<(typeof runs)[number] | undefined>(
    (latest, run) => {
      return !latest || run.createdAt > latest.createdAt ? run : latest;
    },
    undefined
  );

  const steps =
    latestRun?.output?.steps ?? getRunSteps(latestRun?.metadata?.steps);
  const isLive =
    latestRun?.status === "QUEUED" || latestRun?.status === "EXECUTING";

  const contextValue = useMemo(() => ({ steps, isLive }), [steps, isLive]);

  return (
    <WorkflowRunsContext.Provider value={contextValue}>
      {children}
    </WorkflowRunsContext.Provider>
  );
};

export const useLatestRunSteps = () => {
  const context = useContext(WorkflowRunsContext);

  if (!context) {
    throw new Error(
      "useLatestRunSteps는 WorkflowRunsProvider 내부에서 사용해야 합니다."
    );
  }

  return context;
};
