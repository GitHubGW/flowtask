import { CircleCheckIcon, CircleXIcon, LoaderCircleIcon } from "lucide-react";
import type { RunStep } from "@/features/workflows/types";

interface WorkflowConsoleStepStatusIconProps {
  status: RunStep["status"];
  isLive: boolean;
}

export const WorkflowConsoleStepStatusIcon = ({
  status,
  isLive,
}: WorkflowConsoleStepStatusIconProps) => {
  if (status === "done") {
    return (
      <CircleCheckIcon
        role="img"
        aria-label="성공"
        className="size-4 text-emerald-600"
      />
    );
  }

  if (status === "failed") {
    return (
      <CircleXIcon
        role="img"
        aria-label="실패"
        className="size-4 text-destructive"
      />
    );
  }

  if (isLive && status === "running") {
    return (
      <LoaderCircleIcon
        role="img"
        aria-label="실행 중"
        className="size-4 animate-spin text-muted-foreground"
      />
    );
  }

  return null;
};
