<script setup lang="ts">
const { state, backScene } = useStory();
</script>

<template>
  <UCard>
    <div>
      <p class="text-left mb-5"></p>
      <img :src="state.machineImagine" class="text-center w-full" />
    </div>
    <template #footer>
      <div class="flex gap-2">
        <div class="basis-2/12">
          <UButton block size="md" variant="outline" @click="backScene">
            Back
          </UButton>
        </div>
        <div class="basis-10/12">
          <UButton type="submit" block size="md" variant="outline">
            Publish Story
          </UButton>
        </div>
      </div>
    </template>
  </UCard>
</template>
