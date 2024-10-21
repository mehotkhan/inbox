<script setup lang="ts">
import { DateTime } from "luxon";
const { locale } = useI18n();

function formatDate(inputDate: string) {
  if (locale.value === "fa") {
    return DateTime.fromISO(inputDate)
      .reconfigure({ outputCalendar: "persian" })
      .setLocale("fa")
      .toFormat("dd MMMM yyyy");
  } else {
    return DateTime.fromISO(inputDate)
      .reconfigure({ outputCalendar: "iso8601" })
      .setLocale("en")
      .toFormat("dd MMMM yyyy");
  }
}
function formatDay(inputDate: string) {
  if (locale.value === "fa") {
    return DateTime.fromISO(inputDate)
      .reconfigure({ outputCalendar: "persian" })
      .setLocale("fa")
      .toFormat("cccc");
  } else {
    return DateTime.fromISO(inputDate)
      .reconfigure({ outputCalendar: "iso8601" })
      .setLocale("en")
      .toFormat("cccc");
  }
}

const today = DateTime.now().toISO();
const formattedDate = formatDate(today);
const formattedDay = formatDay(today);
const { userRole } = useUser();
</script>
<template>
  <h1 class="flex text-3xl md:text-3xl items-center mx-5 text-center w-full">
    <NuxtLink
      v-if="userRole !== 'Owner'"
      :to="`/${locale}`"
      class="flex items-baseline"
    >
      <span class="font-hairline">
        {{ $t("titleFirst") + "" }}
      </span>
      <span class="font-bold">
        {{ $t("titleSecond") }}
      </span>
      <span class="font-hairline text-xl mx-1">://</span>
      <span class="font-hairline text-xl">
        {{ $t("description") }}
      </span>
    </NuxtLink>
    <NuxtLink v-else :to="`/${locale}`" class="flex items-baseline">
      <span class="font-bold">
        {{ $t("Today") + "" }}
      </span>
      <span class="font-hairline">
        {{ formattedDay }}
      </span>
      <span class="mx-[1px] font-hairline text-2xl">
        {{ formattedDate }}
      </span>
    </NuxtLink>
  </h1>
</template>
