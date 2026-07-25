import { db } from "@/libs/db";
import { workflows } from "@/libs/db/schema";
import { and, asc, eq } from "drizzle-orm";

export const getWorkflows = (organizationId: string) => {
  return db
    .select()
    .from(workflows)
    .where(eq(workflows.organizationId, organizationId))
    .orderBy(asc(workflows.createdAt));
};

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

export const createWorkflow = async (name: string, organizationId: string) => {
  const [createdWorkflow] = await db
    .insert(workflows)
    .values({ name, organizationId })
    .returning();
  return createdWorkflow;
};
