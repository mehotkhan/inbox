// Sadly, this is necessary to serialize WebAuthn credentials...
export const credToJSON = (x: any) => {
  if (x instanceof ArrayBuffer) return x;
  if (Array.isArray(x)) {
    const arr = [];
    for (const i of x) arr.push(credToJSON(i));
    return arr;
  }
  if (x != null && typeof x === "object") {
    const obj = {};
    for (const key in x)
      if (typeof x[key] !== "function") obj[key] = credToJSON(x[key]);
    return obj;
  }
  return x;
};

export const isSafari = (ua: any) =>
  !!ua &&
  ua.includes("Safari/") &&
  !(ua.includes("Chrome/") || ua.includes("Chromium/"));
