"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { workflowStepRegistry } from "@/features/workflows/nodes/workflow-step-registry";
import type { WorkflowStepNode } from "@/features/workflows/types";
import {
  useNodes,
  useReactFlow,
  useOnSelectionChange,
  type OnSelectionChangeFunc,
} from "@xyflow/react";
import { useUpstreamOutputOptions } from "@/features/workflows/hooks/use-upstream-output-options";
import { RunWorkflowButton } from "@/features/workflows/components/run-workflow-button";
import { WorkflowNodePalette } from "@/features/workflows/components/workflow-node-palette";
import { WorkflowNodeInspector } from "@/features/workflows/components/workflow-node-inspector";
import { WorkflowActionsMenu } from "@/features/workflows/components/workflow-actions-menu";
import { WorkflowStepIcon } from "@/features/workflows/components/workflow-step-icon";

export const WorkflowEditorSidebar = () => {
  const [activeTab, setActiveTab] = useState("toolbar");
  const [lastFocusedInput, setLastFocusedInput] = useState<
    Record<string, string>
  >({});
  const { updateNodeData } = useReactFlow<WorkflowStepNode>();
  const workflowNodes = useNodes<WorkflowStepNode>();
  const selectedNode = workflowNodes.find((node) => node.selected);
  const upstreamOutputOptions = useUpstreamOutputOptions(selectedNode);

  const handleNodeSelectionChange = useCallback<
    OnSelectionChangeFunc<WorkflowStepNode>
  >(({ nodes }) => {
    if (nodes.length > 0) {
      setActiveTab("editor");
    }
  }, []);

  useOnSelectionChange<WorkflowStepNode>({
    onChange: handleNodeSelectionChange,
  });

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
    <aside className="size-full min-h-0">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="size-full gap-0"
      >
        <div className="flex items-center justify-between border-b border-border p-2">
          <WorkflowActionsMenu />
          <RunWorkflowButton />
        </div>
        <TabsList className="m-2 w-fit bg-background">
          <TabsTrigger
            value="toolbar"
            className="flex-none rounded-sm data-active:bg-accent! data-active:text-accent-foreground! data-active:shadow-none! dark:data-active:border-transparent!"
          >
            툴바
          </TabsTrigger>
          <TabsTrigger
            value="editor"
            className="flex-none rounded-sm data-active:bg-accent! data-active:text-accent-foreground! data-active:shadow-none! dark:data-active:border-transparent!"
          >
            에디터
          </TabsTrigger>
        </TabsList>
        <TabsContent value="toolbar" className="flex min-h-0 flex-col">
          <WorkflowNodePalette />
        </TabsContent>
        <TabsContent value="editor" className="flex min-h-0 flex-col">
          <div className="shrink-0">
            <WorkflowNodeInspector
              selectedNode={selectedNode}
              onInputFocus={handleInputFocus}
            />
          </div>
          {upstreamOutputOptions.length > 0 && (
            <div className="shrink-0 border-t border-border">
              <div className="bg-card px-3 py-1.5 text-sm font-semibold">
                연결
              </div>
              <div className="flex max-h-80 flex-wrap gap-1.5 overflow-y-auto p-3">
                {upstreamOutputOptions.map(({ stepType, label, token }) => (
                  <Button
                    key={token}
                    type="button"
                    variant="outline"
                    size="sm"
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
        </TabsContent>
      </Tabs>
    </aside>
  );
};
