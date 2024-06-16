import crypto from "crypto";
// import * as Structured from "@worker-tools/structured-json";
import { Fido2Lib } from "fido2-lib";
// import { WebUUID } from "web-uuid";

if (process.env.NODE_ENV !== "production") {
  global.crypto = global.crypto || crypto;
}

const location =
  process.env.NODE_ENV == "production"
    ? new URL("https://hekayat.pages.dev")
    : new URL("http://localhost:3000");

const fido2 = new Fido2Lib({
  rpId: location.hostname,
  rpName: "Hekayat",
  authenticatorUserVerification: "preferred", // setting a value prevents warning in chrome
});

// export default defineEventHandler(async (event: any) => {
//   const { email, password } = await useValidatedBody(event, {
//     email: z.string().email(),
//     password: z.string().min(8).max(128),
//   });

//   try {
//     const user = await useAuth().createUser({
//       primaryKey: {
//         providerId: "email",
//         providerUserId: email,
//         password,
//       },
//       attributes: {
//         email,
//       },
//     });
//     const session = await useAuth().createSession(user.userId);
//     const authRequest = useAuth().handleRequest(event);
//     authRequest.setSession(session);
//     return null;
//   } catch (error) {
//     if (
//       error instanceof LuciaError &&
//       error.message === "AUTH_DUPLICATE_KEY_ID"
//     ) {
//       return {
//         error: "Email in use",
//       };
//     }
//     // database connection error
//     console.log(error);
//     return {
//       error: "An unknown error occurred",
//     };
//   }
// });

// export default defineEventHandler(async (event) => {
//     try {
//         const body = await readBody(event);

//         const options = await fido2.attestationOptions() as any;
//         options.user = {
//             id: new WebUUID(),
//             name: body.username,
//             displayName: body.displayName,
//         };

//         // session.userId = options.user.id
//         // session.userHandle = username
//         // session.challenge = options.challenge

//         // return new JSONResponse()
//         return Structured.toJSON(options)

//     } catch (e: any) {
//         throw createError({
//             statusCode: 400,
//             statusMessage: e.message,
//         });
//     }
// });

export default defineEventHandler(async (event) => {
  try {
    // const { cloudflare } = event.context
    // const body = await readBody(event);
    // const newUser: InsertUser = {
    //     firstName: body.firstName,
    //     lastName: body.lastName,
    //     displayName: body.displayName,
    //     about: body.about,
    //     email: body.email,
    //     avatar: body.avatar,
    //     pub: body.pub
    // }
    // const db = DB(cloudflare?.env?.DB);
    // return { result }
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
