<script lang="ts" setup>
const { isOwner } = useOwner();

useHead({
  title: "فروشگاه",
});
</script>
<template>
  <main>
    <IntroPost :banner="false" />
    <div class="border-b pb-3 flex justify-between w-full items-end">
      <h3>جدیدترین ورودی‌ها</h3>
      <UButton v-if="isOwner" variant="outline" size="xl" to="/shop/create">
        افزودن کالا
      </UButton>
    </div>
    <LazyLatestItems />
  </main>
</template>
<style lang="scss" scoped>
h3 {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
