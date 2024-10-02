<script setup lang="ts">
const { profile, logout } = useUser();
const { locale } = useI18n();
const loginIsOpen = ref(false);
const isClient = ref(false);
const { $dexie } = useNuxtApp();

const newMessages = useLiveQuery(async () => {
  return await $dexie.events
    .orderBy("created_at")
    .filter((event: NostrEvent) => event.status === "New")
    .count();
}, []);

onMounted(() => {
  isClient.value = true;
});
const items = computed(() => [
  [
    {
      label: "",
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "پروفایل",
      icon: "i-heroicons-user",
      to: `/${locale.value}/profile`,
    },
    {
      label: `${locale.value == "fa" ? convertToPersianNumbers(newMessages.value ?? 0) : newMessages.value} اطلاعیه جدید`,
      icon: "i-heroicons-bell",
    },
  ],
  [
    {
      label: "تغییر حساب",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: () => {
        loginIsOpen.value = true;
      },
    },
    {
      label: "خروج",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: () => {
        logout();
      },
    },
  ],
]);
</script>

<template>
  <div class="relative flex">
    <UChip
      :text="
        locale == 'fa' ? convertToPersianNumbers(newMessages) : newMessages
      "
      size="2xl"
      color="gray"
      position="top-left"
    >
      <UDropdown
        v-if="isClient"
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
      >
        <UAvatar
          :alt="profile?.displayName"
          src="/totoro_render.webp"
          size="xs"
          class="avatar-button"
        />

        <template #account="{ item }">
          <UAvatar
            :alt="profile?.displayName"
            src="/totoro_render.webp"
            size="sm"
            class="avatar-button"
          />
          <p class="text-right w-full flex gap-2 justify-between">
            <span class="font-bold text-gray-900 dark:text-white">
              {{ profile?.displayName }}
            </span>
          </p>
        </template>

        <template #item="{ item }">
          <div
            v-if="item.click"
            class="flex w-full cursor-pointer"
            @click="item.click"
          >
            <span class="truncate">{{ item.label }}</span>
            <UIcon
              :name="item.icon"
              class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
            />
          </div>
          <NuxtLink v-else-if="item.to" :to="item.to" class="flex w-full">
            <span class="truncate">{{ item.label }}</span>
            <UIcon
              :name="item.icon"
              class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
            />
          </NuxtLink>
          <div v-else class="flex w-full cursor-default">
            <span class="truncate">{{ item.label }}</span>
            <UIcon
              :name="item.icon"
              class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
            />
          </div>
        </template>
      </UDropdown>
    </UChip>
    <MemberSwitch v-model:is-open="loginIsOpen" />
  </div>
</template>
<style lang="scss">
.avatar-button img {
  width: auto !important;
}
</style>
