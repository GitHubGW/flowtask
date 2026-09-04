import { cn } from "@/libs/utils";
import { workflowStepRegistry } from "@/features/workflows/nodes/workflow-step-registry";
import type { WorkflowStepType } from "@/features/workflows/types";

interface WorkflowStepIconProps {
  stepType: WorkflowStepType;
  className?: string;
}

export const WorkflowStepIcon = ({
  stepType,
  className,
}: WorkflowStepIconProps) => {
  const stepDefinition = workflowStepRegistry[stepType];
  const Icon = stepDefinition.icon;

  return (
    <div
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-md",
        stepDefinition.accent,
        className
      )}
    >
      <Icon className="size-3.5" />
    </div>
  );
};
