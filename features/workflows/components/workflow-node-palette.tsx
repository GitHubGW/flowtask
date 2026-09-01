import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { WorkflowNodeIcon } from "@/features/workflows/components/workflow-node-icon";
import { WorkflowPanelSection } from "@/features/workflows/components/workflow-panel-section";
import {
  nodeRegistry,
  type WorkflowNodeType,
  type StepNodeType,
} from "@/features/workflows/nodes/node-registry";
import type { StepNodeKind } from "@/features/workflows/types";
import { useReactFlow, useStoreApi } from "@xyflow/react";
import { toast } from "sonner";

const NODE_CATEGORIES: { kind: StepNodeKind; label: string }[] = [
  { kind: "trigger", label: "트리거" },
  { kind: "action", label: "액션" },
];

const DEFAULT_EXPANDED_NODE_CATEGORIES = NODE_CATEGORIES.map(
  (nodeCategory) => nodeCategory.kind
);

const NODE_DEFINITIONS = Object.values(nodeRegistry);

export const WorkflowNodePalette = () => {
  const { getNodes, getViewport, addNodes } = useReactFlow<StepNodeType>();
  const store = useStoreApi<StepNodeType>();

  const addNodeToCanvas = (nodeType: WorkflowNodeType) => {
    const { width, height } = store.getState();
    const { kind, label } = nodeRegistry[nodeType];
    const workflowNodes = getNodes();
    const hasTriggerNode =
      kind === "trigger" &&
      workflowNodes.some(
        (workflowNode) => workflowNode.data.kind === "trigger"
      );

    if (hasTriggerNode) {
      toast.error("한 개의 트리거 노드만 추가할 수 있습니다.");
      return;
    }

    const { x, y, zoom } = getViewport();
    const newNodePosition = {
      x: (width / 2 - x) / zoom,
      y: (height / 2 - y) / zoom,
    };
    const nextNodeNumber =
      workflowNodes.filter(
        (workflowNode) => workflowNode.data.type === nodeType
      ).length + 1;

    addNodes({
      type: "step",
      id: crypto.randomUUID(),
      position: newNodePosition,
      data: {
        type: nodeType,
        kind,
        title: `${label} ${nextNodeNumber}`,
        values: {},
      },
    });
  };

  return (
    <WorkflowPanelSection title="툴바">
      <Accordion
        type="multiple"
        defaultValue={DEFAULT_EXPANDED_NODE_CATEGORIES}
        className="px-3 py-2"
      >
        {NODE_CATEGORIES.map((nodeCategory) => {
          const categoryNodeDefinitions = NODE_DEFINITIONS.filter(
            (nodeDefinition) => nodeDefinition.kind === nodeCategory.kind
          );

          return (
            <AccordionItem
              key={nodeCategory.kind}
              value={nodeCategory.kind}
              className="not-last:border-b-0"
            >
              <AccordionTrigger className="py-2 text-sm font-medium text-muted-foreground hover:no-underline">
                {nodeCategory.label}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-0.5">
                {categoryNodeDefinitions.map((nodeDefinition) => (
                  <Button
                    key={nodeDefinition.type}
                    type="button"
                    variant="ghost"
                    onClick={() => addNodeToCanvas(nodeDefinition.type)}
                    className="justify-start gap-2.5 px-1.5 text-sm"
                  >
                    <WorkflowNodeIcon type={nodeDefinition.type} />
                    {nodeDefinition.label}
                  </Button>
                ))}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </WorkflowPanelSection>
  );
};
