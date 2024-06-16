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

export const blog = sqliteTable("blog", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  // writer: integer("writer")
  //   .references(() => member.id),
  uuid: text("uuid").unique(),
  title: text("title"),
  poster: text("poster"),
  summery: text("summery"),
  body: text("body"),
  publish: integer("id", { mode: "boolean" }).default(false),
});

export const story = sqliteTable("story", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  // creator: integer("creator")
  //   .references(() => member.id),
  uuid: text("uuid").unique(),
  title: text("title"),
  intro: text("intro"),
  poster: text("poster"),
  page: text("page"),
  publish: integer("id", { mode: "boolean" }).default(false),
});

export const comment = sqliteTable("comment", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  // writer: integer("writer")
  //   .references(() => member.id),
  blog: integer("blog").references(() => blog.id),
  story: integer("story").references(() => story.id),
  uuid: text("uuid").unique(),
  body: text("body"),
  publish: integer("id", { mode: "boolean" }).default(false),
});

/// managing stuffs )

// story
export type SelectStory = typeof story.$inferSelect;
export type InsertStory = typeof story.$inferInsert;

// story
export type SelectBlog = typeof blog.$inferSelect;
export type InsertBlog = typeof blog.$inferInsert;
