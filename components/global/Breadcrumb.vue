<script setup lang="ts">
const route = useRoute();
const crumbs = ref<any[]>([]);
const { t } = useI18n();
const GenerateCrumbs = (fullPath: string) => {
  const params = fullPath.startsWith("/")
    ? fullPath.substring(1).split("/")
    : fullPath.split("/");

  let path = "";
  params.forEach((param) => {
    path = `${path}/${param}`;
    const label = param
      .split("-")
      .map((item) => Capitalize(t(item) ?? item))
      .join(" ");
    crumbs.value.push({
      label,
      to: path,
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
console.log(crumbs.value.length);
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
