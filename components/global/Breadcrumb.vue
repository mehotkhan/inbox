<script setup lang="ts">
const route = useRoute();
const { t, locale } = useI18n();
const crumbs = ref([
  {
    label: "^_^",
    to: "/",
  },
]);
const GenerateCrumbs = (fullPath: string) => {
  const params = fullPath.startsWith("/")
    ? fullPath.substring(4).split("/")
    : fullPath.split("/");
  let path = "";
  params
    .filter((item) => (item.length > 1 ? item : undefined))
    .forEach((param) => {
      path = `${path}/${param}`;
      const label = param
        .split("-")
        .map((item) => Capitalize(item))
        .join(" ");
      crumbs.value.push({
        label,
        to: "/" + locale.value + path,
      });
    });
};
// init
GenerateCrumbs(route.fullPath);
const nowRoute = computed(() => route.fullPath);
watch(nowRoute, (newRoute) => {
  crumbs.value = [];
  GenerateCrumbs(newRoute);
});
</script>

<template>
  <div>
    <UBreadcrumb v-if="crumbs.length >= 2" :links="crumbs" class="breadcrumb" />
    <div v-else />
  </div>
</template>
<style lang="scss">
.breadcrumb {
  ol {
    padding: 0 !important;
    margin: 0 !important;
  }
}
</style>
