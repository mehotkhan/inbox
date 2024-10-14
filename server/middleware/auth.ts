import { schnorr } from "@noble/curves/secp256k1";
import { sha256 } from "@noble/hashes/sha256";
import { bytesToHex } from "@noble/hashes/utils";

export default defineEventHandler(async (event) => {
  const requestURL = getRequestURL(event);
  const pathname = requestURL.pathname;

  if (
    pathname.startsWith("/serverless-api/") &&
    !pathname.startsWith("/serverless-api/members/register")
  ) {
    const userPub = getCookie(event, "userPub");
    const requestSign = getRequestHeader(event, "requestSign");

    // First validator: Ensure both userPub and requestSign are present
    if (!userPub || !requestSign) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid request: Missing userPub or requestSign",
      });
    }

    const httpMethod = event.method?.toUpperCase();

    if (httpMethod === "GET") {
      // const queryParams = getQuery(event) || {};
      const queryParams = {};
      const queryString = JSON.stringify(queryParams);

      const isValid = schnorr.verify(
        requestSign,
        getEventHash(queryString),
        userPub
      );

      if (!isValid) {
        throw createError({
          statusCode: 400,
          statusMessage: "Invalid signature for GET request",
        });
      }
    } else if (httpMethod === "POST") {
      const body = (await readBody(event)) || {};
      const bodyString = JSON.stringify(body);

      const isValid = schnorr.verify(
        requestSign,
        getEventHash(bodyString),
        userPub
      );

      if (!isValid) {
        throw createError({
          statusCode: 400,
          statusMessage: "Invalid signature for POST request",
        });
      }
    }
  }
});

const getEventHash = (data: string): string => {
  const encoder = new TextEncoder();
  const hash = sha256(encoder.encode(data));
  return bytesToHex(hash);
};
