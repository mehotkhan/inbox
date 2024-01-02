<script setup>
const { locale } = useI18n();
const langs = ['fa', 'en']
</script>

<template>
    <USelect v-model="locale" :options="langs" variant="none" :placeholder="locale" />
</template>

