import { Globe, MousePointerClick } from "lucide-react";
import type { Node } from "@xyflow/react";
import type { StepNodeKind, NodeDefinition } from "@/features/workflows/types";

export type WorkflowNodeType = keyof typeof nodeRegistry;

export type StepNodeData = {
  type: WorkflowNodeType;
  kind: StepNodeKind;
  title: string;
  values: Record<string, string>;
};

export type StepNodeType = Node<StepNodeData, "step">;

export type ActionNodeType = {
  [K in WorkflowNodeType]: (typeof nodeRegistry)[K]["kind"] extends "action"
    ? K
    : never;
}[WorkflowNodeType];

export const nodeRegistry = {
  start: {
    type: "start",
    kind: "trigger",
    label: "Start",
    icon: MousePointerClick,
    accent: "bg-blue-500 text-white",
    fields: [],
    outputs: [],
  },
  "open-url": {
    type: "open-url",
    kind: "action",
    label: "Open URL",
    icon: Globe,
    accent: "bg-emerald-500 text-white",
    fields: [
      {
        key: "url",
        label: "URL",
        placeholder: "https://youtube.com",
        required: true,
      },
    ],
    outputs: [
      { path: "title", label: "Title" },
      { path: "url", label: "URL" },
    ],
  },
} satisfies Record<string, NodeDefinition>;
