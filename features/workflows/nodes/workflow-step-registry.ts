import type {
  WorkflowStepDefinition,
  WorkflowStepType,
} from "@/features/workflows/types";
import { Globe, MousePointerClick, Pointer } from "lucide-react";

type WorkflowStepRegistry = {
  [K in WorkflowStepType]: WorkflowStepDefinition<K>;
};

export const workflowStepRegistry = {
  start: {
    type: "start",
    kind: "trigger",
    label: "Start",
    icon: MousePointerClick,
    accent: "bg-blue-500 text-white",
    inputs: [],
    outputs: [],
  },
  "open-url": {
    type: "open-url",
    kind: "action",
    label: "Open URL",
    icon: Globe,
    accent: "bg-emerald-500 text-white",
    inputs: [
      {
        key: "url",
        label: "URL",
        placeholder: "https://tailwindcss.com",
        required: true,
      },
    ],
    outputs: [
      { path: "title", label: "Title" },
      { path: "url", label: "URL" },
    ],
  },
  act: {
    type: "act",
    kind: "action",
    label: "Act",
    icon: Pointer,
    accent: "bg-violet-500 text-white",
    inputs: [
      {
        key: "instruction",
        label: "Instruction",
        placeholder: "Click the Get Started button",
        multiline: true,
        required: true,
      },
    ],
    outputs: [
      { path: "success", label: "Success" },
      { path: "message", label: "Message" },
      { path: "url", label: "URL" },
    ],
  },
} satisfies WorkflowStepRegistry;
