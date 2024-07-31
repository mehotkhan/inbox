<script lang="ts" setup>
const { isOwner } = useOwner();
</script>
<template>
  <UCard class="min-h-screen">
    <template #header>
      <div class="flex justify-between pt-5">
        <Breadcrumb />
        <div class="flex gap-4 items-center">
          <UButton
            v-if="isOwner"
            label="افزودن یادداشت"
            size="md"
            color="primary"
            variant="ghost"
            to="/create"
          />
          <UButton
            v-if="isOwner"
            label="افزودن محصول"
            size="md"
            color="primary"
            variant="ghost"
            to="/create"
          />
          <span class="text-[.98rem]"> ۶ کاربر آنلاین </span>
        </div>
      </div>
    </template>
    <ContentDoc />
    <template #footer>
      <div class="flex justify-between pt-5">مثلا کپی رایت :)</div>
    </template>
  </UCard>
</template>
