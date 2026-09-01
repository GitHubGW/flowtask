import { ERROR_MESSAGES } from "@/constants/error-messages";
import { interpolateWorkflowValues } from "@/features/workflows/libs/interpolate-workflow-values";
import { validateWorkflowGraph } from "@/features/workflows/libs/validate-workflow-graph";
import { nodeExecutors } from "@/features/workflows/nodes/node-executors";
import { getWorkflow } from "@/features/workflows/queries";
import { WorkflowGraph } from "@/libs/db/schema";
import { Stagehand } from "@browserbasehq/stagehand";
import { logger, task } from "@trigger.dev/sdk";
import toposort from "toposort";

interface RunWorkflowPayload {
  workflowId: string;
  organizationId: string;
  graph: WorkflowGraph;
}

export const runWorkflowTask = task({
  id: "run-workflow",
  run: async ({ workflowId, organizationId, graph }: RunWorkflowPayload) => {
    const errors = validateWorkflowGraph(graph);

    if (errors.length > 0) {
      const errorMessage = errors.join("\n");
      throw new Error(errorMessage);
    }

    const workflow = await getWorkflow(workflowId, organizationId);

    if (!workflow) {
      throw new Error(ERROR_MESSAGES.NO_WORKFLOW_FOUND);
    }

    const nodesById = new Map(graph.nodes.map((node) => [node.id, node]));
    const executionOrder = toposort(
      graph.edges.map((edge) => [edge.source, edge.target])
    );
    const outputs: Record<string, unknown> = {};

    let stagehand: Stagehand | undefined;
    let executedStepCount = 0;

    const getStagehand = async () => {
      if (stagehand) {
        return stagehand;
      }

      const BROWSERBASE_API_KEY = process.env.BROWSERBASE_API_KEY;

      if (!BROWSERBASE_API_KEY) {
        throw new Error("BROWSERBASE_API_KEY가 설정되지 않았습니다.");
      }

      stagehand = new Stagehand({
        env: "BROWSERBASE",
        apiKey: BROWSERBASE_API_KEY,
        model: "google/gemini-2.5-flash",
        disablePino: true,
      });

      await stagehand.init();
      return stagehand;
    };

    logger.log("워크플로우 실행 시작: ", {
      workflowId,
      nodeCount: executionOrder.length,
    });

    try {
      for (const nodeId of executionOrder) {
        const node = nodesById.get(nodeId);

        if (!node) {
          throw new Error(`그래프에서 노드를 찾을 수 없습니다: ${nodeId}`);
        }

        if (node.data.kind === "trigger") {
          continue;
        }

        const executor = nodeExecutors[node.data.type];

        if (!executor) {
          throw new Error(`노드 실행기를 찾을 수 없습니다: ${node.data.type}`);
        }

        logger.log("워크플로우 단계 실행: ", {
          workflowId,
          nodeId: node.id,
          nodeType: node.data.type,
          nodeTitle: node.data.title,
        });

        const interpolatedValues = Object.fromEntries(
          Object.entries(node.data.values).map(([key, value]) => [
            key,
            interpolateWorkflowValues(value, outputs),
          ])
        );

        outputs[node.id] = await executor({
          values: interpolatedValues,
          getStagehand,
        });

        executedStepCount += 1;
      }

      logger.log("워크플로우 실행 완료", {
        workflowId,
        executedStepCount,
      });
      return { executedStepCount };
    } finally {
      await stagehand?.close();
    }
  },
});
