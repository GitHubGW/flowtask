import { Globe, MousePointerClick } from "lucide-react";
import type { Node } from "@xyflow/react";
import type { StepNodeKind, NodeDefinition } from "@/features/workflows/types";

export type NodeType = keyof typeof nodeRegistry;

export type StepNodeData = {
  type: NodeType;
  kind: StepNodeKind;
  title: string;
  values: Record<string, string>;
};

export type StepNodeType = Node<StepNodeData, "step">;

export type ActionNodeType = {
  [K in NodeType]: (typeof nodeRegistry)[K]["kind"] extends "action"
    ? K
    : never;
}[NodeType];

export const nodeRegistry = {
  start: {
    type: "start",
    kind: "trigger",
    label: "Start",
    icon: MousePointerClick,
    accent: "bg-blue-500 text-white",
    fields: [],
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
  },
} satisfies Record<string, NodeDefinition>;
