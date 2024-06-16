import type { Config } from "drizzle-kit";

export default {
  dialect: "sqlite", // "postgresql" | "mysql"
  schema: "./server/db/schema.ts",
  out: "./server/db/migrations",
  breakpoints: true,
  dbCredentials: {
    url: "./main.db",
  },
} satisfies Config;
