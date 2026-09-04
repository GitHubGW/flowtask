import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { WorkflowPanelSection } from "@/features/workflows/components/editor/workflow-panel-section";
import { WorkflowStepIcon } from "@/features/workflows/components/shared/workflow-step-icon";
import { workflowStepRegistry } from "@/features/workflows/nodes/workflow-step-registry";
import type {
  WorkflowStepKind,
  WorkflowStepNode,
  WorkflowStepNodeData,
  WorkflowStepType,
} from "@/features/workflows/types";
import { useReactFlow, useStoreApi } from "@xyflow/react";
import { toast } from "sonner";

const WORKFLOW_STEP_CATEGORIES: { kind: WorkflowStepKind; label: string }[] = [
  { kind: "trigger", label: "트리거" },
  { kind: "action", label: "액션" },
];

const DEFAULT_EXPANDED_STEP_KINDS = WORKFLOW_STEP_CATEGORIES.map(
  (workflowStepCategory) => workflowStepCategory.kind
);

const WORKFLOW_STEP_DEFINITIONS = Object.values(workflowStepRegistry);

export const WorkflowNodePalette = () => {
  const store = useStoreApi<WorkflowStepNode>();
  const { getNodes, getViewport, addNodes } = useReactFlow<WorkflowStepNode>();

  const addNodeToCanvas = (stepType: WorkflowStepType) => {
    const { width, height } = store.getState();
    const { type, kind, label } = workflowStepRegistry[stepType];
    const workflowNodes = getNodes();
    const hasStartNode =
      type === "start" &&
      workflowNodes.some((workflowNode) => workflowNode.data.type === "start");

    if (hasStartNode) {
      toast.error("한 개의 시작(트리거) 노드만 추가할 수 있습니다.");
      return;
    }

    const { x, y, zoom } = getViewport();
    const newNodePosition = {
      x: (width / 2 - x) / zoom,
      y: (height / 2 - y) / zoom,
    };
    const nextNodeNumber =
      workflowNodes.filter(
        (workflowNode) => workflowNode.data.type === stepType
      ).length + 1;

    addNodes({
      type: "step",
      id: crypto.randomUUID(),
      position: newNodePosition,
      data: {
        type: stepType,
        kind,
        title: `${label} ${nextNodeNumber}`,
        inputValues: {},
      } as WorkflowStepNodeData,
    });
  };

  return (
    <WorkflowPanelSection title="툴바">
      <Accordion
        type="multiple"
        defaultValue={DEFAULT_EXPANDED_STEP_KINDS}
        className="px-3 py-2"
      >
        {WORKFLOW_STEP_CATEGORIES.map(({ kind, label: categoryLabel }) => {
          const stepDefinitionsInCategory = WORKFLOW_STEP_DEFINITIONS.filter(
            (stepDefinition) => stepDefinition.kind === kind
          );

          return (
            <AccordionItem
              key={kind}
              value={kind}
              className="not-last:border-b-0"
            >
              <AccordionTrigger className="py-2 text-sm font-medium text-muted-foreground hover:no-underline">
                {categoryLabel}
              </AccordionTrigger>

              <AccordionContent className="flex flex-col gap-0.5">
                {stepDefinitionsInCategory.map(({ type, label: stepLabel }) => (
                  <Button
                    key={type}
                    type="button"
                    variant="ghost"
                    onClick={() => addNodeToCanvas(type)}
                    className="justify-start gap-2.5 px-1.5 text-sm"
                  >
                    <WorkflowStepIcon stepType={type} />
                    {stepLabel}
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
