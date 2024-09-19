import { generateRegistrationOptions } from "@simplewebauthn/server";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { WebUUID } from "web-uuid";

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

    if (!body?.pubKey) {
      throw createError({
        statusCode: 400,
        statusMessage: "pubKey Not Found",
      });
    }

    const drizzleDb = drizzle(DB);
    const existingMember = drizzleDb
      .select()
      .from(member)
      .where(eq(member.pub, body.pubKey));
    if (!existingMember.get()) {
      throw createError({
        statusCode: 400,
        statusMessage: "user Not Found",
      });
    }

    const options = await generateRegistrationOptions({
      rpName: "Inbox",
      rpID: location.hostname,
      userID: new WebUUID(), // Should be the unique user identifier
      userName: body.username,
      userDisplayName: body.displayName,
      attestationType: "none",
      authenticatorSelection: {
        userVerification: "preferred",
      },
    });
    const webAuthChallengeKey = `webauthChallenge:${body.pubKey}`;
    await inboxKV.put(webAuthChallengeKey, options.challenge);
    return options;
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
