import { MonitorPlay } from "lucide-react";
import type { RunReplaySelection } from "@/features/workflows/types";
import { cn } from "@/libs/utils";

interface WorkflowConsoleReplayRowProps {
  runId: string;
  isSelected: boolean;
  onSelect: (selection: RunReplaySelection) => void;
}

export const WorkflowConsoleReplayRow = ({
  runId,
  isSelected,
  onSelect,
}: WorkflowConsoleReplayRowProps) => (
  <button
    type="button"
    aria-pressed={isSelected}
    onClick={() => onSelect({ kind: "replay", runId })}
    className={cn(
      "flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent",
      isSelected && "bg-accent"
    )}
  >
    <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
      <MonitorPlay className="size-4" />
    </span>
    <span className="font-medium">Replay</span>
  </button>
);
