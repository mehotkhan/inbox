import { schnorr } from "@noble/curves/secp256k1";
import { sha256 } from "@noble/hashes/sha256";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils";

export async function useApi<T>(
  request: Parameters<typeof $fetch<T>>[0],
  opts?: Parameters<typeof $fetch<T>>[1]
) {
  const { certs } = useUser();
  let requestString = "";
  if (opts?.method === "get") {
    requestString = JSON.stringify(opts?.params);
  } else if (opts?.method === "post") {
    requestString = JSON.stringify(opts.body);
  }

  const sig = getRequestSign(requestString, certs.value);
  return $fetch<T, R>(request, {
    ...opts,
    headers: {
      requestSign: sig,
      ...opts?.headers,
    },
  });
}

const getRequestSign = (requestString: string, certs: UserCerts): string => {
  return bytesToHex(
    schnorr.sign(getEventHash(requestString), hexToBytes(certs.priv))
  );
};

const getEventHash = (input: string): string => {
  const encoder = new TextEncoder();
  const requestHash = sha256(encoder.encode(input));
  return bytesToHex(requestHash);
};
