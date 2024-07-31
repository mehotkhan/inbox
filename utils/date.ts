import { DateTime } from "luxon";

export const formatDateTime = (inputDate: string) => {
  const { locale } = useI18n();

  if (locale.value == "fa") {
    return DateTime.fromISO(inputDate)
      .reconfigure({ outputCalendar: "persian" })
      .setLocale("fa")
      .toFormat("dd MMM yyyy");
  } else {
    return DateTime.fromISO(inputDate)
      .reconfigure({ outputCalendar: "iso8601" })
      .setLocale("en")
      .toFormat("dd MMM yyyy");
  }
};

export const formatTimeAgo = (inputDate: string) => {
  const { locale } = useI18n();
  if (locale.value == "fa") {
    return DateTime.fromISO(inputDate)
      .reconfigure({ outputCalendar: "persian" })
      .setLocale("fa")
      .toRelative({ unit: "minutes" });
  } else {
    return DateTime.fromISO(inputDate)
      .reconfigure({ outputCalendar: "iso8601" })
      .setLocale("en")
      .toRelative({ unit: "minutes" });
  }
};

export const eventFormatTimeAgo = (inputDate: number) => {
  console.log(inputDate);
  const { locale } = useI18n();
  if (locale.value == "fa") {
    return DateTime.fromSeconds(inputDate)
      .reconfigure({ outputCalendar: "persian" })
      .setLocale("fa")
      .toRelative({ unit: "minutes" });
  } else {
    return DateTime.fromSeconds(inputDate)
      .reconfigure({ outputCalendar: "iso8601" })
      .setLocale("en")
      .toRelative({ unit: "minutes" });
  }
};
