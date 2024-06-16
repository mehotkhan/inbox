import { schnorr } from "@noble/curves/secp256k1";
import { sha256 } from "@noble/hashes/sha256";
import { bytesToHex } from "@noble/hashes/utils";

export default defineEventHandler(async (event) => {
  // const requestURl = getRequestURL(event);
  // if (requestURl.pathname.startsWith("/api/")) {
  // const requestSign = getRequestHeader(event, "requestSign");
  // const ownerpub = getRequestHeader(event, "ownerpub");
  // first validator
  // if (ownerpub === undefined || requestSign === undefined) {
  //   console.log("err");
  //   throw createError({
  //     statusCode: 400,
  //     statusMessage: "No valid request",
  //   });
  // }
  // // second validator
  // const httpMethod = getMethod(event);
  // if (httpMethod === "POST") {
  //   const body = JSON.stringify(await readBody(event));
  //   const isValid = schnorr.verify(requestSign, getEventHash(body), ownerpub);
  //   if (!isValid) {
  //     throw createError({
  //       statusCode: 400,
  //       statusMessage: "No valid Sign",
  //     });
  //   }
  // }
  // if (httpMethod === "GET") {
  //   console.log("get validator");
  //   //   const body = JSON.stringify(await readBody(event));
  //   //   const isValid = schnorr.verify(requestSign, getEventHash(body), ownerpub);
  //   //   console.log(isValid);
  //   //   console.log(body);
  //   //   console.log(requestSign);
  //   //   console.log(ownerpub);
  //   //   if (!isValid) {
  //   //     throw createError({
  //   //       statusCode: 400,
  //   //       statusMessage: "No valid Sign",
  //   //     });
  //   //   }
  // }
  // }
});

const getEventHash = (data: any): string => {
  const encoder = new TextEncoder();
  const requestHash = sha256(encoder.encode(data));
  return bytesToHex(requestHash);
};
