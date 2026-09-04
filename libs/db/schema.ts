import type { WorkflowGraph } from "@/features/workflows/types";
import { pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";

export const workflows = pgTable("workflows", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  organizationId: text("organization_id").notNull(),
  graph: jsonb("graph").$type<WorkflowGraph>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type WorkflowRow = typeof workflows.$inferSelect;
