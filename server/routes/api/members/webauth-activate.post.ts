import * as Structured from "@worker-tools/structured-json";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Fido2Lib } from "fido2-lib";
import { WebUUID } from "web-uuid";
import { arrayBufferToBase64 } from "~/server/utils/tools";

// if (process.env.NODE_ENV !== "production") {
// global.crypto = global.crypto || crypto;
// }

const location =
  process.env.NODE_ENV == "production"
    ? new URL("https://inbox.alizemani.ir")
    : new URL("http://localhost:3000");

const fido2 = new Fido2Lib({
  rpId: location.hostname,
  rpName: "Inbox",
  authenticatorUserVerification: "preferred", // setting a value prevents warning in chrome
});

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
    const options = (await fido2.attestationOptions()) as any;
    options.user = {
      id: new WebUUID(),
      name: body.username,
      displayName: body.displayName,
    };
    const webAuthChallengeKey = `webauthChallenge:${body.pubKey}`;
    await inboxKV.put(
      webAuthChallengeKey,
      arrayBufferToBase64(options.challenge)
    );
    return Structured.toJSON(options);
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});

// if user registered
//     const drizzleDb = initDrizzle();
//     const existingMember = drizzleDb
//       .select()
//       .from(member)
//       .where(eq(member.pub, cookies.pubKey));
//     if (!existingMember.get()) {
//       console.log("user not found in ws");
//       peer.terminate();
//     }
