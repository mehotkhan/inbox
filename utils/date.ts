import moment from "moment-jalaali";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import jalaliday from "jalaliday";

dayjs.extend(relativeTime);
dayjs.extend(jalaliday);
dayjs.locale("fa");

export const FromNow = (time: string | number) => {
  return time
    ? dayjs(time)
        .fromNow()
        .replace(/\d/g, (d: any) => "۰۱۲۳۴۵۶۷۸۹"[d])
    : "...";
};

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
moment().format("jYYYY/jM/jD");

export const JalaliDate = (input: string) => {
  return moment(new Date(input)).format("jDD jMMMM jYYYY");
};
