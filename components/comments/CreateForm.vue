<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
const { sendComment } = useComments();
const state = reactive({
  message: undefined,
});

const schema = z.object({
  message: z.string().min(5),
});

type Schema = z.infer<typeof schema>;

const form = ref();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  sendComment(event.data.message);
}
</script>

<template>
  <UForm
    ref="form"
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UCard class="mb-10">
      <template #header> ارسال دیدگاه </template>
      <UFormGroup name="textarea" label="دیدگاه شما">
        <UTextarea v-model="state.message" />
      </UFormGroup>
      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton variant="outline" size="xl" type="submit"> ارسال </UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>
