<script setup lang="ts">
const { task } = useStory();

const steps = ["Writing ...", "Generating ...", "Imagination ..."];
</script>

<template>
  <div>
    <UProgress :value="task" :max="steps" indicator>
      <template #step-0="{ step }">
        <h2 class="text-4xl flex item-center text-green-500 mt-4">
          <UIcon name="i-heroicons-paint-brush mx-3" />
          {{ step }}
        </h2>
      </template>

      <template #step-1="{ step }">
        <h2 class="text-4xl flex item-center text-green-500 mt-4">
          <UIcon name="i-heroicons-beaker mx-3" />
          {{ step }}
        </h2>
      </template>

      <template #step-2="{ step }">
        <h2 class="text-4xl flex item-center text-green-500 mt-4">
          <UIcon name="i-heroicons-gift mx-3" />
          {{ step }}
        </h2>
      </template>
    </UProgress>
    <div class="mt-5">
      <AITextInput v-if="task == 0" />
      <AIStoryReview v-else-if="task == 1" />
      <AIImagineScene v-else-if="task == 2" />
    </div>
  </div>
</template>
