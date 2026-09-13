"use client";

import type { RunStepSelection } from "@/features/workflows/types";
import { Badge } from "@/components/ui/badge";
import { WorkflowConsoleStepInput } from "@/features/workflows/components/console/workflow-console-step-input";
import { WorkflowConsoleStepOutput } from "@/features/workflows/components/console/workflow-console-step-output";
import { WorkflowConsoleStepMetadata } from "@/features/workflows/components/console/workflow-console-step-metadata";
import { WorkflowConsoleStepStatusIcon } from "@/features/workflows/components/console/workflow-console-step-status-icon";
import { WorkflowStepIcon } from "@/features/workflows/components/shared/workflow-step-icon";
import { useWorkflowConsoleRuns } from "@/features/workflows/hooks/use-workflow-console-runs";
import { workflowStepRegistry } from "@/features/workflows/nodes/workflow-step-registry";

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
        선택한 단계를 더 이상 찾을 수 없어요.
      </div>
    );
  }

  const stepDefinition = workflowStepRegistry[selectedStep.type];
  const stepKindLabel =
    stepDefinition.kind === "trigger" ? "Trigger" : "Action";

  return (
    <section className="flex size-full min-h-0 flex-col bg-white">
      <div className="flex shrink-0 items-center gap-3 border-b border-slate-200 px-4 pt-5 pb-6">
        <WorkflowStepIcon
          stepType={selectedStep.type}
          className="size-10 rounded-xl [&_svg]:size-5"
        />
        <div className="min-w-0 flex-1">
          <Badge variant="secondary" size="small">
            {stepKindLabel}
          </Badge>
          <h2 className="mt-1 truncate text-sm font-semibold text-slate-950">
            {selectedStep.title}
          </h2>
        </div>
        <WorkflowConsoleStepStatusIcon
          status={selectedStep.status}
          isLive={selectedRun?.isLive ?? false}
        />
      </div>

      <div className="min-h-0 flex-1 space-y-6 overflow-auto px-4 py-5">
        <WorkflowConsoleStepMetadata step={selectedStep} />
        <WorkflowConsoleStepInput input={selectedStep.input} />
        <WorkflowConsoleStepOutput step={selectedStep} />
      </div>
    </section>
  );
};
