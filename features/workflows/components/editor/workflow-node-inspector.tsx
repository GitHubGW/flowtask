import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  const { updateNodeData, deleteElements } = useReactFlow<WorkflowStepNode>();

  if (!selectedNode) {
    return (
      <WorkflowPanelSection title="에디터">
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
          <p className="text-sm font-medium text-slate-700">
            선택된 노드가 없어요
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            캔버스의 노드를 선택하면 설정을 편집할 수 있어요.
          </p>
        </div>
      </WorkflowPanelSection>
    );
  }

  const { type, title, inputValues, kind } = selectedNode.data;
  const stepDefinition = workflowStepRegistry[type];
  const nodeKindLabel = kind === "trigger" ? "Trigger" : "Action";
  const isDeletableNode = kind === "action";

  const handleDeleteNode = async () => {
    await deleteElements({ nodes: [{ id: selectedNode.id }] });
  };

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <div className="flex items-center gap-3 px-4 pt-5 pb-6">
        <WorkflowStepIcon
          stepType={type}
          className="size-10 rounded-xl [&_svg]:size-5"
        />
        <div className="min-w-0 flex-1">
          <Badge variant="secondary" size="small">
            {nodeKindLabel}
          </Badge>
          <h2 className="mt-1 truncate text-sm font-semibold text-slate-950">
            {title}
          </h2>
        </div>

        {isDeletableNode && (
          <Button
            variant="secondary"
            size="small"
            type="button"
            onClick={handleDeleteNode}
            className="border-slate-200 bg-white text-slate-900 shadow-xs hover:bg-slate-50 hover:text-slate-900"
          >
            삭제
          </Button>
        )}
      </div>

      <div className="px-4 pb-5">
        <h3 className="text-sm font-semibold text-slate-950">입력</h3>
        {stepDefinition.inputs.length === 0 ? (
          <p className="mt-3 text-xs text-slate-500">입력값이 없어요.</p>
        ) : (
          <div className="mt-4 flex flex-col gap-5">
            {stepDefinition.inputs.map((input) => (
              <div key={input.key} className="flex flex-col gap-2">
                <Label
                  htmlFor={input.key}
                  className="text-xs font-normal text-slate-500"
                >
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
