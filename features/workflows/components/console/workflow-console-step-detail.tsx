"use client";

import type { RunStepSelection } from "@/features/workflows/types";
import { WorkflowConsoleStepInput } from "@/features/workflows/components/console/workflow-console-step-input";
import { WorkflowConsoleStepOutput } from "@/features/workflows/components/console/workflow-console-step-output";
import { WorkflowConsoleStepMetadata } from "@/features/workflows/components/console/workflow-console-step-metadata";
import { useWorkflowConsoleRuns } from "@/features/workflows/hooks/use-workflow-console-runs";

interface WorkflowConsoleStepDetailProps {
  selection: RunStepSelection;
}

export const WorkflowConsoleStepDetail = ({
  selection,
}: WorkflowConsoleStepDetailProps) => {
  const runs = useWorkflowConsoleRuns();
  const selectedRun = runs.find((run) => run.id === selection.runId);
  const selectedStep = selectedRun?.steps.find(
    (step) => step.nodeId === selection.nodeId
  );

  if (!selectedStep) {
    return (
      <div className="flex size-full items-center justify-center p-3 text-center text-xs text-muted-foreground">
        선택한 단계를 더 이상 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <section className="flex size-full min-h-0 flex-col">
      <h2 className="shrink-0 border-b px-3 py-2 text-sm font-semibold">
        {selectedStep.title}
      </h2>
      <div className="min-h-0 flex-1 space-y-4 overflow-auto p-3">
        <WorkflowConsoleStepMetadata step={selectedStep} />
        <WorkflowConsoleStepInput input={selectedStep.input} />
        <WorkflowConsoleStepOutput step={selectedStep} />
      </div>
    </section>
  );
};
