<script setup lang="ts">
import { useStorage } from "@vueuse/core";
const { $dexie } = useNuxtApp();
const { locale } = useI18n();

const newMessages = useLiveQuery(async () => {
  return await $dexie.events
    .orderBy("created_at")
    .filter((event: NostrEvent) => event.status === "New")
    .count();
}, []);
const { t } = useI18n();

const adminTabs: any = useStorage("admin-tabs", "inbox");

const items = computed(() => [
  {
    label: t("inbox"),
    slot: "inbox",
    count: newMessages.value,
  },
  {
    label: t("contacts"),
    slot: "contacts",
    count: 5,
  },
  {
    label: t("comments"),
    slot: "comments",
    count: 1,
  },
]);
</script>

<template>
  <div class="flex w-full flex-col">
    <div class="sticky top-100 w-full">
      <div class="flex justify-between w-full items-center pb-4 border-b">
        <div class="flex justify-start gap-9">
          <div
            v-for="item in items"
            :key="item.slot"
            class="cursor-pointer"
            @click="adminTabs = item.slot"
          >
            <UChip
              :text="
                locale == 'fa'
                  ? convertToPersianNumbers(item.count)
                  : item.count
              "
              size="3xl"
              color="gray"
              variant="none"
              position="top-left"
              :show="item.count > 0"
            >
              <span
                class="text-2xl"
                :class="
                  adminTabs === item.slot
                    ? 'text-black underline'
                    : 'text-gray-500'
                "
              >
                {{ item.label }}
              </span>
            </UChip>
          </div>
        </div>
        <div>
          <SocialStreamFilters />
        </div>
      </div>
    </div>
    <div>
      <CommentsArchive v-if="adminTabs === 'inbox'" />
    </div>
  </div>
</template>
