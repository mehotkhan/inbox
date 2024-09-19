export const isJsonStringified = (value: string) => {
  if (value.length && value.startsWith('["')) {
    return true;
  }
  return false;
};

export const extractCookies = (cookieStr: any) => {
  const output: any = {};

  cookieStr.split(/\s*;\s*/).forEach(function (pair: any) {
    pair = pair.split(/\s*=\s*/);
    output[pair[0]] = pair.splice(1).join("=");
  });
  return JSON.stringify(output, null, 4);
};
/**
 * Encode an ArrayBuffer to a Base64 string
 * @param buffer - The ArrayBuffer to encode
 * @returns Base64 encoded string
 */
export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const binaryString = String.fromCharCode(...new Uint8Array(buffer));
  return btoa(binaryString);
};
