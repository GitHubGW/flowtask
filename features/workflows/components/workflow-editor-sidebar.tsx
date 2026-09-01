"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  nodeRegistry,
  type StepNodeType,
} from "@/features/workflows/nodes/node-registry";
import {
  useNodes,
  useReactFlow,
  useOnSelectionChange,
  type OnSelectionChangeFunc,
} from "@xyflow/react";
import { WorkflowNodeIcon } from "@/features/workflows/components/workflow-node-icon";
import { useUpstreamOutputOptions } from "@/features/workflows/hooks/use-upstream-output-options";
import { RunWorkflowButton } from "@/features/workflows/components/run-workflow-button";
import { WorkflowNodePalette } from "@/features/workflows/components/workflow-node-palette";
import { WorkflowNodeInspector } from "@/features/workflows/components/workflow-node-inspector";
import { WorkflowActionsMenu } from "@/features/workflows/components/workflow-actions-menu";

type LastFocusedField = Record<string, string>;

export const WorkflowEditorSidebar = () => {
  const [activeTab, setActiveTab] = useState("toolbar");
  const [lastFocusedField, setLastFocusedField] = useState<LastFocusedField>(
    {}
  );
  const { updateNodeData } = useReactFlow<StepNodeType>();
  const workflowNodes = useNodes<StepNodeType>();
  const selectedNode = workflowNodes.find((node) => node.selected);
  const upstreamOutputOptions = useUpstreamOutputOptions(selectedNode);

  const handleNodeSelectionChange = useCallback<
    OnSelectionChangeFunc<StepNodeType>
  >(({ nodes }) => {
    if (nodes.length > 0) {
      setActiveTab("editor");
    }
  }, []);

  useOnSelectionChange<StepNodeType>({ onChange: handleNodeSelectionChange });

  const handleFieldFocus = (fieldKey: string) => {
    if (!selectedNode) {
      return;
    }

    setLastFocusedField((currentField) => ({
      ...currentField,
      [selectedNode.id]: fieldKey,
    }));
  };

  const handleInsertOutputToken = (token: string) => {
    if (!selectedNode) {
      return;
    }

    const fields = nodeRegistry[selectedNode.data.type].fields;
    const lastFieldKey = lastFocusedField[selectedNode.id];
    const fieldKey = fields.some((field) => field.key === lastFieldKey)
      ? lastFieldKey
      : fields[0]?.key;

    if (!fieldKey) {
      return;
    }

    updateNodeData(selectedNode.id, (node) => {
      const currentValue = node.data.values[fieldKey] ?? "";
      const separator = currentValue && !/\s$/.test(currentValue) ? " " : "";

      return {
        values: {
          ...node.data.values,
          [fieldKey]: `${currentValue}${separator}${token}`,
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
              onFieldFocus={handleFieldFocus}
            />
          </div>
          {upstreamOutputOptions.length > 0 && (
            <div className="shrink-0 border-t border-border">
              <div className="bg-card px-3 py-1.5 text-sm font-semibold">
                연결
              </div>
              <div className="flex max-h-80 flex-wrap gap-1.5 overflow-y-auto p-3">
                {upstreamOutputOptions.map((outputOption) => (
                  <Button
                    key={outputOption.token}
                    type="button"
                    variant="outline"
                    size="sm"
                    title={outputOption.token}
                    onClick={() => handleInsertOutputToken(outputOption.token)}
                    className="h-auto max-w-full justify-start py-1"
                  >
                    <WorkflowNodeIcon
                      type={outputOption.type}
                      className="size-4 rounded-sm"
                    />
                    <span className="truncate">{outputOption.label}</span>
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
