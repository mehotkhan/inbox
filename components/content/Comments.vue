<script setup lang="ts">
const { createChannel } = useComments();
onMounted(() => {
  createChannel();
});
</script>
<template>
  <section class="w-full min-h-20">
    <CommentsCreateForm />
    <CommentsLists />
  </section>
</template>
<style></style>
