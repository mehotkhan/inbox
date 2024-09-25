<script setup lang="ts">
const { currentComments } = useComments();
</script>

<template>
  <div class="flex w-full flex-col">
    <UCard
      v-for="comment in currentComments"
      :key="comment.id"
      class="text-base dark:bg-gray-900 mb-10 w-full"
      :ui="{
        ring: 'ring-0',
        shadow: 'shadow-none',
        base: 'border-r-4 border-primary',
        rounded: 'rounded-sm',
      }"
    >
      <template #header>
        <div class="w-full flex justify-between">
          <div class="flex items-center gap-2">
            <UAvatar
              chip-color="primary"
              chip-text=""
              chip-position="top-right"
              src="/totoro_render.webp"
              size="sm"
              class="avatar-button"
            />
            <span> userName </span>
          </div>
          <div class="flex gap-2">
            <span class="font-thin text-xs">
              {{ comment.seen ? $t("Send") : $t("Sending") }}</span
            >
            <span class="font-thin text-xs">
              {{ eventFormatTimeAgo(comment.created_at) }}</span
            >
          </div>
        </div>
      </template>
      <p class="text-gray-500 dark:text-gray-400">
        {{ comment.content }}
      </p>
      <template #footer>
        <div class="flex justify-end gap-3">پاسخ</div>
      </template>
    </UCard>
  </div>
</template>
