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
    label: t("Contents"),
    slot: "contents",
  },
  {
    label: t("comments"),
    slot: "comments",
  },
  {
    label: t("contacts"),
    slot: "contacts",
  },
]);
</script>

<template>
  <div class="flex w-full flex-col">
    <div class="w-full sticky top-[4rem] bg-white dark:bg-slate-800">
      <div class="flex justify-between w-full items-center pt-5 border-b">
        <div class="flex justify-start gap-9">
          <div
            v-for="item in items"
            :key="item.slot"
            class="cursor-pointer"
            @click="adminTabs = item.slot"
          >
            <UChip
              v-if="item.count"
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
                    ? 'text-black underline dark:text-white'
                    : 'text-gray-500'
                "
              >
                {{ item.label }}
              </span>
            </UChip>
            <span
              v-else
              class="text-2xl"
              :class="
                adminTabs === item.slot
                  ? 'text-black underline'
                  : 'text-gray-500'
              "
            >
              {{ item.label }}
            </span>
          </div>
        </div>
        <div>
          <SocialStreamFilters />
        </div>
      </div>
    </div>
    <div>
      <MemberInbox v-if="adminTabs === 'inbox'" />
      <CommentsArchive v-if="adminTabs === 'comments'" />
      <PostArchives v-if="adminTabs === 'contents'" />
      <div>
        <p v-if="adminTabs === 'contacts'">{{ $t("Noting is Here :(") }}</p>
      </div>
    </div>
  </div>
</template>
