import { verifyAuthenticationResponse } from "@simplewebauthn/server";
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
  const { DB, inboxKV } = event.context.cloudflare.env;

  try {
    const data = await readBody(event);
    const drizzleDb = drizzle(DB);
    console.log("username?", data.userName);
    // Find the user by userName
    const existingMember: any = await drizzleDb
      .select()
      .from(member)
      .where(eq(member.userName, data.userName))
      .get();

    if (!existingMember) {
      throw createError({
        statusCode: 400,
        statusMessage: "User Not Found",
      });
    }
    const webAuthChallengeKey = `webauthChallenge:${existingMember.pub}`;
    const webAuthChallenge = await inboxKV.get(webAuthChallengeKey);

    if (!webAuthChallenge) {
      throw createError({
        statusCode: 400,
        statusMessage: "Challenge not found",
      });
    }

    // Verify authentication response
    const verification = await verifyAuthenticationResponse({
      response: data.authResp,
      expectedChallenge: webAuthChallenge,
      expectedOrigin: location.origin,
      expectedRPID: location.hostname,
      authenticator: {
        credentialPublicKey: Buffer.from(
          existingMember.credentialPublicKey,
          "base64"
        ),
        credentialID: existingMember.credentialID,
        counter: existingMember.counter || 0, // The stored counter from the user's previous authentication
      },
    });

    if (!verification.verified) {
      throw createError({
        statusCode: 400,
        statusMessage: "Authentication verification failed",
      });
    }

    // Authentication successful, update the counter to prevent replay attacks
    await inboxKV.delete(webAuthChallengeKey);

    // Return successful authentication response
    return new Response(
      JSON.stringify({
        firstName: existingMember.firstName,
        lastName: existingMember.lastName,
        displayName: existingMember.displayName,
        userName: existingMember.userName,
        about: existingMember.about,
        email: existingMember.email,
        avatar: existingMember.avatar,
        pub: existingMember.pub,
        priv: existingMember.priv,
      })
    );
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
