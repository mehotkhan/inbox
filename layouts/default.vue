<script setup></script>
<template>
  <div class="flex-col flex">
    <slot name="app-before" />
    <div id="app-before"></div>
    <BaseHeader />
    <main class="flex min-h-screen mt-20">
      <div class="container">
        <div
          class="prose md:prose-xl dark:prose-invert leading-10 text-justify"
        >
          <slot />
        </div>
      </div>
      <slot name="app-after" />
      <div id="app-after"></div>
    </main>
  </div>
</template>

<style lang="scss">
.prose .content {
  img {
    margin: 0 auto;
    border: 1px solid #ddd;
    padding: 3px;
    border-radius: 3px;
    background: #f3f3f3;
  }
  pre {
    max-width: 100%;
    word-break: break-word;
    white-space: pre-wrap;
  }
}
</style>
