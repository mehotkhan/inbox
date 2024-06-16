<script setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
<template>
  <ClientOnly>
    <div class="flex items-center">
      <UButton
        variant="ghost"
        class="text-md"
        :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
        @click="toggleDark()"
      >
      </UButton>
    </div>
  </ClientOnly>
</template>
