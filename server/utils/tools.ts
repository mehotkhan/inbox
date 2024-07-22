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
