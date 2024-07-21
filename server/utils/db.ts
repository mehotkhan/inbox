import Database from "better-sqlite3";
import { BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";

export const betterSqlite = new Database("main.db");
export const drizzleDb: BetterSQLite3Database = drizzle(betterSqlite);

// import Database from "better-sqlite3";
// import { drizzle as D1Drizzle, DrizzleD1Database } from "drizzle-orm/d1";

// import {
//   BetterSQLite3Database,
//   drizzle as SQLDrizzle,
// } from "drizzle-orm/better-sqlite3";

// export const betterSqlite = new Database("main.db");
// // export const drizzleDb: BetterSQLite3Database = SQLDrizzle(betterSqlite);

// export const drizzleDb: BetterSQLite3Database | DrizzleD1Database | any = (
//   cloudflare?: any
// ) => {
//   if (cloudflare) {
//     return D1Drizzle(cloudflare);
//   } else {
//     return SQLDrizzle(betterSqlite);
//   }
// };
