<script setup lang="ts">
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
  <section class="flex flex-col justify-center content-center">
    <section class="flex flex-col mt-80">
      <UButton @click="register()" variant="ghost"> Register </UButton>
    </section>
  </section>
</template>
