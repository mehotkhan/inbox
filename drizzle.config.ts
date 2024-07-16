import type { Config } from "drizzle-kit";

export default {
  dialect: "sqlite", // "postgresql" | "mysql"
  schema: "./server/utils/schema.ts",
  out: "./migrations",
  breakpoints: true,
  dbCredentials: {
    url: "./main.db",
  },
} satisfies Config;
