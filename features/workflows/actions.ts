"use server";

import { ERROR_MESSAGES } from "@/constants/error-messages";
import { REVALIDATION_PATHS } from "@/constants/revalidation-paths";
import { createInitialWorkflowGraph } from "@/features/workflows/libs/create-initial-workflow-graph";
import {
  createWorkflow,
  deleteWorkflow,
  updateWorkflowGraph,
} from "@/features/workflows/queries";
import type { runWorkflowTask } from "@/features/workflows/tasks/run-workflow/run-workflow-task";
import type {
  WorkflowGraph,
  WorkflowStepNode,
} from "@/features/workflows/types";
import { liveblocks } from "@/libs/liveblocks";
import { auth } from "@clerk/nextjs/server";
import * as Sentry from "@sentry/nextjs";
import { runs, tasks } from "@trigger.dev/sdk";
import { revalidatePath } from "next/cache";
import { mutateFlow } from "@liveblocks/react-flow/node";
import type { Edge } from "@xyflow/react";
import { createWorkflowName } from "@/features/workflows/libs/create-workflow-name";

/**
 * 워크플로우 생성
 *
 * @returns 생성된 워크플로우 ID
 */
export const createWorkflowAction = async () => {
  const { orgId } = await auth();

  if (!orgId) {
    throw new Error(ERROR_MESSAGES.NO_ORGANIZATION_FOUND);
  }

  const workflowName = createWorkflowName();
  const initialGraph = createInitialWorkflowGraph();
  const createdWorkflow = await createWorkflow({
    workflowName,
    organizationId: orgId,
    graph: initialGraph,
  });
  await liveblocks.createRoom(createdWorkflow.id, {
    organizationId: orgId,
    defaultAccesses: [],
    groupsAccesses: { [orgId]: ["room:write"] },
    metadata: { title: createdWorkflow.name },
  });
  await mutateFlow<WorkflowStepNode, Edge>(
    { client: liveblocks, roomId: createdWorkflow.id },
    (flow) => {
      flow.addNodes(initialGraph.nodes);
      flow.addEdges(initialGraph.edges);
    }
  );

  revalidatePath(REVALIDATION_PATHS.WORKFLOWS_LAYOUT, "layout");

  Sentry.logger.info("워크플로우 생성", {
    "workflow.id": createdWorkflow.id,
    "organization.id": orgId,
  });

  return { workflowId: createdWorkflow.id };
};

/**
 * 워크플로우 삭제
 *
 * @param workflowId 워크플로우 ID
 */
export const deleteWorkflowAction = async (workflowId: string) => {
  const { orgId } = await auth();

  if (!orgId) {
    throw new Error(ERROR_MESSAGES.NO_ORGANIZATION_FOUND);
  }

  const deletedWorkflow = await deleteWorkflow(workflowId, orgId);

  if (!deletedWorkflow) {
    throw new Error(ERROR_MESSAGES.NO_WORKFLOW_FOUND);
  }

  await liveblocks.deleteRoom(deletedWorkflow.id);

  revalidatePath(REVALIDATION_PATHS.WORKFLOWS_LAYOUT, "layout");

  Sentry.logger.info("워크플로우 삭제", {
    "workflow.id": deletedWorkflow.id,
    "organization.id": orgId,
  });
};

/**
 * 워크플로우 실행
 *
 * @param workflowId 워크플로우 ID
 * @param graph 워크플로우 그래프
 * @returns 실행 작업 핸들
 */
export const runWorkflowAction = async (
  workflowId: string,
  graph: WorkflowGraph
) => {
  const { orgId, has } = await auth();

  if (!orgId) {
    throw new Error(ERROR_MESSAGES.NO_ORGANIZATION_FOUND);
  }

  const usesAgentNode = graph.nodes.some((node) => node.data.type === "agent");

  if (usesAgentNode && !has({ plan: "pro" })) {
    throw new Error(ERROR_MESSAGES.PRO_PLAN_REQUIRED);
  }

  const updatedWorkflow = await updateWorkflowGraph({
    workflowId,
    organizationId: orgId,
    graph,
  });

  if (!updatedWorkflow) {
    throw new Error(ERROR_MESSAGES.NO_WORKFLOW_FOUND);
  }

  const handle = await tasks.trigger<typeof runWorkflowTask>(
    "run-workflow-task",
    { workflowId, organizationId: orgId, graph },
    { tags: [`workflow:${workflowId}`, `organization:${orgId}`] }
  );

  Sentry.logger.info("워크플로우 실행 트리거", {
    "workflow.id": workflowId,
    "organization.id": orgId,
    "trigger.run_id": handle.id,
    "workflow.node_count": graph.nodes.length,
  });

  return handle;
};

/**
 * 워크플로우 실행 취소
 *
 * @param runId 실행 ID
 */
export const cancelWorkflowAction = async (runId: string) => {
  const { orgId } = await auth();

  if (!orgId) {
    throw new Error(ERROR_MESSAGES.NO_ORGANIZATION_FOUND);
  }

  const run = await runs.retrieve(runId);
  const hasOrganizationTag = run.tags.includes(`organization:${orgId}`);

  if (!hasOrganizationTag) {
    throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
  }

  await runs.cancel(runId);

  Sentry.logger.info("워크플로우 실행 취소", {
    "trigger.run_id": runId,
    "organization.id": orgId,
  });
};
