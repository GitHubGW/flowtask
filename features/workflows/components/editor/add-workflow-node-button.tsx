"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useReactFlow, useStoreApi } from "@xyflow/react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useProPlan } from "@/features/workflows/hooks/use-pro-plan";
import { workflowStepRegistry } from "@/features/workflows/nodes/workflow-step-registry";
import { ProPlanBadge } from "@/features/workflows/components/shared/pro-plan-badge";
import { WorkflowStepIcon } from "@/features/workflows/components/shared/workflow-step-icon";
import type {
  WorkflowStepNode,
  WorkflowStepNodeData,
  WorkflowStepType,
} from "@/features/workflows/types";

const ACTION_STEP_DEFINITIONS = Object.values(workflowStepRegistry).filter(
  (stepDefinition) => stepDefinition.kind === "action"
);

export const AddWorkflowNodeButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const store = useStoreApi<WorkflowStepNode>();
  const { getNodes, getViewport, addNodes } = useReactFlow<WorkflowStepNode>();
  const { isLoaded, hasProPlan, goToPricing } = useProPlan();

  const handleClose = () => {
    setIsOpen(false);
  };

  const addNodeToCanvas = (stepType: WorkflowStepType) => {
    if (stepType === "agent" && !hasProPlan) {
      setIsOpen(false);
      goToPricing();
      return;
    }

    const { width, height } = store.getState();
    const { kind, label } = workflowStepRegistry[stepType];
    const workflowNodes = getNodes();
    const { x, y, zoom } = getViewport();
    const bottomNode = workflowNodes.reduce<WorkflowStepNode | undefined>(
      (currentBottomNode, node) => {
        return !currentBottomNode ||
          node.position.y > currentBottomNode.position.y
          ? node
          : currentBottomNode;
      },
      undefined
    );
    const newNodePosition = bottomNode
      ? { x: bottomNode.position.x, y: bottomNode.position.y + 160 }
      : {
          x: (width / 2 - x) / zoom,
          y: (height / 2 - y) / zoom,
        };

    addNodes({
      type: "step",
      id: crypto.randomUUID(),
      position: newNodePosition,
      data: {
        type: stepType,
        kind,
        title: label,
        inputValues: {},
      } as WorkflowStepNodeData,
    });
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-8 rounded-lg border-transparent bg-slate-100 px-3 text-slate-700 shadow-none hover:bg-slate-200 hover:text-slate-900"
        >
          <Plus aria-hidden />
          추가
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 p-3">
        <PopoverHeader className="flex-row items-center justify-between">
          <PopoverTitle>Action 노드</PopoverTitle>
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            aria-label="닫기"
            onClick={handleClose}
            className="absolute top-2 right-2 text-slate-500 hover:text-slate-950"
          >
            <X aria-hidden />
          </Button>
        </PopoverHeader>

        <div className="flex flex-col gap-1">
          {ACTION_STEP_DEFINITIONS.map(({ type, label, description }) => {
            const isDisabled = type === "agent" && !isLoaded;
            const isAgentLocked = isLoaded && type === "agent" && !hasProPlan;

            return (
              <Button
                key={type}
                type="button"
                variant="ghost"
                disabled={isDisabled}
                onClick={() => addNodeToCanvas(type)}
                className="h-auto min-h-14 justify-start gap-3 rounded-lg px-2 py-2 text-left whitespace-normal text-slate-700 hover:bg-slate-100 hover:text-slate-950"
              >
                <WorkflowStepIcon stepType={type} />
                <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    {label}
                    {isAgentLocked && <ProPlanBadge />}
                  </span>
                  <span className="text-xs leading-5 font-normal text-slate-500">
                    {description}
                  </span>
                </span>
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
