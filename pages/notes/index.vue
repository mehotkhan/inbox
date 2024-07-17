<script lang="ts" setup>
useHead({
  title: "صفحه نخست",
});
</script>
<template>
  <main>
    <IntroPost :banner="false" />
    <h3 class="border-b pb-3">جدیدترین ورودی‌ها</h3>
    <LazyLatestItems />
  </main>
</template>
