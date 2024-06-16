<script setup lang="ts">
const { createNew, newSchema, state, addPromps, deletePromps, submitting } =
  useStory();
</script>

<template>
  <UCard>
    <UForm
      :schema="newSchema"
      :state="state"
      class="space-y-4 text-left"
      @submit="createNew"
    >
      <UFormGroup label="Title" name="title">
        <UInput v-model="state.title" />
      </UFormGroup>

      <UFormGroup label="Story" name="story">
        <UTextarea
          v-model="state.story"
          class="w-full"
          :rows="10"
          placeholder="Tell Your Story..."
        />
      </UFormGroup>

      <UButton
        type="submit"
        block
        size="md"
        variant="outline"
        :loading="submitting"
      >
        Imaginations ...
      </UButton>
    </UForm>

    <template #footer>
      <h3 class="text-left text-xl mt-5 border-b border-b-gray-200 pb-3">
        Developer Area
        <UButton size="xs" color="indigo" variant="ghost" @click="addPromps"
          >Add another Promps</UButton
        >
      </h3>

      <div
        v-for="(promp, counter) in state.promps"
        class="text-left mt-5 border-b pb-3"
      >
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
