import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { workflowStepRegistry } from "@/features/workflows/nodes/workflow-step-registry";
import type { WorkflowStepNode } from "@/features/workflows/types";
import { cn } from "@/libs/utils";
import { useLatestRunSteps } from "@/features/workflows/hooks/use-latest-run-steps";
import { Zap } from "lucide-react";

const WorkflowStepNodeRendererComponent = ({
  id,
  data,
  selected,
}: NodeProps<WorkflowStepNode>) => {
  const { steps, isLive } = useLatestRunSteps();
  const currentRunStep = steps.find((step) => step.nodeId === id);
  const stepDefinition = workflowStepRegistry[data.type];
  const Icon = stepDefinition.icon;
  const isRunning = isLive && currentRunStep?.status === "running";
  const isDone = currentRunStep?.status === "done";
  const isFailed = currentRunStep?.status === "failed";
  const showsTargetHandle = data.kind !== "trigger";
  const isTrigger = data.kind === "trigger";
  const isAction = data.kind === "action";
  const displayTitle = isTrigger ? stepDefinition.label : data.title;
  const inputSummary = stepDefinition.inputs
    .map((input) => data.inputValues[input.key]?.trim())
    .find(Boolean);

  return (
    <div
      className={cn(
        "relative w-72 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-slate-950 shadow-sm transition-[border-color,box-shadow]",
        isRunning && "border-violet-400",
        isDone && "border-emerald-500",
        isFailed && "border-destructive",
        selected && "border-violet-500 ring-2 ring-violet-100"
      )}
    >
      {isTrigger && (
        <Badge
          variant="warning"
          size="medium"
          className="absolute -top-7 left-0 rounded-lg"
        >
          <Zap className="size-3" aria-hidden />
          Trigger
        </Badge>
      )}

      {isRunning && (
        <Badge
          variant="brand"
          size="medium"
          className="absolute -top-7 right-0 rounded-lg"
        >
          <Spinner className="size-3" />
          실행 중
        </Badge>
      )}

      {isDone && (
        <Badge
          variant="success"
          size="medium"
          className="absolute -top-7 right-0 rounded-lg"
        >
          <span aria-hidden>✓</span>
          완료
        </Badge>
      )}

      {isFailed && (
        <Badge
          variant="destructive"
          size="medium"
          className="absolute -top-7 right-0 rounded-lg"
        >
          <span aria-hidden>×</span>
          실패
        </Badge>
      )}

      {showsTargetHandle && (
        <Handle
          type="target"
          position={Position.Top}
          className="size-2.5! min-w-0! border-2! border-white! bg-slate-400! shadow-sm!"
        />
      )}

      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-lg",
            stepDefinition.accent
          )}
        >
          <Icon className="size-3.5" />
        </div>
        <p className="truncate text-sm font-medium">{displayTitle}</p>
      </div>
      {isAction && (
        <p className="mt-2 truncate text-xs text-slate-400">
          {inputSummary || "입력값을 설정해 주세요."}
        </p>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="size-2.5! min-w-0! border-2! border-white! bg-slate-400! shadow-sm!"
      />
    </div>
  );
};

export const WorkflowStepNodeRenderer = memo(WorkflowStepNodeRendererComponent);
