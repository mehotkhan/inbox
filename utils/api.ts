import { schnorr } from "@noble/curves/secp256k1";
import { sha256 } from "@noble/hashes/sha256";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils";

// Function to get certificates from localStorage (client-side only)
const getCertsFromStorage = (): UserCerts | null => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const certs = localStorage.getItem("current-certs");
    return certs ? JSON.parse(certs) : null;
  }
  return null; // Return null if not on the client-side
};

// Helper function for delayed retry
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const singedApi = $fetch.create({
  async onRequest({ request, options, error }) {
    let certs = getCertsFromStorage();

    // Retry mechanism if certs are not available
    const maxRetries = 5;
    let retries = 0;

    while (!certs && retries < maxRetries) {
      await delay(100); // wait for 100ms
      certs = getCertsFromStorage();
      retries++;
    }

    if (!certs) {
      throw new Error("Certificates not found after retries");
    }

    let requestData = "";
    const method = options?.method || "GET";

    // Determine request data for signing
    if (method === "GET") {
      const params = options?.params || {};
      requestData = JSON.stringify(params);
    } else if (method === "POST") {
      const body = options?.body || {};
      requestData = JSON.stringify(body);
    }

    // Generate signature
    const sig = getRequestSign(requestData, certs);

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
