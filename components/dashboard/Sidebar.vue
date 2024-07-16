<script setup lang="ts">
const links = [
  {
    label: "داشبورد",
    to: "/dashboard",
    icon: "i-heroicons-home",
  },
  {
    label: "دیدگاه ها",
    to: "/dashboard/comments",
    icon: "i-heroicons-home",
  },
  {
    label: "سفارش ها",
    to: "/dashboard/orders",
    icon: "i-heroicons-home",
  },
  {
    label: "پیام ها",
    to: "/dashboard/messages",
    icon: "i-heroicons-home",
  },
  {
    label: "پروفایل",
    to: "/dashboard/profile",
    icon: "i-heroicons-home",
  },
];
</script>

<template>
  <UVerticalNavigation :links="links" />
</template>
