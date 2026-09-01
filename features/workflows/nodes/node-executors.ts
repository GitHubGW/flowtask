import type { Stagehand } from "@browserbasehq/stagehand";
import { openUrl } from "./open-url";
import {
  type ActionNodeType,
  type WorkflowNodeType,
} from "@/features/workflows/nodes/node-registry";

export interface NodeExecutorContext {
  values: Record<string, string>;
  getStagehand: () => Promise<Stagehand>;
}

export type NodeExecutor = (context: NodeExecutorContext) => Promise<unknown>;

export const nodeExecutors: Partial<Record<WorkflowNodeType, NodeExecutor>> = {
  "open-url": async ({ values, getStagehand }: NodeExecutorContext) => {
    const stagehand = await getStagehand();
    return openUrl({ url: values.url, stagehand });
  },
} satisfies Record<ActionNodeType, NodeExecutor>;
