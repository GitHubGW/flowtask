import { Label } from "@/components/ui/label";
import { NodeFieldControl } from "@/features/workflows/components/node-field-control";
import { WorkflowNodeIcon } from "@/features/workflows/components/workflow-node-icon";
import { WorkflowPanelSection } from "@/features/workflows/components/workflow-panel-section";
import {
  nodeRegistry,
  type StepNodeType,
} from "@/features/workflows/nodes/node-registry";
import { useReactFlow } from "@xyflow/react";

interface WorkflowNodeInspectorProps {
  selectedNode: StepNodeType | undefined;
  onFieldFocus?: (fieldKey: string) => void;
}

export const WorkflowNodeInspector = ({
  selectedNode,
  onFieldFocus,
}: WorkflowNodeInspectorProps) => {
  const { updateNodeData } = useReactFlow<StepNodeType>();

  if (!selectedNode) {
    return (
      <WorkflowPanelSection title="에디터">
        <p className="p-3 text-sm text-muted-foreground">
          선택된 노드가 없습니다
        </p>
      </WorkflowPanelSection>
    );
  }

  const { type, title, values } = selectedNode.data;
  const nodeDefinition = nodeRegistry[type];

  return (
    <WorkflowPanelSection title={title} icon={<WorkflowNodeIcon type={type} />}>
      <div className="flex flex-col gap-3 p-3">
        {nodeDefinition.fields.length === 0 ? (
          <p className="text-xs text-muted-foreground">속성이 없습니다</p>
        ) : (
          nodeDefinition.fields.map((field) => (
            <div key={field.key} className="flex flex-col gap-1.5">
              <Label htmlFor={field.key} className="text-xs">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </Label>
              <NodeFieldControl
                field={field}
                value={values[field.key] ?? ""}
                onChange={(value) => {
                  updateNodeData(selectedNode.id, (node) => ({
                    values: { ...node.data.values, [field.key]: value },
                  }));
                }}
                onFocus={() => onFieldFocus?.(field.key)}
              />
            </div>
          ))
        )}
      </div>
    </WorkflowPanelSection>
  );
};
