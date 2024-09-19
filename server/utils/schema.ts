import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const member = sqliteTable("member", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  pub: text("pub").unique(),
  priv: text("priv").unique(),
  isAdmin: integer("isAdmin", { mode: "boolean" }).default(false),
  isVerified: integer("isVerified", { mode: "boolean" }).default(false),
  firstName: text("firstName"),
  lastName: text("lastName"),
  displayName: text("displayName"),
  userName: text("userName").unique(),
  about: text("about"),
  email: text("email").unique(),
  avatar: text("avatar"),
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

// member
export type SelectMember = typeof member.$inferSelect;
export type InsertMember = typeof member.$inferInsert;
