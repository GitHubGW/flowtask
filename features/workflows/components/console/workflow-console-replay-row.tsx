import { MonitorPlay } from "lucide-react";
import { ProPlanBadge } from "@/features/workflows/components/shared/pro-plan-badge";
import type { RunReplaySelection } from "@/features/workflows/types";
import { cn } from "@/libs/utils";

interface WorkflowConsoleReplayRowProps {
  runId: string;
  isSelected: boolean;
  isDisabled: boolean;
  isLocked: boolean;
  onSelect: (selection: RunReplaySelection) => void;
  onUpgrade: () => void;
}

export const WorkflowConsoleReplayRow = ({
  runId,
  isSelected,
  isDisabled,
  isLocked,
  onSelect,
  onUpgrade,
}: WorkflowConsoleReplayRowProps) => (
  <button
    type="button"
    aria-pressed={isSelected}
    disabled={isDisabled}
    onClick={() => {
      if (isLocked) {
        onUpgrade();
        return;
      }

      onSelect({ kind: "replay", runId });
    }}
    className={cn(
      "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-50",
      isSelected && "bg-violet-50 hover:bg-violet-50"
    )}
  >
    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
      <MonitorPlay className="size-4" />
    </span>
    <span className="flex items-center gap-1.5 font-medium text-slate-950">
      Replay
      {isLocked && <ProPlanBadge />}
    </span>
  </button>
);
