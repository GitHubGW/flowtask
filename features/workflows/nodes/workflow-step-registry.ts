import type {
  WorkflowStepDefinition,
  WorkflowStepType,
} from "@/features/workflows/types";
import {
  Bot,
  Eye,
  Globe,
  MousePointerClick,
  Pointer,
  ScanText,
} from "lucide-react";

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
  extract: {
    type: "extract",
    kind: "action",
    label: "Extract",
    icon: ScanText,
    accent: "bg-amber-500 text-white",
    inputs: [
      {
        key: "instruction",
        label: "Instruction",
        placeholder: "Extract the product price",
        multiline: true,
        required: true,
      },
    ],
    outputs: [{ label: "Extraction", path: "extraction" }],
  },
  observe: {
    type: "observe",
    kind: "action",
    label: "Observe",
    icon: Eye,
    accent: "bg-sky-500 text-white",
    inputs: [
      {
        key: "instruction",
        label: "Instruction",
        placeholder: "Find the sign in button",
        multiline: true,
        required: true,
      },
    ],
    outputs: [
      { label: "Selector", path: "matches[0].selector" },
      { label: "Description", path: "matches[0].description" },
      { label: "Matches", path: "matches" },
    ],
  },
  agent: {
    type: "agent",
    kind: "action",
    label: "Agent",
    icon: Bot,
    accent: "bg-rose-500 text-white",
    inputs: [
      {
        key: "instruction",
        label: "Instruction",
        placeholder: "Search for the stock price of NVDA",
        multiline: true,
        required: true,
      },
    ],
    outputs: [
      { path: "success", label: "Success" },
      { path: "message", label: "Message" },
      { path: "completed", label: "Completed" },
    ],
  },
} satisfies WorkflowStepRegistry;
