import { WORKFLOW_ERROR_MESSAGES } from "@/features/workflows/constants/workflow-error-messages";
import { WORKFLOW_LOG_EVENTS } from "@/features/workflows/constants/workflow-log-events";
import { WORKFLOW_TASK_ID } from "@/features/workflows/constants/workflow-trigger";
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
    throw new Error(WORKFLOW_ERROR_MESSAGES.WORKFLOW_NOT_FOUND);
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
      throw new Error(WORKFLOW_ERROR_MESSAGES.GRAPH_NODE_NOT_FOUND);
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
  id: WORKFLOW_TASK_ID,
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

    logger.log(WORKFLOW_LOG_EVENTS.RUN_STARTED.message, {
      "event.name": WORKFLOW_LOG_EVENTS.RUN_STARTED.name,
      workflowId,
      nodeCount: orderedNodes.length,
    });

    try {
      for (const node of orderedNodes) {
        logger.log(WORKFLOW_LOG_EVENTS.STEP_STARTED.message, {
          "event.name": WORKFLOW_LOG_EVENTS.STEP_STARTED.name,
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

      logger.log(WORKFLOW_LOG_EVENTS.RUN_COMPLETED.message, {
        "event.name": WORKFLOW_LOG_EVENTS.RUN_COMPLETED.name,
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
