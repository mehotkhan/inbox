import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";



// Users Table
// export const users = sqliteTable("users", {
//   id: integer("id").primaryKey({ autoIncrement: true }),
//   username: text("username").notNull().unique(),
//   firstName: text("firstName").notNull(),
//   lastName: text("lastName").notNull(),
//   displayName: text("displayName").default(""),
//   about: text("about").default(""),
//   email: text("email").unique(),
//   avatar: text("avatar").default(""),
//   password: text("password").notNull(),
//   salt: text("salt").notNull(), 
//   createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
//   lastLoginAt: integer("last_login_at", { mode: "timestamp" }),
//   updatedAt: integer("updated_at", { mode: "timestamp" }),
// },  (t) => []
// );



export const member = sqliteTable("member", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  pub: text("pub").unique(), // Public key for user identification
  priv: text("priv").unique(), // Private key for internal use
  isVerified: integer("isVerified", { mode: "boolean" }).default(false), // Verification status
  firstName: text("firstName"), // User's first name
  lastName: text("lastName"), // User's last name
  displayName: text("displayName"), // User's display name
  userName: text("userName").unique(), // User's unique userName
  about: text("about"), // About the user
  email: text("email").unique(), // User's unique email address
  avatar: text("avatar"), // User's avatar URL
  lastActivity: integer("lastActivity"),

  // WebAuthn-specific fields:
  credentialID: text("credentialID"), // User's WebAuthn credential ID (base64 encoded)
  credentialPublicKey: text("credentialPublicKey"), // User's WebAuthn public key (base64 encoded)
  counter: integer("counter").default(0), // Counter to prevent replay attacks during authentication
},  (t) => []
);

export const events = sqliteTable("events", {
  id: text("id").primaryKey(),
  pubkey: text("pubkey"),
  created_at: integer("created_at"),
  kind: integer("kind"),
  tags: text("tags"),
  content: text("content"),
  sig: text("sig"),
  isVerified: integer("isVerified", { mode: "boolean" }).default(false),
},  (t) => []
);

// Event
export type SelectEvent = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;

// member
export type SelectMember = typeof member.$inferSelect;
export type InsertMember = typeof member.$inferInsert;
