import * as Structured from "@worker-tools/structured-json";
import crypto from "crypto";
import { Fido2Lib } from "fido2-lib";
import { WebUUID } from "web-uuid";

if (process.env.NODE_ENV !== "production") {
  global.crypto = global.crypto || crypto;
}

const location =
  process.env.NODE_ENV == "production"
    ? new URL("https://inbox.pages.dev")
    : new URL("http://localhost:3000");

const fido2 = new Fido2Lib({
  rpId: location.hostname,
  rpName: "Inbox",
  authenticatorUserVerification: "preferred", // setting a value prevents warning in chrome
});

export default defineEventHandler(async (event) => {
  console.log(event.context.cloudflare.env);
  console.log(process.env.d1_database);

  try {
    const body = await readBody(event);

    const options = (await fido2.attestationOptions()) as any;
    options.user = {
      id: new WebUUID(),
      name: body.username,
      displayName: body.displayName,
    };

    // session.userId = options.user.id
    // session.userHandle = username
    // session.challenge = options.challenge

    // return new JSONResponse()
    return Structured.toJSON(options);
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
