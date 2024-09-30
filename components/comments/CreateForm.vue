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
  <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit">
    <UCard
      class="border rounded-md mb-10"
      :ui="{
        shadow: 'shadow-none',
        body: { padding: 'px-4 pt-3 pb-0 sm:p-3' },
        footer: { padding: 'px-3 py-2 sm:px-3' },
      }"
    >
      <UFormGroup name="textarea">
        <UTextarea
          v-model="state.message"
          :placeholder="$t('Write Your Comment')"
          :padded="false"
          variant="ghost"
          class="w-full mt-2"
          size="lg"
          autoresize
          @keydown="handleKeyDown"
        />
      </UFormGroup>
      <UDivider />
      <template #footer>
        <div class="flex justify-end">
          <UButton
            variant="outline"
            size="md"
            color="gray"
            type="submit"
            :loading="sending"
            :ui="{ rounded: 'rounded-md' }"
          >
            {{ $t("Send Comment") }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>
