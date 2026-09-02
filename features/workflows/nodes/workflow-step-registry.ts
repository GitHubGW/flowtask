import type {
  WorkflowStepDefinition,
  WorkflowStepType,
} from "@/features/workflows/types";
import {
  Bot,
  Eye,
  Globe,
  Mail,
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
      { label: "Title", path: "title" },
      { label: "URL", path: "url" },
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
      { label: "Success", path: "success" },
      { label: "Message", path: "message" },
      { label: "URL", path: "url" },
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
      { label: "Success", path: "success" },
      { label: "Message", path: "message" },
      { label: "Completed", path: "completed" },
    ],
  },
  "send-email": {
    type: "send-email",
    kind: "action",
    label: "Send Email",
    icon: Mail,
    accent: "bg-teal-500 text-white",
    inputs: [
      {
        key: "to",
        label: "To",
        placeholder: "test@gmail.com",
        required: true,
      },
      {
        key: "subject",
        label: "Subject",
        placeholder: "Hello, world!",
        required: true,
      },
      {
        key: "html",
        label: "HTML",
        placeholder: "Write your message",
        required: true,
        multiline: true,
      },
    ],
    outputs: [{ label: "Email ID", path: "id" }],
  },
} satisfies WorkflowStepRegistry;
