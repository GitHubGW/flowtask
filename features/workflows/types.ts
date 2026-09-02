import type { Edge, Node } from "@xyflow/react";
import type { LucideIcon } from "lucide-react";

export type WorkflowStepType = "start" | "open-url" | "act";

export type WorkflowStepKind = "trigger" | "action";

export type WorkflowStepKindByType = {
  start: "trigger";
  "open-url": "action";
  act: "action";
};

export type WorkflowActionStepType = {
  [K in WorkflowStepType]: WorkflowStepKindByType[K] extends "action"
    ? K
    : never;
}[WorkflowStepType];

export interface WorkflowStepInputDefinition {
  key: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  required?: boolean;
}

export interface WorkflowStepOutputDefinition {
  label: string;
  path: string;
}

export interface WorkflowStepDefinition<
  K extends WorkflowStepType = WorkflowStepType,
> {
  type: K;
  kind: WorkflowStepKindByType[K];
  label: string;
  icon: LucideIcon;
  accent: string;
  inputs: WorkflowStepInputDefinition[];
  outputs: WorkflowStepOutputDefinition[];
}

export type WorkflowStepNodeData = {
  [K in WorkflowStepType]: {
    type: K;
    kind: WorkflowStepKindByType[K];
    title: string;
    inputValues: Record<string, string>;
  };
}[WorkflowStepType];

export type WorkflowStepNode = Node<WorkflowStepNodeData, "step">;

export interface WorkflowGraph {
  nodes: WorkflowStepNode[];
  edges: Edge[];
}
