import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";

export default defineEventHandler(async (event) => {
  const userPub = getCookie(event, "userPub");

  // Validate required fields
  if (!userPub) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing userPub from cookie!",
    });
  }

  const { DB, OWNER_PUB } = event.context.cloudflare.env;

  // if (!OWNER_PUB) {
  //   throw createError({
  //     statusCode: 500,
  //     statusMessage: "OWNER_PUB is not set in environment variables!",
  //   });
  // }

  // console.log("userPub:", userPub);
  // console.log("OWNER_PUB:", OWNER_PUB);

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

  // Normalize the public keys
  const normalizedUserPub = userPub.trim();
  const normalizedOwnerPub = OWNER_PUB.trim();

  // Determine the user role
  const userRole =
    normalizedUserPub === normalizedOwnerPub
      ? "Owner"
      : existingMember.isVerified
        ? "Verified"
        : "NewComer";

  console.log("User server role:", userRole);
  return userRole;
});
