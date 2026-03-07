import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required. Get it from your Supabase Dashboard > Settings > Database > Connection String > URI (Transaction mode).");
}

const client = postgres(process.env.DATABASE_URL, { prepare: false });
export const db = drizzle(client, { schema });
