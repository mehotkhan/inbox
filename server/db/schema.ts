import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const member = sqliteTable("member", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  uuid: text("uuid").unique(),
  pub: text("pub").unique(),
  isAdmin: integer("id", { mode: "boolean" }).default(false),
  userName: text("userName").unique(),
  email: text("email").unique(),
  firstName: text("firstName"),
  lastName: text("lastName"),
  about: text("about"),
  avatar: text("avatar"),
});

export const authKey = sqliteTable("auth_key", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  owner: integer("owner").references(() => member.id),
  challenge: text("challenge"),
});

export const events = sqliteTable("events", {
  id: text("id").primaryKey(),
  pubkey: text("pubkey"),
  created_at: integer("created_at"),
  kind: integer("kind"),
  tags: text("tags"),
  content: text("content"),
  sig: text("sig"),
});

// Event
export type SelectEvent = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;
