<script lang="ts" setup>
const { welcomeMessage } = useSupport();

onMounted(() => {
  welcomeMessage();
});
</script>
<template>
  <div class="flex-col flex blog bg-gray-50 dark:bg-gray-800">
    <slot name="app-before" />
    <div id="app-before"></div>
    <Header />
    <main class="flex min-h-screen mt-[3rem]">
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
  <SupportStart />
  <!-- class="prose md:prose-xl dark:prose-invert leading-10 text-justify" -->
</template>
