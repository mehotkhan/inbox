<script lang="ts" setup>
import * as locales from '@nuxt/ui/locale';
const { locale, t } = useI18n();
const { registerNew, whoAmI } = useUser();
const runtimeConfig = useRuntimeConfig();

const lang = computed(() => locales[locale.value]?.code ?? 'fa')
const dir = computed(() => locales[locale.value]?.dir ??'rtl')

 
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
  <UApp :locale="locales[locale]" >
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