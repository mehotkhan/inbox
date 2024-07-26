<script setup lang="ts">
const { createChannel } = useComments();
</script>
<template>
  <div class="w-full min-h-20 border-t">
    <section class="">
      <h3 id="comments">
        <a href="#comments"> دیدگاه‌ها </a>
        <UButton variant="outline" @click="createChannel()">
          Create Group
        </UButton>
      </h3>
      <CommentsCreateForm />
      <CommentsLists />
    </section>
  </div>
</template>
<style></style>
