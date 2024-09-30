export const isDev = () => process.env.NODE_ENV !== "production";

export const cookieExpire = 60 * 60 * 24;
export const timeFilter = [
  {
    label: "امروز",
    filter: 24 * 60 * 60,
  },
  {
    label: "هفته",
    filter: 7 * 24 * 60 * 60,
  },
  {
    label: "ماه",
    filter: 30 * 24 * 60 * 60,
  },
  {
    label: "سال",
    filter: 365 * 24 * 60 * 60,
  },
];

export const streamOrder = [
  {
    label: "جدیدترین",
    filter: "desc",
  },
  {
    label: "قدیمی‌ترین",
    filter: "asc",
  },
];
export const Capitalize = (string: string) => {
  return string?.length
    ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    : "";
};

export function isRTL(s: string) {
  const rtlChars = "\u0591-\u07FF\u200F\u202B\u202E\uFB1D-\uFDFD\uFE70-\uFEFC";
  const rtlDirCheck = new RegExp("^[^" + rtlChars + "]*?[" + rtlChars + "]");
  return rtlDirCheck.test(s);
}

/**
 * Converts English digits in a number or string to Persian digits.
 * This function uses a regular expression and a direct character mapping for optimal performance.
 *
 * @param {string | number} input - The input string or number containing English digits to convert.
 * @returns {string} - The input with English digits converted to Persian digits.
 */
export const convertToPersianNumbers = (input: string | number): string => {
  // Convert the input to a string to ensure we can work with it.
  const inputStr = input?.toString();

  // Use a regular expression to replace English digits with Persian digits.
  return inputStr?.replace(/\d/g, (char) =>
    String.fromCharCode(char.charCodeAt(0) + 1728)
  );
};
