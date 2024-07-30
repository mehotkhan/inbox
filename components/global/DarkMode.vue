<script setup>
const { isDark, toggleDark } = useDark();
</script>
<template>
  <div class="flex items-center">
    <UButton
      variant="ghost"
      class="text-md cursor-pointer"
      @click="toggleDark()"
    >
      <UIcon v-if="isDark" name="i-heroicons-sun" />
      <UIcon v-else name="i-heroicons-moon" />
    </UButton>
  </div>
</template>
