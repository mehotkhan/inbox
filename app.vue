<script lang="ts" setup>
const { locale, t } = useI18n();
const { registerNew, whoAmI } = useUser();
const runtimeConfig = useRuntimeConfig();

const dir = computed(() => (locale.value === "en" ? "ltr" : "rtl"));

// console.log(dir.value, lang.value);
useHead({
  title: t("siteName"),
  titleTemplate: `%s - ${t("siteName")}:// ${t("description")} `,
  htmlAttrs: {
    lang: locale.value,
    dir,
  },
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: runtimeConfig.app.color },
    {
      hid: "description",
      name: "description",
      content: t("description"),
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
whoAmI();
onMounted(() => {
  registerNew();
});
</script>
<template>
  <UApp>
    <NuxtLayout class="dark:bg-slate-800">
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
<style>
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@import "@nuxt/ui";
:root {
  font-family: FarhangDot;
}
</style>
