import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from "@shared/schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl || databaseUrl.includes('[YOUR_DB_PASSWORD]')) {
  console.warn(
    '\n⚠️  DATABASE_URL not configured. Get your database password from:\n' +
    '   Supabase Dashboard → Settings → Database → Connection String → URI\n' +
    '   Then replace [YOUR_DB_PASSWORD] in your .env and .replit files.\n'
  );
}

const client = postgres(databaseUrl || 'postgresql://localhost/placeholder', {
  prepare: false,
  connect_timeout: 10,
  idle_timeout: 20,
  max: 10,
});

export const db = drizzle(client, { schema });
