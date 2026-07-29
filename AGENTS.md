# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Database types

Derive database types from the Drizzle schema — never hand-write custom or partial shapes for table rows. Export `typeof table.$inferSelect` (and `$inferInsert` when needed) from `libs/db/schema.ts` and import it. When a consumer needs only some columns, narrow with `Pick<Row, ...>` / `Omit<Row, ...>` rather than redeclaring a literal type.

# React Flow (`@xyflow/react`)

Do not rely on training data for React Flow APIs, components, hooks, props, or usage patterns — they drift across versions.
When working with React Flow (canvas, nodes, edges, handles, controls, minimap, state helpers like `useNodesState` / `useEdgesState`, theming/`colorMode`, TypeScript types, etc.):

1. Start from the official index: https://reactflow.dev/llms.txt
2. Find the matching guide, example, or API reference link for the task.
3. Fetch/read that page (and installed package types under `node_modules/@xyflow/` if needed) before writing or changing code.
4. Prefer current `@xyflow/react` imports and documented patterns over older `reactflow` package APIs from memory.
