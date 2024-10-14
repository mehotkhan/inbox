<script setup lang="ts">
import { DateTime } from "luxon";
import { useI18n } from "vue-i18n";
const { locale, t } = useI18n();

function formatDate(inputDate: string) {
  if (locale.value === "fa") {
    return DateTime.fromISO(inputDate)
      .reconfigure({ outputCalendar: "persian" })
      .setLocale("fa")
      .toFormat("cccc dd MMMM yyyy");
  } else {
    return DateTime.fromISO(inputDate)
      .reconfigure({ outputCalendar: "iso8601" })
      .setLocale("en")
      .toFormat("cccc dd MMMM yyyy");
  }
}

function getGreeting() {
  const hour = DateTime.now().setLocale(locale.value).hour;
  if (hour >= 5 && hour < 12) {
    return t("Good morning :)");
  } else if (hour >= 12 && hour < 17) {
    return t("Good afternoon :)");
  } else {
    return t("Good evening :)");
  }
}

const today = DateTime.now().toISO();
const formattedDate = formatDate(today);
const greeting = getGreeting();

const data = await singedApi("/serverless-api/events/todayMessages");

console.log(data);
</script>

<template>
  <div>
    <div
      class="flex md:gap-10 flex-col-reverse md:flex-row justify-between h-screen-sm pb-10"
    >
      <div class="basis-2/2 md:basis-5/12 flex flex-col justify-between w-full">
        <div>
          <h2>{{ greeting }}</h2>
          <h3>{{ $t("Today") }} {{ formattedDate }}</h3>
          <p>
            {{ data.message }}
          </p>
        </div>
      </div>
      <div class="basis-2/2 md:basis-6/12 h-full">
        <CalendarWeek />
      </div>
    </div>
  </div>
</template>
