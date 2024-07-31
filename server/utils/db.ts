import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { drizzle as D1Drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

export const initDrizzle: BetterSQLite3Database | DrizzleD1Database = (
  cloudflare?: any
) => {
  if (false) {
    return D1Drizzle(cloudflare);
  } else {
    const betterSqlite = new Database("main.db");
    return drizzle(betterSqlite);
  }
};
