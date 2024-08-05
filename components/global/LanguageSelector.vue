<script setup>
const { locale } = useI18n();

const langs = [
  {
    name: "فارسی",
    value: "fa",
  },
  {
    name: "English",
    value: "en",
  },
];
</script>

<template>
  <USelect
    v-model="locale"
    :options="langs"
    variant="none"
    option-attribute="name"
  />
</template>
