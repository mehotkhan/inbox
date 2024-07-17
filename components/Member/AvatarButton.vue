<script setup>
const { profile } = useUser();

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
      label: "حساب کاربری",
      icon: "i-heroicons-user",
      to: "profile",
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
const { registerNew } = useUser();

onMounted(() => {
  registerNew();
});
</script>

<template>
  <ClientOnly>
    <div class="relative flex">
      <UDropdown
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
      >
        <UAvatar :alt="profile.displayName" size="sm" />

        <template #account="{ item }">
          <div class="text-right w-full">
            <p>ورود به عنوان</p>
            <p class="truncate font-medium text-gray-900 dark:text-white">
              {{ profile.displayName }}
            </p>
          </div>
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
    </div>
  </ClientOnly>
</template>
