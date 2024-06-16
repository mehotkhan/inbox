<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { object, string, type InferType } from "yup";
const toast = useToast();
const submitting = ref(false);
const machineResponse = ref("");
const schema = object({
  title: string().min(8, "Must be at least 8 characters").required("Required"),
  story: string().min(8, "Must be at least 8 characters").required("Required"),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  title: "its just simple story",
  story: "cyberpunk cat",
});

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  submitting.value = true;
  const body: any = await useApi("/api/deepai", {
    method: "post",
    body: { title: event.data.title, story: event.data.story },
  });
  console.log(body);
  toast.add({
    title: body.title,
    description: "come from machine",
  });
  machineResponse.value = body.response;
  submitting.value = false;
};
</script>

<template>
  <UCard>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
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

      <UButton type="submit" size="xl" :loading="submitting"> Submit </UButton>
    </UForm>
    <template v-if="machineResponse.length > 0" #footer>
      <div>
        <p class="text-left mb-5">From Machine :<br /></p>
        <img :src="machineResponse" class="text-center w-full" />
      </div>
    </template>
  </UCard>
</template>
