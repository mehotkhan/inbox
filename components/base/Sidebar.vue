<script setup lang="ts">
defineProps({
  post: { type: Object, required: true, default: Function },
});
const { toggleSidebar, sidebarIsOpen } = useSidebar();
</script>
<template>
  <div class="w-full">
    <div class="flex flex-col p-5 h-full">
      <LazyBaseContentToc :post="post" class="" />
    </div>
  </div>
</template>
