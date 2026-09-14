import { type LucideIcon, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/libs/utils";

import styles from "./workflow-demo-node.module.css";

const executionStepClassNames = {
  1: styles.stepOneNode,
  2: styles.stepTwoNode,
  3: styles.stepThreeNode,
  4: styles.stepFourNode,
} as const;

interface WorkflowDemoNodeProps {
  className?: string;
  executionStep: keyof typeof executionStepClassNames;
  icon: LucideIcon;
  iconClassName: string;
  input?: string;
  kind: "action" | "trigger";
  label: string;
}

export const WorkflowDemoNode = ({
  className,
  executionStep,
  icon: Icon,
  iconClassName,
  input,
  kind,
  label,
}: WorkflowDemoNodeProps) => {
  return (
    <div
      className={cn(
        "absolute z-10 w-72 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-slate-950 shadow-sm transition-[border-color,box-shadow]",
        executionStepClassNames[executionStep],
        className
      )}
    >
      {kind === "trigger" && (
        <Badge
          variant="warning"
          size="small"
          className="absolute -top-6 left-0 rounded-lg"
        >
          <Zap className="size-2.5" aria-hidden />
          Trigger
        </Badge>
      )}

      <Badge
        aria-hidden
        variant="brand"
        size="small"
        className={cn(
          "absolute -top-6 right-0 rounded-lg opacity-0",
          styles.runningBadge
        )}
      >
        <Spinner className="size-2.5" />
        실행 중
      </Badge>

      <Badge
        aria-hidden
        variant="success"
        size="small"
        className={cn(
          "absolute -top-6 right-0 rounded-lg opacity-0",
          styles.doneBadge
        )}
      >
        <span aria-hidden>✓</span>
        완료
      </Badge>

      {kind === "action" && (
        <span className="absolute top-0 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-slate-400 shadow-sm" />
      )}

      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-lg",
            iconClassName
          )}
        >
          <Icon className="size-3.5" aria-hidden />
        </span>
        <span className="truncate text-sm font-medium">{label}</span>
      </div>

      {kind === "action" && (
        <p className="mt-2 truncate text-xs text-slate-400">
          {input || "입력값을 설정해 주세요."}
        </p>
      )}

      <span className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-white bg-slate-400 shadow-sm" />
    </div>
  );
};
