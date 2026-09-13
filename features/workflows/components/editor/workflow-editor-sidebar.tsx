"use client";

import { type Edge, useEdges, useNodes, useReactFlow } from "@xyflow/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { AddWorkflowNodeButton } from "@/features/workflows/components/editor/add-workflow-node-button";
import { WorkflowEdgeInspector } from "@/features/workflows/components/editor/workflow-edge-inspector";
import { WorkflowNodeInspector } from "@/features/workflows/components/editor/workflow-node-inspector";
import { WorkflowRunToggleButton } from "@/features/workflows/components/editor/workflow-run-toggle-button";
import { WorkflowStepIcon } from "@/features/workflows/components/shared/workflow-step-icon";
import { useUpstreamOutputOptions } from "@/features/workflows/hooks/use-upstream-output-options";
import { workflowStepRegistry } from "@/features/workflows/nodes/workflow-step-registry";
import type { WorkflowStepNode } from "@/features/workflows/types";

export const WorkflowEditorSidebar = () => {
  const [lastFocusedInput, setLastFocusedInput] = useState<
    Record<string, string>
  >({});
  const { updateNodeData } = useReactFlow<WorkflowStepNode>();
  const workflowNodes = useNodes<WorkflowStepNode>();
  const workflowEdges = useEdges<Edge>();
  const selectedNode = workflowNodes.find((node) => node.selected);
  const selectedEdge = workflowEdges.find((edge) => edge.selected);
  const upstreamOutputOptions = useUpstreamOutputOptions(selectedNode);

  const handleInputFocus = (inputKey: string) => {
    if (!selectedNode) {
      return;
    }

    setLastFocusedInput((currentInput) => ({
      ...currentInput,
      [selectedNode.id]: inputKey,
    }));
  };

  const handleInsertOutputToken = (token: string) => {
    if (!selectedNode) {
      return;
    }

    const inputs = workflowStepRegistry[selectedNode.data.type].inputs;
    const lastInputKey = lastFocusedInput[selectedNode.id];
    const inputKey = inputs.some((input) => input.key === lastInputKey)
      ? lastInputKey
      : inputs[0]?.key;

    if (!inputKey) {
      return;
    }

    updateNodeData(selectedNode.id, (node) => {
      const currentValue = node.data.inputValues[inputKey] ?? "";
      const separator = currentValue && !/\s$/.test(currentValue) ? " " : "";

      return {
        inputValues: {
          ...node.data.inputValues,
          [inputKey]: `${currentValue}${separator}${token}`,
        },
      };
    });
  };

  return (
    <aside className="flex size-full min-h-0 flex-col border-l border-slate-200 bg-white">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 px-3">
        <AddWorkflowNodeButton />
        <WorkflowRunToggleButton />
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        {selectedEdge ? (
          <WorkflowEdgeInspector
            selectedEdge={selectedEdge}
            workflowNodes={workflowNodes}
          />
        ) : (
          <WorkflowNodeInspector
            selectedNode={selectedNode}
            onInputFocus={handleInputFocus}
          />
        )}
        {!selectedEdge && upstreamOutputOptions.length > 0 && (
          <div className="shrink-0 border-t border-slate-200">
            <div className="px-4 py-3 text-xs font-semibold text-slate-700">
              연결
            </div>
            <div className="flex max-h-80 flex-wrap gap-2 overflow-y-auto px-4 pb-4">
              {upstreamOutputOptions.map(({ stepType, label, token }) => (
                <Button
                  variant="secondary"
                  size="small"
                  key={token}
                  type="button"
                  title={token}
                  onClick={() => handleInsertOutputToken(token)}
                  className="h-auto max-w-full justify-start py-1"
                >
                  <WorkflowStepIcon
                    stepType={stepType}
                    className="size-4 rounded-sm"
                  />
                  <span className="truncate">{label}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
