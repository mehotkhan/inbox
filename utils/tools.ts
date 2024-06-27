export const isDev = () => process.env.NODE_ENV !== "production";
export const baseApiURL = () => "/api/";
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

export const JalaliDate = (date: string) => {
  return "Date";
};
