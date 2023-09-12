<script setup lang="ts">
defineProps({
  post: { type: Object, required: true, default: Function },
});
const { toggleSidebar, sidebarIsOpen } = useSidebar();
</script>
<template>
  <div class="w-full">
    <USlideover
      v-model="sidebarIsOpen"
      :side="post.dir === 'ltr' ? 'right' : 'left'"
      :transition="false"
      :ui="{
        width: 'w-10 max-w-[70%] md:max-w-md',
      }"
    >
      <div class="flex flex-col p-5 h-full">
        <div
          class="flex w-full justify-between"
          :class="post.dir !== 'ltr' ? 'flex-row' : 'flex-row-reverse'"
        >
          <span class="block">
            {{ post.title }}
          </span>
          <UButton
            label="بستن"
            class="block text-black z-50 w-10"
            variant="ghost"
            @click="toggleSidebar()"
          />
        </div>
        <div class="mt-5 border-t pt-5 h-full">
          <LazyBaseContentToc :post="post" class="" />
        </div>
      </div>
    </USlideover>
  </div>
</template>
