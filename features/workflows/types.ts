import type { LucideIcon } from "lucide-react";

export type StepNodeKind = "trigger" | "action";

export interface NodeField {
  key: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  required?: boolean;
}

export interface NodeDefinition {
  type: string;
  kind: StepNodeKind;
  label: string;
  icon: LucideIcon;
  accent: string;
  fields: NodeField[];
}
