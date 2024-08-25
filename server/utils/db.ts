import Database from "better-sqlite3";
import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { drizzle as D1Drizzle } from "drizzle-orm/d1";

export const initDrizzle = (
  cloudflare?: any
): BetterSQLite3Database | DrizzleD1Database => {
  if (process.env.DB) {
    // return D1Drizzle(cloudflare);
    return D1Drizzle(process?.env?.DB);
  } else {
    const betterSqlite = new Database("main.db");
    return drizzle(betterSqlite);
  }
};
