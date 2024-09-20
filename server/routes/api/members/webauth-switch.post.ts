import { generateAuthenticationOptions } from "@simplewebauthn/server";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";

if (process.env.NODE_ENV !== "production") {
  global.crypto = global.crypto || crypto;
}

const location =
  process.env.NODE_ENV == "production"
    ? new URL("https://inbox.alizemani.ir")
    : new URL("http://localhost:3000");

export default defineEventHandler(async (event) => {
  try {
    const { DB, inboxKV } = event.context.cloudflare.env;
    const body = await readBody(event);

    // Check if the userName is provided in the body
    if (!body?.userName) {
      throw createError({
        statusCode: 400,
        statusMessage: "Username is required",
      });
    }

    const drizzleDb = drizzle(DB);

    // Find the user by userName
    const existingMember: any = await drizzleDb
      .select()
      .from(member)
      .where(eq(member.userName, body.userName))
      .get();

    if (!existingMember) {
      throw createError({
        statusCode: 400,
        statusMessage: "User Not Found",
      });
    }

    if (!existingMember?.credentialID) {
      throw createError({
        statusCode: 400,
        statusMessage: "User does not have any registered credentials",
      });
    }
    // Generate authentication options
    const options = await generateAuthenticationOptions({
      rpID: location.hostname,
      userVerification: "preferred",
      allowCredentials: [
        {
          id: existingMember?.credentialID,
          type: "public-key",
          transports: ["usb", "ble", "nfc", "internal"],
        },
      ],
    });

    // Store the generated challenge in KV storage for verification
    const webAuthChallengeKey = `webauthChallenge:${existingMember.pub}`;
    await inboxKV.put(webAuthChallengeKey, options.challenge);

    return options;
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
