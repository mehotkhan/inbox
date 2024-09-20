import { defineEventHandler } from "h3";
import { drizzle } from "drizzle-orm/d1";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { DB } = event.context.cloudflare.env;

    const drizzleDb = drizzle(DB);

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.pub) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields: firstName, lastName, pub",
      });
    }

    const newUser: InsertMember = {
      firstName: body.firstName,
      lastName: body.lastName,
      displayName: body.displayName || "",
      about: body.about || "",
      avatar: body.avatar || "",
      pub: body.pub,
      priv: body.priv || "",
      // Add other fields as necessary, ensuring they match your schema
    };

    // Insert the new user into the database
    const insertedUser = await drizzleDb
      .insert(member)
      .values(newUser)
      .returning()
      .get();

    if (!insertedUser) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to create user",
      });
    }

    // Return the inserted user data
    return insertedUser;
  } catch (e: any) {
    // Log the error for debugging (avoid logging sensitive info in production)
    console.error("Error creating user:", e);

    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.statusMessage || "Internal Server Error",
    });
  }
});
