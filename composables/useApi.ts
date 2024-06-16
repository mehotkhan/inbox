import { schnorr } from "@noble/curves/secp256k1";
import { sha256 } from "@noble/hashes/sha256";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils";
import { useStorage } from "@vueuse/core";

export async function useApi<T>(
  request: Parameters<typeof $fetch<T>>[0],
  opts?: Parameters<typeof $fetch<T>>[1],
) {
  const profile: any = useStorage("current-user", {});
  let requestString = "";
  if (opts?.method === "get") {
    requestString = JSON.stringify(opts?.params);
  } else if (opts?.method === "post") {
    requestString = JSON.stringify(opts.body);
  }

  const sig = getRequestSign(requestString, profile);
  // console.log("sig: ", sig);
  // console.log("pub: ", profile.value.pub);
  // console.log("body: ", opts);
  return $fetch<T, R>(request, {
    ...opts,
    headers: {
      ownerPub: profile.value.pub,
      requestSign: sig,
      ...opts?.headers,
    },
  });
}

const getRequestSign = (requestString: string, profile: any): string => {
  console.log("profile priv? ", profile.value.pub);
  return bytesToHex(
    schnorr.sign(getEventHash(requestString), hexToBytes(profile.value.priv)),
  );
};

const getEventHash = (input: string): string => {
  const encoder = new TextEncoder();
  const requestHash = sha256(encoder.encode(input));
  return bytesToHex(requestHash);
};
