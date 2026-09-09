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
  const isDone = step.status === "done";
  const isFailed = step.status === "failed";
  const isPending = step.status === "pending";

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={() => onSelect({ kind: "step", runId, nodeId: step.nodeId })}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent",
        isSelected && "bg-accent",
        isPending && "opacity-50"
      )}
    >
      <WorkflowStepIcon stepType={step.type} />
      <span
        className={cn(
          "min-w-0 flex-1 truncate font-medium",
          isDone && "text-emerald-600",
          isFailed && "text-destructive",
          isPending && "text-muted-foreground"
        )}
      >
        {step.title}
      </span>
      <div className="flex shrink-0 items-center gap-2">
        {step.durationMs !== undefined && (
          <span className="text-muted-foreground tabular-nums">
            {prettyMilliseconds(step.durationMs)}
          </span>
        )}
        <WorkflowConsoleStepStatusIcon status={step.status} isLive={isLive} />
      </div>
    </button>
  );
};
