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
export const ticketStatus = [
  {
    id: "new",
    label: "جدید",
  },
  {
    id: "open",
    label: "باز",
  },
  {
    id: "on-going",
    label: "در درست بررسی",
  },
  {
    id: "close",
    label: "بسته",
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
