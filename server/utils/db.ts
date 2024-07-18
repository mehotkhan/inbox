import Database from "better-sqlite3";
import { BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";

export const betterSqlite = new Database("main.db");
export const drizzleDb: BetterSQLite3Database = drizzle(betterSqlite);
