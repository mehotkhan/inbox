import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { defineEventHandler } from "h3";

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
  const existingMember = await drizzleDb
    .select()
    .from(member)
    .where(eq(member.pub, userPub))
    .get();
  if (!existingMember) {
    throw createError({
      statusCode: 400,
      statusMessage: "user Not Found",
    });
  }
  let useRole = "";

  if (existingMember.pub === OWNER_PUB) {
    useRole = "Owner";
  } else if (existingMember.isVerified) {
    useRole = "Verified";
  } else {
    useRole = "NewComer";
  }
  console.log("user server role?:", useRole);
  return useRole;
});
