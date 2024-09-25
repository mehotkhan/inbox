import { verifyRegistrationResponse } from "@simplewebauthn/server";
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
    const webAuthChallengeKey = `webauthChallenge:${data.userPub}`;
    const webAuthChallenge = await inboxKV.get(webAuthChallengeKey);

    if (!webAuthChallenge) {
      throw createError({
        statusCode: 400,
        statusMessage: "Challenge not found",
      });
    }

    if (data.attResp.response.attestationObject != null) {
      // Verify registration (attestation)
      const verification = await verifyRegistrationResponse({
        response: data.attResp,
        expectedChallenge: webAuthChallenge,
        expectedOrigin: location.origin,
        expectedRPID: location.hostname,
      });
      console.log("verify", verification.verified);
      if (!verification.verified) {
        throw createError({
          statusCode: 400,
          statusMessage: "Registration verification failed",
        });
      }
      await inboxKV.delete(webAuthChallengeKey);

      const drizzleDb = drizzle(DB);
      await drizzleDb
        .update(member)
        .set({
          isVerified: true,
          firstName: data.formData.firstName,
          lastName: data.formData.lastName,
          displayName: data.formData.displayName,
          userName: data.formData.userName,
          about: data.formData.about,
          email: data.formData.email,
          priv: data.userPriv,
          // Store credential data
          credentialID: verification.registrationInfo?.credentialID,
          credentialPublicKey: Buffer.from(
            verification.registrationInfo?.credentialPublicKey || []
          ).toString("base64"),
        })
        .where(eq(member.pub, data.userPub));
      // Return successful authentication response
      return new Response(
        JSON.stringify({
          firstName: data.formData.firstName,
          lastName: data.formData.lastName,
          displayName: data.formData.displayName,
          userName: data.formData.userName,
          about: data.formData.about,
          email: data.formData.email,
          priv: data.userPriv,
          pub: data.pub,
          avatar: "",
        })
      );
    }
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
