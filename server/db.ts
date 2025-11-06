import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Durante o build (quando NODE_ENV não está definido ou durante bundling),
// não validamos DATABASE_URL. Só validamos em runtime.
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl && process.env.NODE_ENV) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Usa placeholder durante build, será substituído em runtime
export const pool = new Pool({ connectionString: databaseUrl || "postgresql://placeholder" });
export const db = drizzle({ client: pool, schema });
