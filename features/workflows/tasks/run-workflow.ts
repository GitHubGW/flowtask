import { ERROR_MESSAGES } from "@/constants/error-messages";
import { interpolateWorkflowValues } from "@/features/workflows/libs/interpolate-workflow-values";
import { validateWorkflowGraph } from "@/features/workflows/libs/validate-workflow-graph";
import { workflowStepExecutors } from "@/features/workflows/nodes/workflow-step-executors";
import { getWorkflow } from "@/features/workflows/queries";
import type { WorkflowGraph } from "@/features/workflows/types";
import { Stagehand } from "@browserbasehq/stagehand";
import { logger, metadata, task } from "@trigger.dev/sdk";
import toposort from "toposort";

interface RunWorkflowPayload {
  workflowId: string;
  organizationId: string;
  graph: WorkflowGraph;
}

export type RunStep = {
  nodeId: string;
  status: "pending" | "running" | "done" | "failed";
};

export const runWorkflowTask = task({
  id: "run-workflow",
  run: async ({ workflowId, organizationId, graph }: RunWorkflowPayload) => {
    const validationError = validateWorkflowGraph(graph);

    if (validationError) {
      throw new Error(validationError);
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

    let steps: RunStep[] = executionOrder.flatMap((nodeId) => {
      const node = nodesById.get(nodeId);

      return node?.data.kind === "action"
        ? [{ nodeId, status: "pending" }]
        : [];
    });

    const updateStepStatus = (nodeId: string, status: RunStep["status"]) => {
      steps = steps.map((step) =>
        step.nodeId === nodeId ? { ...step, status } : step
      );
      metadata.set("steps", steps);
    };

    metadata.set("steps", steps);

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

        updateStepStatus(node.id, "running");
        await metadata.flush();

        try {
          const workflowStepExecutor = workflowStepExecutors[node.data.type];

          if (!workflowStepExecutor) {
            throw new Error(
              `노드 실행기를 찾을 수 없습니다: ${node.data.type}`
            );
          }

          logger.log("워크플로우 단계 실행: ", {
            workflowId,
            nodeId: node.id,
            nodeType: node.data.type,
            nodeTitle: node.data.title,
          });

          const interpolatedInputValues = Object.fromEntries(
            Object.entries(node.data.inputValues).map(([key, value]) => [
              key,
              interpolateWorkflowValues(value, outputs),
            ])
          );

          outputs[node.id] = await workflowStepExecutor({
            inputValues: interpolatedInputValues,
            getStagehand,
          });

          executedStepCount += 1;
          updateStepStatus(node.id, "done");
        } catch (error) {
          updateStepStatus(node.id, "failed");
          await metadata.flush();
          throw error;
        }
      }

      logger.log("워크플로우 실행 완료", {
        workflowId,
        executedStepCount,
      });
      return { executedStepCount, steps };
    } finally {
      await stagehand?.close();
    }
  },
});
