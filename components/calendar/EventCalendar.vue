<script setup lang="ts">
import { DateTime, Info, Interval } from "luxon";
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps({
  locale: String,
  dir: String,
  inputDate: Object,
  weekOffset: Number,
});
const emit = defineEmits(["daySelect"]);

const monthSelector = ref(0);
const dayOffset = ref(0);
const days = ref<any[]>([]);
const visibleCalendar = ref<boolean>(false);
const selectedEventIds = ref<number[]>([]); // Store selected event IDs as an array

// Sample events with unique IDs and colors
const events = ref([
  { id: 0, date: "2024-10-05", title: "random", color: "#ddd" },
  { id: 1, date: "2024-10-05", title: "Meeting with Team", color: "#ff5c5c" },
  { id: 2, date: "2024-10-11", title: "Doctor Appointment", color: "#4caf50" },
  { id: 3, date: "2024-10-21", title: "Project Deadline", color: "#ff9800" },
]);

onMounted(() => {
  const localParts = props.inputDate.toLocaleParts();
  dayOffset.value = localParts[2].value;
});

watch(
  () => props.inputDate,
  async (newInput: any) => {
    const localParts = newInput.toLocaleParts();
    dayOffset.value = localParts[2].value;
  }
);

const weekdaysShort = computed(() => {
  return weekDayShift(
    Info.weekdays("short", { locale: props.locale, useLocaleWeeks: false }),
    props.weekOffset
  );
});
const currentDate = computed(() =>
  props.inputDate.plus({ month: monthSelector.value })
);
const monthName = computed(() =>
  currentDate.value.toFormat("LLLL", { locale: props.locale })
);
const yearName = computed(() =>
  currentDate.value.toFormat("yyyy", { locale: props.locale })
);

// Find start of month + 31 day :)
const start = computed(() =>
  currentDate.value
    .minus({ day: dayOffset.value - 1 })
    .startOf("week", { useLocaleWeeks: true })
);
const end = computed(() =>
  start.value.plus({ day: 32 }).endOf("week", { useLocaleWeeks: true })
);

const range = computed(() =>
  Interval.fromDateTimes(start.value, end.value).splitBy({ days: 1 })
);

const isToday = (date) => {
  return date.toISODate() === DateTime.local().toISODate();
};
const isMonth = (date) => {
  return (
    date.toLocaleParts()[0].value === currentDate.value.toLocaleParts()[0].value
  );
};

// Get all events for a given day
const getEvents = (date) => {
  return events.value.filter((event) => event.date === date.toISODate());
};

const weekGenerator = (rangeDays) => {
  days.value = [];
  rangeDays.forEach((day) => {
    const dayEvents = getEvents(day.start);
    days.value.push({
      dayNum: day.start.toFormat("dd", { locale: props.locale }),
      dayName: day.start.toFormat("cccc", { locale: props.locale }),
      monthName: day.start.toFormat("MMM", { locale: props.locale }),
      dayClass: [
        isMonth(day.start) ? "text-gray-700" : "text-gray-400",
        isToday(day.start) ? "bg-gray-400 text-white" : "",
        dayEvents.length ? "relative" : "",
      ],
      hasEvent: dayEvents.length > 0,
      events: dayEvents, // Storing events for easier access
    });
  });
};

const weekDayShift = (weekArray, shiftNum) => [
  ...weekArray.slice(shiftNum - 1),
  ...weekArray.slice(0, shiftNum - 1),
];

weekGenerator(range.value);

watch(range, async (newRange) => {
  weekGenerator(newRange);
});

const dayClick = (day: any) => {
  if (day.hasEvent && day.events.length) {
    console.log(`Event IDs: ${day.events.map((event) => event.id).join(", ")}`);
    selectedEventIds.value = day.events.map((event) => event.id); // Set all event IDs for the day as selected
  }
  emit("daySelect", day);
  visibleCalendar.value = false;
};
</script>

<template>
  <div class="w-full h-full">
    <!-- Calendar Header -->
    <div
      class="flex items-center justify-between mb-6"
      :class="dir == 'rtl' && 'flex-row-reverse'"
    >
      <span class="text-3xl font-semibold text-gray-800"
        >{{ monthName }} {{ yearName }}</span
      >
      <div class="flex items-center">
        <UTooltip :text="$t('Next Month')">
          <UButton
            icon="i-heroicons-chevron-right"
            size="sm"
            color="gray-200"
            variant="link"
            @click="monthSelector++"
          />
        </UTooltip>
        <UTooltip :text="$t('Current Month')">
          <UButton
            icon="i-heroicons-calendar"
            size="sm"
            color="gray-200"
            variant="link"
            @click="monthSelector = 0"
          />
        </UTooltip>
        <UTooltip :text="$t('Previous Month')">
          <UButton
            icon="i-heroicons-chevron-left"
            size="sm"
            color="gray-200"
            variant="link"
            @click="monthSelector--"
          />
        </UTooltip>
      </div>
    </div>

    <!-- Calendar Body -->
    <div class="w-full pt-10">
      <div class="grid grid-cols-7 gap-2 mb-4">
        <span
          v-for="day in weekdaysShort"
          :key="day"
          class="text-center text-sm font-medium text-gray-600"
        >
          {{ day }}
        </span>
      </div>
      <div class="grid grid-cols-7 gap-2">
        <div
          v-for="day in days"
          :key="day"
          class="flex flex-col items-center justify-center p-2 rounded-md hover:bg-blue-100 cursor-pointer"
          :class="day.dayClass"
          @click="dayClick(day)"
        >
          <div class="text-lg">{{ day.dayNum }}</div>
          <div v-if="day.hasEvent" class="flex mt-1 space-x-1">
            <span
              v-for="event in day.events"
              :key="event.id"
              :style="{ backgroundColor: event.color }"
              class="w-2 h-2 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Event List -->
    <div class="mt-8 border-t border-gray-300 pt-4">
      <ul class="text-sm">
        <li
          v-for="event in events"
          :key="event.id"
          :class="{
            'font-bold text-blue-600': selectedEventIds.includes(event.id),
          }"
          class="mb-2"
        >
          {{ event.title }} ({{ event.date }})
        </li>
      </ul>
    </div>
  </div>
</template>
