import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import {
  nodeRegistry,
  type StepNodeType,
} from "@/features/workflows/nodes/node-registry";
import { cn } from "@/libs/utils";

const WorkflowStepNodeComponent = ({
  data,
  selected,
}: NodeProps<StepNodeType>) => {
  const nodeDefinition = nodeRegistry[data.type];
  const Icon = nodeDefinition.icon;
  const showsTargetHandle = data.kind !== "trigger";
  const filteredNodeFields = nodeDefinition.fields.filter(
    (field) => data.values[field.key]
  );

  return (
    <div
      className={cn(
        "max-w-80 min-w-50 rounded-(--radius) border-2 border-border bg-card text-card-foreground",
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
            nodeDefinition.accent
          )}
        >
          <Icon className="size-4" />
        </div>
        <span className="text-sm font-semibold">{data.title}</span>
      </div>

      {filteredNodeFields.length > 0 && (
        <>
          <div className="border-t border-border" />
          <div className="flex flex-col gap-1.5 px-3 py-2.5">
            {filteredNodeFields.map((field) => (
              <div
                key={field.key}
                className="flex items-center justify-between gap-4 text-xs"
              >
                <span className="shrink-0 text-muted-foreground">
                  {field.label}
                </span>
                <span className="truncate font-medium">
                  {data.values[field.key]}
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

export const WorkflowStepNode = memo(WorkflowStepNodeComponent);
