import {
  BetterSQLite3Database,
  drizzle as DrizzleSqlite,
} from "drizzle-orm/better-sqlite3";
import { drizzle as D1Drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import sqlite from "better-sqlite3";

export * as tables from "../db/schema";

let _db: DrizzleD1Database | BetterSQLite3Database | null = null;

export const DB = () => {
  if (!_db) {
    if (process.env.NODE_ENV !== "production") {
      const db = sqlite("main.db");
      _db = DrizzleSqlite(db);
    } else {
      _db = D1Drizzle(process.env.DB);
    }
  }
  return _db;
};
