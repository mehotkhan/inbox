import crypto from "crypto";
import { Fido2Lib } from "fido2-lib";

if (process.env.NODE_ENV !== "production") {
  global.crypto = global.crypto || crypto;
}

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
    const body = await readBody(event);
    const data = body.json();
    const webAuthChallengeKey = `webauthChallenge:${body.userPub}`;
    const webAuthChallenge = await inboxKV.get(webAuthChallengeKey);
    console.log("response body: ", data);
    console.log("webAuthChallenge: ", webAuthChallenge);
    if (data.response.attestationObject != null) {
      // Activate
      // const reg = await fido2.attestationResult(data, {
      //   challenge: session.challenge,
      //   origin: location.origin,
      //   factor: "either",
      // });
      // if (!reg.authnrData) throw unauthorized();
      // console.log(reg);
      // const user = {
      //   id: session.userId,
      //   name: session.userHandle,
      //   displayName: session.userHandle,
      //   authenticators: [Object.fromEntries(reg.authnrData)],
      // };
      // await users.set(user.name, user, STORAGE_OPTS);
      // session.loggedIn = true;
      // delete session.userId;
      // delete session.challenge;
      // return ok();
    } else if (data.response.authenticatorData != null) {
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
