<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const options = [
  { label: "Option 1", value: "option-1" },
  { label: "Option 2", value: "option-2" },
  { label: "Option 3", value: "option-3" },
];

const state = reactive({
  input: undefined,
  inputMenu: undefined,
  textarea: undefined,
  select: undefined,
  selectMenu: undefined,
  checkbox: undefined,
  toggle: undefined,
  radio: undefined,
  radioGroup: undefined,
  switch: undefined,
  range: undefined,
});

const schema = z.object({
  input: z.string().min(10),
  inputMenu: z.any().refine((option) => option?.value === "option-2", {
    message: "Select Option 2",
  }),
  textarea: z.string().min(10),
  select: z.string().refine((value) => value === "option-2", {
    message: "Select Option 2",
  }),
  selectMenu: z.any().refine((option) => option?.value === "option-2", {
    message: "Select Option 2",
  }),
  toggle: z.boolean().refine((value) => value === true, {
    message: "Toggle me",
  }),
  checkbox: z.boolean().refine((value) => value === true, {
    message: "Check me",
  }),
  radio: z.string().refine((value) => value === "option-2", {
    message: "Select Option 2",
  }),
  radioGroup: z.string().refine((value) => value === "option-2", {
    message: "Select Option 2",
  }),
  range: z.number().max(20, { message: "Must be less than 20" }),
});

type Schema = z.infer<typeof schema>;

const form = ref();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data);
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
    <div class="flex border-b w-full justify-between pb-3 gap-3 items-end">
      <UFormGroup name="title" label="عنوان" class="basis-10/12" size="md">
        <UInput v-model="state.input" />
      </UFormGroup>
      <UFormGroup
        name="category"
        label="دسته بدنی"
        class="basis-2/12"
        size="md"
      >
        <USelect
          v-model="state.select"
          placeholder="Select..."
          :options="options"
        />
      </UFormGroup>
      <UButtonGroup
        orientation="horizontal"
        class="basis-1/12 flex justify-end h-10"
      >
        <UButton color="gray" type="submit" class="text-md"> انتشار </UButton>
        <!-- <UButton color="gray" class="ml-2" @click="form.clear()">
          Clear
        </UButton> -->
        <UButton icon="i-heroicons-chevron-down-20-solid" color="gray" />
      </UButtonGroup>
    </div>

    <UFormGroup name="body" label="محتوا">
      <UTextarea v-model="state.textarea" :rows="20" />
    </UFormGroup>
  </UForm>
</template>
