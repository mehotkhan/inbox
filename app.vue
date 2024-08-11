<script lang="ts" setup>
const { isDark } = useDark();
const { locale } = useI18n();
const { registerNew } = useUser();
const runtimeConfig = useRuntimeConfig();
useHead({
  title: runtimeConfig.app.title,
  titleTemplate: `%s - ${runtimeConfig.app.title}:// ${runtimeConfig.app.description} `,

  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: runtimeConfig.app.color },
    {
      hid: "description",
      name: "description",
      content: runtimeConfig.app.description,
    },
  ],

  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      href: "/icon.png",
    },
  ],
});
onMounted(() => {
  registerNew();
});
</script>
<template>
  <Html
    :dir="locale === 'fa' ? 'rtl' : 'ltr'"
    :lang="locale"
    :class="isDark ? 'dark' : 'light'"
  >
    <Body class="dark:bg-slate-800">
      <NuxtLayout>
        <!-- <SeoKit /> -->
        <NuxtLoadingIndicator />
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
