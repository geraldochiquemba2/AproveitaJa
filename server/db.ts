import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Lazy initialization - só cria a conexão quando realmente necessário
let poolInstance: Pool | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;

function getConnectionString(): string {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL must be set. Did you forget to provision a database?",
    );
  }
  
  return databaseUrl;
}

export const pool = new Proxy({} as Pool, {
  get(_target, prop) {
    if (!poolInstance) {
      poolInstance = new Pool({ connectionString: getConnectionString() });
    }
    return (poolInstance as any)[prop];
  }
});

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop) {
    if (!dbInstance) {
      if (!poolInstance) {
        poolInstance = new Pool({ connectionString: getConnectionString() });
      }
      dbInstance = drizzle({ client: poolInstance, schema });
    }
    return (dbInstance as any)[prop];
  }
});
