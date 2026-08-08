import { Label } from "@/components/ui/label";
import { Field } from "@/features/workflows/components/field";
import { NodeIcon } from "@/features/workflows/components/node-icon";
import { Section } from "@/features/workflows/components/section";
import {
  nodeRegistry,
  type StepNodeType,
} from "@/features/workflows/nodes/node-registry";
import type { NodeDefinition } from "@/features/workflows/types";
import { useReactFlow } from "@xyflow/react";

interface InspectorProps {
  selectedNode: StepNodeType | undefined;
}

export const Inspector = ({ selectedNode }: InspectorProps) => {
  const { updateNodeData } = useReactFlow<StepNodeType>();

  if (!selectedNode) {
    return (
      <Section title="에디터">
        <p className="p-3 text-sm text-muted-foreground">
          선택된 노드가 없습니다
        </p>
      </Section>
    );
  }

  const { type, title, values } = selectedNode.data;
  const nodeDefinition: NodeDefinition = nodeRegistry[type];

  return (
    <Section title={title} icon={<NodeIcon type={type} />}>
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
              <Field
                field={field}
                value={values[field.key] ?? ""}
                onChange={(value) => {
                  updateNodeData(selectedNode.id, {
                    values: { ...values, [field.key]: value },
                  });
                }}
              />
            </div>
          ))
        )}
      </div>
    </Section>
  );
};
