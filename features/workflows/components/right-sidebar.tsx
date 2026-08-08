"use client";

import { useState } from "react";
import { ResizablePanel } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type StepNodeType } from "@/features/workflows/nodes/node-registry";
import { useStore } from "@xyflow/react";
import { Inspector } from "@/features/workflows/components/inspector";
import { ActionsMenu } from "@/features/workflows/components/actions-menu";
import { RunButton } from "@/features/workflows/components/run-button";
import { Palette } from "@/features/workflows/components/palette";

interface RightSidebarProps {
  workflowId: string;
}

export const RightSidebar = ({ workflowId }: RightSidebarProps) => {
  const [tab, setTab] = useState("toolbar");

  const nodes = useStore((state) => state.nodes);

  const selectedNode = nodes.find((node) => node.selected) as
    StepNodeType | undefined;

  const [prevSelectedId, setPrevSelectedId] = useState(selectedNode?.id);

  if (selectedNode && selectedNode.id !== prevSelectedId) {
    setPrevSelectedId(selectedNode.id);
    setTab("editor");
  }

  return (
    <ResizablePanel
      className="bg-background"
      defaultSize="16rem"
      minSize="14rem"
      maxSize="36rem"
      groupResizeBehavior="preserve-pixel-size"
    >
      <Tabs value={tab} onValueChange={setTab} className="size-full gap-0">
        <div className="flex items-center justify-between border-b border-border p-2">
          <ActionsMenu workflowId={workflowId} />
          <RunButton workflowId={workflowId} />
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
          <Palette />
        </TabsContent>
        <TabsContent value="editor" className="flex min-h-0 flex-col">
          <Inspector selectedNode={selectedNode} />
        </TabsContent>
      </Tabs>
    </ResizablePanel>
  );
};
