import * as Structured from "@worker-tools/structured-json";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Fido2Lib } from "fido2-lib";

// if (process.env.NODE_ENV !== "production") {
global.crypto = global.crypto || crypto;
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
  const { DB, inboxKV } = event.context.cloudflare.env;

  try {
    const data = await readBody(event);
    const webAuthChallengeKey = `webauthChallenge:${data.userPub}`;
    const webAuthChallenge = await inboxKV.get(webAuthChallengeKey);
    const crdBody = Structured.fromJSON(data.crdBody);
    if (crdBody.response.attestationObject != null) {
      // Activate
      const reg = await fido2.attestationResult(crdBody, {
        challenge: webAuthChallenge,
        origin: location.origin,
        factor: "either",
      });
      if (!reg.authnrData)
        throw createError({
          statusCode: 400,
          statusMessage: "authnrData Not Found",
        });
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
          priv: data.formData.userPriv,
        })
        .where(eq(member.pub, data.userPub));
      const result = await drizzleDb.select().from(member).all();
      return new Response(JSON.stringify(result));
    } else if (crdBody.response.authenticatorData != null) {
      // login
      //     const user = await users.get<User>(session.userHandle)
      //     if (!user || !data.rawId) throw unauthorized()
      // const auth = user.authenticators.find(x => x.credId && compareBufferSources(x.credId, data.rawId))
      //     if (!auth) throw unauthorized();
      //     // Some devices don't provide a user handle, but required by fido-lib, so we just patch it...
      //     data.response.userHandle ||= ('buffer' in user.id) ? user.id.buffer : user.id
      //     const reg = await fido2.assertionResult(data, {
      //         allowCredentials: getAllowCredentials(user),
      //         challenge: session.challenge,
      //         origin: location.origin,
      //         factor: "either",
      //         publicKey: auth.credentialPublicKeyPem,
      //         prevCounter: auth.counter,
      //         userHandle: user.id,
      //     })
      //     if (!reg.authnrData) throw unauthorized();
      //     console.log(reg)
      //     auth.counter = reg.authnrData.get('counter');
      //     await users.set(session.userHandle, user, STORAGE_OPTS)
      //     session.loggedIn = true
      //     delete session.challenge;
      //     return ok()
    }

    // return badRequest()
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
