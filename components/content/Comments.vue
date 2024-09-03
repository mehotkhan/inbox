<script setup lang="ts">
const { createChannel } = useComments();
const { isDev } = useOwner();

onMounted(() => {
  createChannel();
});
</script>
<template>
  <section v-if="isDev" class="w-full min-h-20">
    <CommentsCreateForm />
    <CommentsLists />
  </section>
</template>
<style></style>
