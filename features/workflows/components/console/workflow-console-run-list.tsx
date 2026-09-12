"use client";

import { format } from "date-fns";
import { WorkflowConsoleStepRow } from "@/features/workflows/components/console/workflow-console-step-row";
import { useWorkflowConsoleRuns } from "@/features/workflows/hooks/use-workflow-console-runs";
import type { WorkflowConsoleSelection } from "@/features/workflows/types";
import { WorkflowConsoleReplayRow } from "@/features/workflows/components/console/workflow-console-replay-row";
import { useProPlan } from "@/features/workflows/hooks/use-pro-plan";
import { ko } from "date-fns/locale";

interface WorkflowConsoleRunListProps {
  selection: WorkflowConsoleSelection | null;
  onSelect: (selection: WorkflowConsoleSelection) => void;
}

export const WorkflowConsoleRunList = ({
  selection,
  onSelect,
}: WorkflowConsoleRunListProps) => {
  const runs = useWorkflowConsoleRuns();
  const { isLoaded, hasProPlan, goToPricing } = useProPlan();

  return (
    <section className="flex size-full min-h-0 flex-col bg-slate-50/70">
      <h2 className="shrink-0 border-b border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-950">
        실행 기록
      </h2>

      {runs.length > 0 ? (
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
          {runs.map((run) => (
            <div
              key={run.id}
              className="rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2 px-2 py-1.5 text-xs text-slate-500">
                <time dateTime={run.createdAt.toISOString()}>
                  {format(run.createdAt, "yyyy.MM.dd a hh:mm:ss", {
                    locale: ko,
                  })}
                </time>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-600 lowercase">
                  {run.status}
                </span>
              </div>

              {run.steps.length > 0 ? (
                run.steps.map((step) => {
                  const isSelected =
                    selection?.kind === "step" &&
                    selection.runId === run.id &&
                    selection.nodeId === step.nodeId;

                  return (
                    <WorkflowConsoleStepRow
                      key={step.nodeId}
                      runId={run.id}
                      step={step}
                      isLive={run.isLive}
                      isSelected={isSelected}
                      onSelect={onSelect}
                    />
                  );
                })
              ) : (
                <p className="px-2 py-2 text-xs text-slate-500">
                  {run.isLive
                    ? "실행 정보를 불러오고 있어요."
                    : "표시할 단계 정보가 없어요."}
                </p>
              )}
              {run.browserbaseSessionId && run.status === "COMPLETED" && (
                <WorkflowConsoleReplayRow
                  runId={run.id}
                  isDisabled={!isLoaded}
                  isLocked={isLoaded && !hasProPlan}
                  isSelected={
                    selection?.kind === "replay" && selection.runId === run.id
                  }
                  onSelect={onSelect}
                  onUpgrade={goToPricing}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 items-center justify-center p-4 text-sm text-slate-500">
          아직 워크플로우 실행 기록이 없어요.
        </div>
      )}
    </section>
  );
};
