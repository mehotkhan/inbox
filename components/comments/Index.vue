<script setup lang="ts"></script>

<template>
  <section class="w-full min-h-20">
    <div class="flex justify-between items-center mb-3">
      <h3 class="text-xl font-semibold">{{ $t("Comments") }}</h3>
      <div>
        <SocialStreamFilters />
      </div>
    </div>
    <CommentsCreateForm />
    <CommentsLists />
  </section>
</template>

<style lang="scss" scoped>
h3 {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
