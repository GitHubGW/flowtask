import { ERROR_MESSAGES } from "@/constants/error-messages";
import { validateWorkflowGraph } from "@/features/workflows/libs/validate-workflow-graph";
import { getWorkflow } from "@/features/workflows/queries";
import { createRunStepTracker } from "@/features/workflows/tasks/run-workflow/create-run-step-tracker";
import { createStagehandSession } from "@/features/workflows/tasks/run-workflow/create-stagehand-session";
import { executeWorkflowStep } from "@/features/workflows/tasks/run-workflow/execute-workflow-step";
import type {
  WorkflowGraph,
  WorkflowNodeOutputs,
} from "@/features/workflows/types";
import { logger, task } from "@trigger.dev/sdk";
import toposort from "toposort";

interface RunWorkflowTaskPayload {
  workflowId: string;
  organizationId: string;
  graph: WorkflowGraph;
}

const assertValidWorkflowGraph = (graph: WorkflowGraph) => {
  const validationError = validateWorkflowGraph(graph);

  if (validationError) {
    throw new Error(validationError);
  }
};

const assertWorkflowExists = async (
  workflowId: string,
  organizationId: string
) => {
  const workflow = await getWorkflow(workflowId, organizationId);

  if (!workflow) {
    throw new Error(ERROR_MESSAGES.NO_WORKFLOW_FOUND);
  }
};

const getNodesInExecutionOrder = (graph: WorkflowGraph) => {
  const nodesById = new Map(graph.nodes.map((node) => [node.id, node]));

  const orderedNodeIds = toposort(
    graph.edges.map((edge) => [edge.source, edge.target])
  );

  return orderedNodeIds.map((nodeId) => {
    const node = nodesById.get(nodeId);

    if (!node) {
      throw new Error(`그래프에서 노드를 찾을 수 없습니다: ${nodeId}`);
    }

    return node;
  });
};

/**
 * 워크플로우 그래프의 스텝을 연결 순서대로 실행하는 Trigger.dev 태스크
 *
 * - 실행 중 스텝 상태를 Trigger.dev 메타데이터에 게시
 * - 완료 후 스텝 결과, 실행한 스텝 수, Browserbase 세션 ID를 반환
 */
export const runWorkflowTask = task({
  id: "run-workflow-task",
  run: async ({
    workflowId,
    organizationId,
    graph,
  }: RunWorkflowTaskPayload) => {
    assertValidWorkflowGraph(graph);
    await assertWorkflowExists(workflowId, organizationId);

    const orderedNodes = getNodesInExecutionOrder(graph);
    const { publish, update, getSteps } = createRunStepTracker(orderedNodes);
    const { getStagehand, closeStagehand, getBrowserbaseSessionId } =
      createStagehandSession(organizationId);

    const outputs: WorkflowNodeOutputs = {};
    let executedStepCount = 0;

    publish();

    logger.log("워크플로우 실행 시작", {
      workflowId,
      nodeCount: orderedNodes.length,
    });

    try {
      for (const node of orderedNodes) {
        logger.log("워크플로우 단계 실행", {
          workflowId,
          nodeId: node.id,
          nodeType: node.data.type,
          nodeTitle: node.data.title,
        });

        if (node.data.type === "start") {
          update(node.id, { status: "done" });
          continue;
        }

        await executeWorkflowStep({
          node,
          outputs,
          getStagehand,
          updateRunStep: update,
        });

        executedStepCount += 1;
      }

      logger.log("워크플로우 실행 완료", {
        workflowId,
        executedStepCount,
      });

      return {
        steps: getSteps(),
        executedStepCount,
        browserbaseSessionId: getBrowserbaseSessionId(),
      };
    } finally {
      await closeStagehand();
    }
  },
});
