import { validateWorkflowGraph } from "@/features/workflows/libs/validate-workflow-graph";
import type { WorkflowGraph } from "@/features/workflows/types";
import { db } from "@/libs/db";
import { workflows } from "@/libs/db/schema";
import { and, asc, eq } from "drizzle-orm";

/**
 * 조직에 속한 워크플로우 목록 조회
 *
 * @param organizationId - 조직 ID
 * @returns 워크플로우 목록
 */
export const getWorkflows = (organizationId: string) => {
  return db
    .select({ id: workflows.id, name: workflows.name })
    .from(workflows)
    .where(eq(workflows.organizationId, organizationId))
    .orderBy(asc(workflows.createdAt));
};

/**
 * 조직에 속한 워크플로우 조회
 *
 * @param workflowId - 워크플로우 ID
 * @param organizationId - 조직 ID
 * @returns 워크플로우
 */
export const getWorkflow = async (
  workflowId: string,
  organizationId: string
) => {
  const [workflow] = await db
    .select()
    .from(workflows)
    .where(
      and(
        eq(workflows.id, workflowId),
        eq(workflows.organizationId, organizationId)
      )
    )
    .limit(1);
  return workflow;
};

/**
 * 새로운 워크플로우 생성
 *
 * @param workflowName - 워크플로우 이름
 * @param organizationId - 조직 ID
 * @returns 생성된 워크플로우
 */
export const createWorkflow = async (
  workflowName: string,
  organizationId: string
) => {
  const [createdWorkflow] = await db
    .insert(workflows)
    .values({ name: workflowName, organizationId })
    .returning();
  return createdWorkflow;
};

/**
 * 워크플로우 삭제
 *
 * @param workflowId - 워크플로우 ID
 * @param organizationId - 조직 ID
 * @returns 삭제된 워크플로우
 */
export const deleteWorkflow = async (
  workflowId: string,
  organizationId: string
) => {
  const [deletedWorkflow] = await db
    .delete(workflows)
    .where(
      and(
        eq(workflows.id, workflowId),
        eq(workflows.organizationId, organizationId)
      )
    )
    .returning({ id: workflows.id });
  return deletedWorkflow;
};

interface UpdateWorkflowGraphParams {
  workflowId: string;
  organizationId: string;
  graph: WorkflowGraph;
}

/**
 * 워크플로우 그래프 업데이트
 *
 * @param workflowId - 워크플로우 ID
 * @param organizationId - 조직 ID
 * @param graph - 워크플로우 그래프
 */
export const updateWorkflowGraph = async ({
  workflowId,
  organizationId,
  graph,
}: UpdateWorkflowGraphParams) => {
  const errors = validateWorkflowGraph(graph);

  if (errors.length > 0) {
    const errorMessage = errors.join("\n");
    throw new Error(errorMessage);
  }

  const [updatedWorkflow] = await db
    .update(workflows)
    .set({ graph, updatedAt: new Date() })
    .where(
      and(
        eq(workflows.id, workflowId),
        eq(workflows.organizationId, organizationId)
      )
    )
    .returning({ id: workflows.id });

  return updatedWorkflow;
};
