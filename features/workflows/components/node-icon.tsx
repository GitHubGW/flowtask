import { cn } from "@/libs/utils";
import {
  nodeRegistry,
  type NodeType,
} from "@/features/workflows/nodes/node-registry";

interface NodeIconProps {
  type: NodeType;
  className?: string;
}

export const NodeIcon = ({ type, className }: NodeIconProps) => {
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
