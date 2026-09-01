import { cn } from "@/libs/utils";
import {
  nodeRegistry,
  type WorkflowNodeType,
} from "@/features/workflows/nodes/node-registry";

interface WorkflowNodeIconProps {
  type: WorkflowNodeType;
  className?: string;
}

export const WorkflowNodeIcon = ({
  type,
  className,
}: WorkflowNodeIconProps) => {
  const nodeDefinition = nodeRegistry[type];
  const Icon = nodeDefinition.icon;

  return (
    <div
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-md",
        nodeDefinition.accent,
        className
      )}
    >
      <Icon className="size-3.5" />
    </div>
  );
};
