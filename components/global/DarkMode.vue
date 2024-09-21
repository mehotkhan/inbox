<script setup>
const { isDark, toggleDark } = useDark();
const isClient = ref(false);

onMounted(() => {
  isClient.value = true;
});
</script>

<template>
  <div class="flex items-center">
    <UButton
      v-if="isClient"
      variant="link"
      class="text-md cursor-pointer"
      @click="toggleDark()"
    >
      <UIcon :name="!isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'" />
    </UButton>
  </div>
</template>
