<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { ref, reactive } from "vue";

const { sendComment, sending } = useComments();
const state = reactive({
  message: "",
});

const schema = z.object({
  message: z.string().min(5),
});

type Schema = z.infer<typeof schema>;

const form = ref();

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  await sendComment(event.data.message);
  state.message = "";
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    form.value?.submit();
  }
};
</script>

<template>
  <UForm
    ref="form"
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UCard class="mb-10 pb-10 border-b" :ui="{ shadow: 'shadow-none' }">
      <template #header>
        <div class="flex justify-between">
          <span> ارسال دیدگاه </span>
          <spa class="font-thin text-sm">۲ نفر در حال نوشتن ۰۰۰</spa>
        </div>
      </template>
      <UFormGroup name="textarea" label="دیدگاه شما">
        <UTextarea v-model="state.message" @keydown="handleKeyDown" />
      </UFormGroup>
      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton variant="outline" size="xl" type="submit" :loading="sending">
            ارسال
          </UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>
