<script lang="ts" setup>
const { isDark } = useDark();
const { locale, t } = useI18n();
const { registerNew, whoAmI } = useUser();
const runtimeConfig = useRuntimeConfig();
import * as locales from '@nuxt/ui/locale'


const lang = computed(() => locales[locale.value].code)
const dir = computed(() => locales[locale.value].dir)

useHead({
  title: t("siteName"),
  titleTemplate: `%s - ${t("siteName")}:// ${t("description")} `,
  htmlAttrs: {
    lang,
    dir
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

// const dlocale=computed(()=>locale.value ==='fa'?'fa_ir':'en')
</script>
<template>
  <UApp  >
      <NuxtLayout class="dark:bg-slate-800">
        <NuxtLoadingIndicator />
        <NuxtPage />
      </NuxtLayout>
  </UApp>
</template>
<style>
@import "tailwindcss";
@import "@nuxt/ui";

</style>