<script setup lang="ts">
const links = [
  {
    label: "داشبورد",
    to: "/profile",
    icon: "i-heroicons-home",
  },
  {
    label: "دیدگاه ها",
    to: "/profile/comments",
    icon: "i-heroicons-home",
  },
  {
    label: "سفارش ها",
    to: "/profile/orders",
    icon: "i-heroicons-home",
  },
  {
    label: "پیام ها",
    to: "/profile/messages",
    icon: "i-heroicons-home",
  },
];
</script>

<template>
  <UVerticalNavigation :links="links" class="w-full vertical-nav" />
</template>
<style lang="scss">
.vertical-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
