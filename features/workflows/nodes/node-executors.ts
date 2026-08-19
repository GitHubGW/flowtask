import type { Stagehand } from "@browserbasehq/stagehand";
import { openUrl } from "./open-url";
import {
  type ActionNodeType,
  type NodeType,
} from "@/features/workflows/nodes/node-registry";

export interface NodeContext {
  values: Record<string, string>;
  getStagehand: () => Promise<Stagehand>;
}

export type NodeExecutor = (context: NodeContext) => Promise<unknown>;

export const nodeExecutors: Partial<Record<NodeType, NodeExecutor>> = {
  "open-url": async ({ values, getStagehand }: NodeContext) => {
    return openUrl({ url: values.url, stagehand: await getStagehand() });
  },
} satisfies Record<ActionNodeType, NodeExecutor>;
