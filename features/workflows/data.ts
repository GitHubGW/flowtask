import { db } from "@/libs/db";
import { workflows } from "@/libs/db/schema";
import { and, asc, eq } from "drizzle-orm";

/**
 * 조직에 속한 워크플로우 목록 조회
 *
 * @param organizationId - 조직 id
 * @returns 워크플로우 목록
 */
export const getWorkflows = (organizationId: string) => {
  return db
    .select()
    .from(workflows)
    .where(eq(workflows.organizationId, organizationId))
    .orderBy(asc(workflows.createdAt));
};

/**
 * 조직에 속한 워크플로우 조회
 *
 * @param id - 워크플로우 id
 * @param organizationId - 조직 id
 * @returns 워크플로우
 */
export const getWorkflow = async (id: string, organizationId: string) => {
  const [foundWorkflow] = await db
    .select()
    .from(workflows)
    .where(
      and(eq(workflows.id, id), eq(workflows.organizationId, organizationId))
    )
    .limit(1);
  return foundWorkflow;
};

/**
 * 새로운 워크플로우 생성
 *
 * @param name - 워크플로우 이름
 * @param organizationId - 조직 id
 * @returns 생성된 워크플로우
 */
export const createWorkflow = async (name: string, organizationId: string) => {
  const [createdWorkflow] = await db
    .insert(workflows)
    .values({ name, organizationId })
    .returning();
  return createdWorkflow;
};

/**
 * 워크플로우 삭제
 *
 * @param id - 워크플로우 id
 * @param organizationId - 조직 id
 * @returns 삭제된 워크플로우
 */
export const deleteWorkflow = async (id: string, organizationId: string) => {
  const [deletedWorkflow] = await db
    .delete(workflows)
    .where(
      and(eq(workflows.id, id), eq(workflows.organizationId, organizationId))
    )
    .returning();
  return deletedWorkflow;
};
