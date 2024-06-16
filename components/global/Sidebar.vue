<script setup lang="ts">
const menuItems = [
  [
    {
      label: "Home",
      to: "/",
      icon: "i-heroicons-home",
    },
    {
      label: "Creation",
      to: "/stories/drafts",
      icon: "i-heroicons-paint-brush",
    },

    {
      label: "Blog",
      to: "/blog",
      icon: "i-heroicons-megaphone",
      badge: 100,
    },
  ],
  [
    {
      label: "Admin Dash",
      to: "/profile/admin",
      icon: "i-heroicons-cog-6-tooth",
    },
  ],
];
</script>

<template>
  <UVerticalNavigation
    class=""
    :ui="{
      label: 'truncate relative',
      size: 'text-md',
      padding: 'py-4',
      badge: {
        base: 'flex-shrink-0 ml-auto relative rounded',
      },
      base: 'group relative flex items-center gap-1.5 focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-1 focus-visible:before:ring-primary-500 dark:focus-visible:before:ring-primary-400 before:absolute before:inset-px before:rounded-md disabled:cursor-not-allowed disabled:opacity-75',
    }"
    :links="menuItems"
  >
    <template #icon="{ link }">
      <UIcon :name="link.icon" class="text-2xl" />
    </template>
  </UVerticalNavigation>
</template>
