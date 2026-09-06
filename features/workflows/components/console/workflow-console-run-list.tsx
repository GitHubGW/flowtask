"use client";

import { WorkflowConsoleStepRow } from "@/features/workflows/components/console/workflow-console-step-row";
import { useWorkflowConsoleRuns } from "@/features/workflows/hooks/use-workflow-console-runs";
import type { RunStepSelection } from "@/features/workflows/types";

interface WorkflowConsoleRunListProps {
  selectedStep: RunStepSelection | null;
  onSelectStep: (selection: RunStepSelection) => void;
}

export const WorkflowConsoleRunList = ({
  selectedStep,
  onSelectStep,
}: WorkflowConsoleRunListProps) => {
  const runs = useWorkflowConsoleRuns();

  return (
    <section className="flex size-full min-h-0 flex-col">
      <h2 className="shrink-0 px-3 py-2 text-xs font-medium text-muted-foreground">
        로그
      </h2>

      {runs.length > 0 ? (
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-2 pb-2">
          {runs.map((run) => (
            <div key={run.id}>
              <div className="flex items-center gap-2 px-2 py-1 text-xs font-medium text-muted-foreground">
                <time dateTime={run.createdAt.toISOString()}>
                  {run.createdAt.toLocaleTimeString()}
                </time>
                <span className="lowercase">{run.status}</span>
              </div>

              {run.steps.length > 0 ? (
                run.steps.map((step) => {
                  const isSelected =
                    selectedStep?.runId === run.id &&
                    selectedStep.nodeId === step.nodeId;

                  return (
                    <WorkflowConsoleStepRow
                      key={step.nodeId}
                      runId={run.id}
                      step={step}
                      isLive={run.isLive}
                      isSelected={isSelected}
                      onSelect={onSelectStep}
                    />
                  );
                })
              ) : (
                <p className="px-2 py-1.5 text-xs text-muted-foreground">
                  {run.isLive
                    ? "실행 정보를 불러오는 중입니다."
                    : "표시할 단계 정보가 없습니다."}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 items-center justify-center p-3 text-sm text-muted-foreground">
          아직 워크플로우 실행 기록이 없습니다.
        </div>
      )}
    </section>
  );
};
