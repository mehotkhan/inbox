<script setup>
const { profile } = useUser();
const { locale } = useI18n();

const items = [
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
      to:  `/${locale.value}/profile`,
    },
    {
      label: "۳ اطلاعیه جدید",
      icon: "i-heroicons-bell",
      // disabled: true,
      // to: "/profile",
    },
  ],

  [
    {
      label: "تغییر حساب",
      icon: "i-heroicons-arrow-left-on-rectangle",
    },
    {
      label: "خروج",
      icon: "i-heroicons-arrow-left-on-rectangle",
    },
  ],
];
</script>

<template>
  <div class="relative flex">
    <UChip text="۳" size="xl" color="green" position="top-left">
      <UDropdown
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
      >
        <UAvatar :alt="profile?.displayName"  />

        <template #account="{ item }">
          <p class="text-right w-full flex gap-2 justify-between">
            <span>ورود به عنوان</span>
            <span class="font-bold text-gray-900 dark:text-white">
              {{ profile?.displayName }}
            </span>
          </p>
        </template>

        <template #item="{ item }">
          <NuxtLink :to="item.to" class="flex w-full">
            <span class="truncate">{{ item.label }}</span>

            <UIcon
              :name="item.icon"
              class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
            />
          </NuxtLink>
        </template>
      </UDropdown>
    </UChip>
  </div>
</template>
