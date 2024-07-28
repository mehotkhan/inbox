<script lang="ts" setup>
useHead({
  title: "صفحه نخست",
});
const { isOwner } = useOwner();
</script>
<template>
  <HomeAdmin v-if="isOwner" />
  <HomePublic v-else />
</template>
