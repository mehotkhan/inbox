<script setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
<template>
  <div class="flex items-center">
    <UButton
      variant="ghost"
      class="text-md cursor-pointer"
      @click="toggleDark()"
    >
      <UIcon v-if="!isDark" name="i-heroicons-moon" />
      <UIcon v-else name="i-heroicons-sun" />
    </UButton>
  </div>
</template>
