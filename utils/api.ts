import { schnorr } from "@noble/curves/secp256k1";
import { sha256 } from "@noble/hashes/sha256";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils";

export const singedApi = $fetch.create({
  onRequest({ request, options, error }) {
    const { certs } = useUser();

    let requestData = "";
    const method = options?.method || "GET";

    // // Determine request data for signing
    if (method === "GET") {
      const params = options?.params || {};
      requestData = JSON.stringify(params);
    } else if (method === "POST") {
      const body = options?.body || {};
      requestData = JSON.stringify(body);
    }

    // // Generate signature
    const sig = getRequestSign(requestData, certs.value);

    const headers = (options.headers ||= {});
    if (Array.isArray(headers)) {
      headers.push(["requestSign", sig]);
    } else if (headers instanceof Headers) {
      headers.set("requestSign", sig);
    } else {
      headers.requestSign = sig;
    }
  },
});
// Helper function to generate request signature
const getRequestSign = (data: string, certs: UserCerts): string => {
  const hash = getEventHash(data);
  return bytesToHex(schnorr.sign(hash, hexToBytes(certs.priv)));
};

// Helper function to hash the input data
const getEventHash = (input: string): string => {
  const encoder = new TextEncoder();
  const hash = sha256(encoder.encode(input));
  return bytesToHex(hash);
};
