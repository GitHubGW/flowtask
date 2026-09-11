import prettyMilliseconds from "pretty-ms";
import type { RunStepSelection } from "@/features/workflows/types";
import type { RunStep } from "@/features/workflows/types";
import { cn } from "@/libs/utils";
import { WorkflowStepIcon } from "@/features/workflows/components/shared/workflow-step-icon";
import { WorkflowConsoleStepStatusIcon } from "@/features/workflows/components/console/workflow-console-step-status-icon";

interface WorkflowConsoleStepRowProps {
  runId: string;
  step: RunStep;
  isLive: boolean;
  isSelected: boolean;
  onSelect: (selection: RunStepSelection) => void;
}

export const WorkflowConsoleStepRow = ({
  runId,
  step,
  isLive,
  isSelected,
  onSelect,
}: WorkflowConsoleStepRowProps) => {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={() => onSelect({ kind: "step", runId, nodeId: step.nodeId })}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors hover:bg-slate-50",
        isSelected && "bg-violet-50 hover:bg-violet-50"
      )}
    >
      <WorkflowStepIcon stepType={step.type} className="size-7 rounded-lg" />
      <span className="min-w-0 flex-1 truncate font-medium text-slate-950">
        {step.title}
      </span>
      <div className="flex shrink-0 items-center gap-2">
        {step.durationMs !== undefined && (
          <span className="text-xs text-slate-500 tabular-nums">
            {prettyMilliseconds(step.durationMs)}
          </span>
        )}
        <WorkflowConsoleStepStatusIcon status={step.status} isLive={isLive} />
      </div>
    </button>
  );
};
