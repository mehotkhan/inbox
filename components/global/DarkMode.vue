<script setup>
const { isDark, toggleDark } = useDark();
</script>
<template>
  <div class="flex items-center">
    <UButton
      v-if="isDark"
      variant="link"
      class="text-md cursor-pointer"
      @click="toggleDark()"
    >
      <UIcon name="i-heroicons-moon" />
    </UButton>
    <UButton
      v-else
      variant="link"
      class="text-md cursor-pointer"
      @click="toggleDark()"
    >
      <UIcon name="i-heroicons-sun" />
    </UButton>
  </div>
</template>
