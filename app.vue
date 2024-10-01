<script lang="ts" setup>
const { isDark } = useDark();
const { locale, t } = useI18n();
const { registerNew, whoAmI } = useUser();
const runtimeConfig = useRuntimeConfig();
useHead({
  title: t("siteName"),
  titleTemplate: `%s - ${t("siteName")}:// ${t("description")} `,

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
onMounted(() => {
  registerNew();
  whoAmI();
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
      <UNotifications />
    </Body>
  </Html>
</template>
