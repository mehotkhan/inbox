<script lang="ts" setup>
const { isOwner } = useOwner();
</script>
<template>
  <UCard class="min-h-screen">
    <template #header>
      <div class="flex justify-between pt-5">
        <Breadcrumb />
        <div class="flex gap-4">
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
        </div>
      </div>
    </template>

    <CreateForm />
  </UCard>
</template>
