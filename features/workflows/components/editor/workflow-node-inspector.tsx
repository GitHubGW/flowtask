import { Label } from "@/components/ui/label";
import { WorkflowPanelSection } from "@/features/workflows/components/editor/workflow-panel-section";
import { WorkflowStepIcon } from "@/features/workflows/components/shared/workflow-step-icon";
import { WorkflowStepInputControl } from "@/features/workflows/components/editor/workflow-step-input-control";
import { workflowStepRegistry } from "@/features/workflows/nodes/workflow-step-registry";
import type { WorkflowStepNode } from "@/features/workflows/types";
import { useReactFlow } from "@xyflow/react";

interface WorkflowNodeInspectorProps {
  selectedNode: WorkflowStepNode | undefined;
  onInputFocus?: (inputKey: string) => void;
}

export const WorkflowNodeInspector = ({
  selectedNode,
  onInputFocus,
}: WorkflowNodeInspectorProps) => {
  const { updateNodeData } = useReactFlow<WorkflowStepNode>();

  if (!selectedNode) {
    return (
      <WorkflowPanelSection title="에디터">
        <p className="p-3 text-sm text-muted-foreground">
          선택된 노드가 없습니다
        </p>
      </WorkflowPanelSection>
    );
  }

  const { type, title, inputValues } = selectedNode.data;
  const stepDefinition = workflowStepRegistry[type];

  return (
    <WorkflowPanelSection
      title={title}
      icon={<WorkflowStepIcon stepType={type} />}
    >
      <div className="flex flex-col gap-3 p-3">
        {stepDefinition.inputs.length === 0 ? (
          <p className="text-xs text-muted-foreground">속성이 없습니다</p>
        ) : (
          stepDefinition.inputs.map((input) => (
            <div key={input.key} className="flex flex-col gap-1.5">
              <Label htmlFor={input.key} className="text-xs">
                {input.label}
                {input.required && <span className="text-red-500">*</span>}
              </Label>
              <WorkflowStepInputControl
                input={input}
                value={inputValues[input.key] ?? ""}
                onChange={(value) => {
                  updateNodeData(selectedNode.id, (node) => ({
                    inputValues: {
                      ...node.data.inputValues,
                      [input.key]: value,
                    },
                  }));
                }}
                onFocus={() => onInputFocus?.(input.key)}
              />
            </div>
          ))
        )}
      </div>
    </WorkflowPanelSection>
  );
};
