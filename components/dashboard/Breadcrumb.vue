<script setup lang="ts">
const links = [
  {
    label: "خانه",
    to: "/",
  },
  {
    label: "پروفایل",
    to: "/profile",
  },
];
</script>

<template>
  <UBreadcrumb :links="links" class="breadcrumb" />
</template>
<style lang="scss">
.breadcrumb {
  ol {
    padding: 0 !important;
    margin: 0 !important;
  }
}
</style>
