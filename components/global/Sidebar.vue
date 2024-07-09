<script setup lang="ts">
defineProps({
  post: { type: Object, required: true, default: Function },
});
</script>
<template>
  <div class="w-full">
    <div class="flex flex-col p-5 h-full">
      <LazyContentToc :post="post" class="" />
    </div>
  </div>
</template>
