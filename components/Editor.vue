<script setup lang="ts">
import Placeholder from "@tiptap/extension-placeholder";
import { BubbleMenu } from "@tiptap/vue-3";

const props = defineProps({
  body: { type: String, required: true, default: "" },
});

// type-based (TS)
const emit = defineEmits<{
  (e: "update", value: string): void;
}>();

const editor = useEditor({
  content: props.body,
  extensions: [
    TiptapStarterKit,
    BubbleMenu,
    Placeholder.configure({
      placeholder: "چیزی بنویسید ...",
    }),
  ],
  onUpdate({ editor }) {
    console.log("new data", editor.getHTML());
    emit("update", editor.getHTML());
    // The content has changed.
  },
});

onBeforeUnmount(() => {
  unref(editor).destroy();
});
</script>

<template>
  <div v-if="editor">
    <bubble-menu :editor="editor" :tippy-options="{ duration: 100 }">
      <UButtonGroup
        class="flex justify-center bg-yellow-200 rounded-md p-1"
        size="md"
      >
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
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          icon="i-heroicons-h1"
          variant="link"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        />
        <UButton
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          icon="i-heroicons-h2"
          variant="link"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        />
        <UButton
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
          icon="i-heroicons-h3"
          variant="link"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        />
      </UButtonGroup>
    </bubble-menu>
    <UButtonGroup
      class="flex justify-center text-cyan-800 bg-gray-100 border-gray-50 border-y rounded-none"
      size="md"
    >
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
        icon="i-heroicons-h1"
        variant="link"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        icon="i-heroicons-h2"
        variant="link"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        icon="i-heroicons-h3"
        variant="link"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      />

      <UButton
        :class="{ 'is-active': editor.isActive('bulletList') }"
        icon="i-heroicons-list-bullet"
        variant="link"
        @click="editor.chain().focus().toggleBulletList().run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('orderedList') }"
        icon="i-heroicons-numbered-list"
        variant="link"
        @click="editor.chain().focus().toggleOrderedList().run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('codeBlock') }"
        icon="i-heroicons-code-bracket"
        variant="link"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      />
      <UButton
        :class="{ 'is-active': editor.isActive('blockquote') }"
        icon="i-heroicons-chat-bubble-bottom-center-text"
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
    </UButtonGroup>

    <TiptapEditorContent :editor="editor" class="min-h-[30rem] mt-10" />
  </div>
</template>
<style lang="scss">
/* Basic editor styles */
.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  /* Code and preformatted text styles */
  code {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: "JetBrainsMono", monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }

  p.is-empty::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    height: 0;
    pointer-events: none;
  }

  p.is-editor-empty:first-child::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    height: 0;
    pointer-events: none;
  }
}
/* Bubble menu */
.bubble-menu {
  background-color: var(--white);
  border: 1px solid var(--gray-1);
  border-radius: 0.7rem;
  box-shadow: var(--shadow);
  display: flex;
  padding: 0.2rem;

  button {
    background-color: unset;

    &:hover {
      background-color: var(--gray-3);
    }

    &.is-active {
      background-color: var(--purple);

      &:hover {
        background-color: var(--purple-contrast);
      }
    }
  }
}
</style>
