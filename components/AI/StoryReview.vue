<script setup lang="ts">
const {
  Imagination,
  imagineSchema,
  state,
  addPromps,
  deletePromps,
  submitting,
  backScene,
} = useStory();
</script>

<template>
  <UCard>
    <UForm
      :schema="imagineSchema"
      :state="state"
      class="space-y-4 text-left"
      @submit="Imagination"
    >
      <UFormGroup label="Machine" name="machineResponse">
        <UTextarea
          v-model="state.machineStory"
          class="w-full"
          :rows="20"
          placeholder="Machine Response"
        />
      </UFormGroup>
      <div class="flex gap-2">
        <div class="basis-2/12">
          <UButton block size="md" variant="outline" @click="backScene">
            Back
          </UButton>
        </div>
        <div class="basis-10/12">
          <UButton
            type="submit"
            block
            size="md"
            variant="outline"
            :loading="submitting"
          >
            Generating Scene
          </UButton>
        </div>
      </div>
    </UForm>

    <template #footer>
      <h3 class="text-left text-xl mt-5 border-b border-b-gray-200 pb-3">
        Developer Area
        <UButton size="xs" color="indigo" variant="ghost" @click="addPromps"
          >Add another Promps</UButton
        >
      </h3>

      <div v-for="(promp, counter) in state.promps" class="text-left mt-5 pb-3">
        <UFormGroup
          :label="'Promp : ' + counter"
          :name="'promp-' + counter"
          class="mb-2"
        >
          <UTextarea v-model="promp.promp" class="w-full" :rows="5" />
        </UFormGroup>
        <UButton
          size="xs"
          color="red"
          variant="ghost"
          @click="deletePromps(counter)"
          >Delete Promp</UButton
        >
      </div>
    </template>
  </UCard>
</template>
