<script setup lang="ts">
import type { WeekdayNumbers } from "luxon";
import { DateTime, Settings } from "luxon";
import { ref } from "vue";

const { locale } = useI18n();
const dirMode = ref<string>("ltr");
const calendarLocale = ref<string>("");
const weekOffset = ref<WeekdayNumbers>(1);
const inputDate = ref<object>();

const setLocale = (currentLocale: string) => {
  if (currentLocale === "fa") {
    calendarLocale.value = "fa-IR";
    dirMode.value = "rtl";
    weekOffset.value = 6;
    Settings.defaultWeekSettings = {
      firstDay: weekOffset.value,
      minimalDays: 1,
      weekend: [4, 5],
    };
    inputDate.value = DateTime.local().reconfigure({
      outputCalendar: "persian",
    });
  } else {
    dirMode.value = "ltr";
    calendarLocale.value = "en-GB";
    weekOffset.value = 1;
    Settings.defaultWeekSettings = {
      firstDay: weekOffset.value,
      minimalDays: 1,
      weekend: [6, 7],
    };
    inputDate.value = DateTime.local();
  }
};
setLocale(locale.value);

watch(locale, () => {
  setLocale(locale.value);
});
const daySelected = (day) => {
  console.log("day select: ", day);
  console.log(day);
  //   inputDateModel.value = day.dayNum;
};
</script>
<template>
  <CalendarEventCalendar
    :locale="calendarLocale"
    :input-date="inputDate"
    :dir="dirMode"
    :week-offset="weekOffset"
    @day-select="daySelected"
  />
</template>
