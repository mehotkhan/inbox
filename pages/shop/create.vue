<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const options = [
  { label: "Option 1", value: "option-1" },
  { label: "Option 2", value: "option-2" },
  { label: "Option 3", value: "option-3" },
];

const state = reactive({
  title: undefined,
  category: undefined,
  body: undefined,
});

const schema = z.object({
  title: z.string().min(10),
  category: z.any().refine((option) => option?.value === "option-2", {
    message: "Select Option 2",
  }),
  body: z.string().min(10),
});

type Schema = z.infer<typeof schema>;

const form = ref();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data);
}

const editor = useEditor({
  content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
  extensions: [TiptapStarterKit],
});

onBeforeUnmount(() => {
  unref(editor).destroy();
});
</script>

<template>
  <div>
    <UForm
      ref="form"
      :schema="schema"
      :state="state"
      class="space-y-4 border-b"
      @submit="onSubmit"
    >
      <div class="flex w-full justify-between pb-3 gap-3 items-end">
        <UFormGroup name="title" label="عنوان" class="basis-10/12" size="md">
          <UInput v-model="state.title" />
        </UFormGroup>
        <UFormGroup
          name="category"
          label="دسته بدنی"
          class="basis-2/12"
          size="md"
        >
          <USelect
            v-model="state.category"
            placeholder="Select..."
            :options="options"
          />
        </UFormGroup>
        <UButtonGroup
          orientation="horizontal"
          class="basis-1/12 flex justify-end h-10"
        >
          <UButton
            icon="i-heroicons-check"
            color="gray"
            type="submit"
            class="text-md"
            >انتشار</UButton
          >
          <UButton icon="i-heroicons-chevron-down" color="gray"/>
        </UButtonGroup>
      </div>
    </UForm>

    <div v-if="editor">
      <UButton
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
        icon="i-heroicons-bold"
        variant="link"
        @click="editor.chain().focus().toggleBold().run()"
      />
      <UButton
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
        icon="i-heroicons-italic"
        variant="link"
        @click="editor.chain().focus().toggleItalic().run()"
      />
      <UButton
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strikethrough') }"
        icon="i-heroicons-minus"
        variant="link"
        @click="editor.chain().focus().toggleStrike().run()"
      />
      <UButton
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
        icon="i-heroicons-code-bracket"
        variant="link"
        @click="editor.chain().focus().toggleCode().run()"
      />
      <UButton
        icon="i-heroicons-x-mark"
        variant="link"
        @click="editor.chain().focus().unsetAllMarks().run()"
      />
      <UButton
        icon="i-heroicons-x-circle"
        variant="link"
        @click="editor.chain().focus().clearNodes().run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('paragraph') }"
        icon="i-heroicons-document-text"
        variant="link"
        @click="editor.chain().focus().setParagraph().run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        icon="i-heroicons-heading-1"
        variant="link"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        icon="i-heroicons-heading-2"
        variant="link"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        icon="i-heroicons-heading-3"
        variant="link"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        icon="i-heroicons-heading-4"
        variant="link"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        icon="i-heroicons-heading-5"
        variant="link"
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        icon="i-heroicons-heading-6"
        variant="link"
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('bulletList') }"
        icon="i-heroicons-list-bullet"
        variant="link"
        @click="editor.chain().focus().toggleBulletList().run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('orderedList') }"
        icon="i-heroicons-list-ordered"
        variant="link"
        @click="editor.chain().focus().toggleOrderedList().run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('codeBlock') }"
        icon="i-heroicons-code-block"
        variant="link"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('blockquote') }"
        icon="i-heroicons-quote"
        variant="link"
        @click="editor.chain().focus().toggleBlockquote().run()"
      />
      <UButton
        icon="i-heroicons-minus"
        variant="link"
        @click="editor.chain().focus().setHorizontalRule().run()"
      />
      <UButton
        icon="i-heroicons-arrow-right"
        variant="link"
        @click="editor.chain().focus().setHardBreak().run()"
      />
      <UButton
        :disabled="!editor.can().chain().focus().undo().run()"
        icon="i-heroicons-arrow-uturn-left"
        variant="link"
        @click="editor.chain().focus().undo().run()"
      />
      <UButton
        :disabled="!editor.can().chain().focus().redo().run()"
        icon="i-heroicons-arrow-uturn-right"
        variant="link"
        @click="editor.chain().focus().redo().run()"
      />
    </div>
    <TiptapEditorContent :editor="editor" class="min-h-[30rem]" />
  </div>
</template>
