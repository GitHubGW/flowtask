import { pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";

export const workflows = pgTable("workflows", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  organizationId: text("organization_id").notNull(),
  graph: jsonb("graph"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type WorkflowType = typeof workflows.$inferSelect;
