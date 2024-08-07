<script setup lang="ts">
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});
</script>

<template>
  <NuxtLink
    v-for="loc in availableLocales"
    :key="loc.code"
    class="items-center flex pt-1"
    :to="switchLocalePath(loc.code)"
  >
    {{ loc.name }}
  </NuxtLink>
</template>
