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
