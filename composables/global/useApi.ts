import { schnorr } from "@noble/curves/secp256k1";
import { sha256 } from "@noble/hashes/sha256";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils";
import type { UseFetchOptions } from "nuxt/app";

export default async function useSignedFetch<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>
) {
  const { certs } = useUser();
  let requestData = "";

  // Determine request data for signing
  const method = options?.method?.toUpperCase() || "GET";

  if (method === "GET") {
    const params = options?.params || {};
    requestData = JSON.stringify(params);
  } else if (method === "POST") {
    const body = options?.body || {};
    requestData = JSON.stringify(body);
  }

  // Generate signature
  const sig = getRequestSign(requestData, certs.value);

  // Add requestSign to headers
  const headers = {
    ...(options?.headers || {}),
    requestSign: sig,
  };

  // Use useFetch with the signed request
  return useFetch<T>(url, {
    ...options,
    headers,
    // Use a custom fetch instance if required
    $fetch: useNuxtApp().$api,
  });
}

const getRequestSign = (data: string, certs: UserCerts): string => {
  const hash = getEventHash(data);
  return bytesToHex(schnorr.sign(hash, hexToBytes(certs.priv)));
};

const getEventHash = (input: string): string => {
  const encoder = new TextEncoder();
  const hash = sha256(encoder.encode(input));
  return bytesToHex(hash);
};
