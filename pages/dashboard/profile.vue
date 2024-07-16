<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
const register = async () => {
  const todo = await $fetch("/api/register", {
    method: "POST",
    body: {
      // My todo data
    },
  });
};
</script>
<template>
  <section class="flex flex-col justify-center content-center min-h-screen">
    <section class="flex flex-col mt-80">
      <UButton @click="register()" variant="ghost"> Register </UButton>
    </section>
  </section>
</template>
