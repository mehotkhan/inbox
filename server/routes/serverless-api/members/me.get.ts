import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";

export default defineEventHandler(async (event) => {
  const userPub = getCookie(event, "userPub");

  // Validate required fields
  if (!userPub) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing Pub!",
    });
  }

  const { DB, OWNER_PUB } = event.context.cloudflare.env;
  const drizzleDb = drizzle(DB);

  // Fetch the existing member
  const existingMember = await drizzleDb
    .select()
    .from(member)
    .where(eq(member.pub, userPub))
    .get();

  if (!existingMember) {
    throw createError({
      statusCode: 400,
      statusMessage: "User Not Found",
    });
  }

  // Update the lastActivity field to the current timestamp
  await drizzleDb
    .update(member)
    .set({ lastActivity: Date.now() })
    .where(eq(member.pub, userPub))
    .run();

  // Determine the user role
  const userRole =
    userPub === OWNER_PUB
      ? "Owner"
      : existingMember.isVerified
        ? "Verified"
        : "NewComer";

  console.log("User server role:", userRole);
  return userRole;
});
