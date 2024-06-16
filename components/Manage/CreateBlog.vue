<script setup lang="ts">
const { createNewBlog, newBlogSchema, newBlogState, submitting } = useManage();
</script>

<template>
  <UCard>
    <UForm
      :schema="newBlogSchema"
      :state="newBlogState"
      class="space-y-4 text-left"
      @submit="createNewBlog"
    >
      <UFormGroup label="Title" name="title">
        <UInput v-model="newBlogState.title" />
      </UFormGroup>

      <UFormGroup label="Summery" name="summery">
        <UInput
          v-model="newBlogState.summery"
          class="w-full"
          :rows="10"
          placeholder="summery"
        />
      </UFormGroup>
      <UFormGroup label="Body" name="body">
        <UTextarea
          v-model="newBlogState.body"
          class="w-full"
          :rows="10"
          placeholder="Tell Your Blog..."
        />
      </UFormGroup>

      <UButton
        type="submit"
        block
        size="md"
        variant="outline"
        :loading="submitting"
      >
        Publish
      </UButton>
    </UForm>
  </UCard>
</template>
