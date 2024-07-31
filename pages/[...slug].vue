<script lang="ts" setup>
useHead({
  title: "صفحه نخست",
});
// const { isOwner } = useOwner();
</script>
<template>
  <UCard class="min-h-screen">
    <!-- <template #header>
      <div class="flex justify-between pt-5">
        <Breadcrumb />
        <div class="flex gap-4">
          <span class="text-md font-thin"> ۶ کاربر آنلاین </span>

          <MemberWebauthModal />
        </div>
      </div> -->
    <!-- </template> -->
    <ContentDoc />
    <!-- <HomeAdmin v-if="isOwner" /> -->
    <!-- <HomePublic v-else /> -->
  </UCard>
</template>
