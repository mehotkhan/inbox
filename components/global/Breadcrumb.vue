<script setup lang="ts">
const route = useRoute();
const crumbs = ref<any[]>([]);

const GenerateCrumbs = (fullPath: string) => {
  crumbs.value.push({
    label: "خانه",
    to: "/",
  });
  const params = fullPath.startsWith("/")
    ? fullPath.substring(1).split("/")
    : fullPath.split("/");

  let path = "";
  params.forEach((param) => {
    path = `${path}/${param}`;
    const label = param
      .split("-")
      .map((item) => Capitalize(item))
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
</script>

<template>
  <UBreadcrumb :links="crumbs" class="breadcrumb" />
</template>
<style lang="scss">
.breadcrumb {
  ol {
    padding: 0 !important;
    margin: 0 !important;
  }
}
</style>
