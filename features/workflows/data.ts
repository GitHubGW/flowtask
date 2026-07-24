import { db } from "@/libs/db";
import { workflows } from "@/libs/db/schema";
import { asc, eq } from "drizzle-orm";

export const getWorkflows = (organizationId: string) => {
  return db
    .select()
    .from(workflows)
    .where(eq(workflows.organizationId, organizationId))
    .orderBy(asc(workflows.createdAt));
};

export const createWorkflow = async (name: string, organizationId: string) => {
  const [createdWorkflow] = await db
    .insert(workflows)
    .values({ name, organizationId })
    .returning();
  return createdWorkflow;
};
