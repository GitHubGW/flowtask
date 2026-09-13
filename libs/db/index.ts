import "server-only";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL이 설정되지 않았습니다.");
}

const pool = new Pool({ connectionString: DATABASE_URL, max: 5 });

export const db = drizzle({ client: pool, schema });
