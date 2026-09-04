import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Spinner } from "@/components/ui/spinner";
import { workflowStepRegistry } from "@/features/workflows/nodes/workflow-step-registry";
import type { WorkflowStepNode } from "@/features/workflows/types";
import { cn } from "@/libs/utils";
import { useLatestRunSteps } from "@/features/workflows/hooks/use-latest-run-steps";

const WorkflowStepNodeRendererComponent = ({
  id,
  data,
  selected,
}: NodeProps<WorkflowStepNode>) => {
  const { steps, isLive } = useLatestRunSteps();
  const currentRunStep = steps.find((step) => step.nodeId === id);
  const isRunning = isLive && currentRunStep?.status === "running";
  const isDone = currentRunStep?.status === "done";
  const isFailed = currentRunStep?.status === "failed";
  const stepDefinition = workflowStepRegistry[data.type];
  const Icon = stepDefinition.icon;
  const showsTargetHandle = data.kind !== "trigger";
  const inputsWithValues = stepDefinition.inputs.filter(
    (input) => data.inputValues[input.key]
  );

  return (
    <div
      className={cn(
        "max-w-80 min-w-50 rounded-(--radius) border-2 border-border bg-card text-card-foreground",
        isRunning && "border-blue-500",
        isDone && "border-green-500",
        isFailed && "border-destructive",
        selected && "ring-2 ring-ring ring-offset-2 ring-offset-background"
      )}
    >
      {showsTargetHandle && (
        <Handle
          type="target"
          position={Position.Left}
          style={{ transform: "translate(-100%, -50%)" }}
          className="h-3.5! w-1.5! min-w-0! rounded-l-xs! rounded-r-none! border-0! bg-border!"
        />
      )}

      <div className="flex items-center gap-2.5 px-3 py-2.5">
        <div
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-md",
            stepDefinition.accent
          )}
        >
          {isRunning ? (
            <Spinner className="size-4" />
          ) : (
            <Icon className="size-4" />
          )}
        </div>
        <span className="text-sm font-semibold">{data.title}</span>
      </div>

      {inputsWithValues.length > 0 && (
        <>
          <div className="border-t border-border" />
          <div className="flex flex-col gap-1.5 px-3 py-2.5">
            {inputsWithValues.map((input) => (
              <div
                key={input.key}
                className="flex items-center justify-between gap-4 text-xs"
              >
                <span className="shrink-0 text-muted-foreground">
                  {input.label}
                </span>
                <span className="truncate font-medium">
                  {data.inputValues[input.key]}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      <Handle
        type="source"
        position={Position.Right}
        style={{ transform: "translate(100%, -50%)" }}
        className="h-3.5! w-1.5! min-w-0! rounded-l-none! rounded-r-xs! border-0! bg-border!"
      />
    </div>
  );
};

export const WorkflowStepNodeRenderer = memo(WorkflowStepNodeRendererComponent);
