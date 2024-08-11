<script lang="ts">
const { locale } = useI18n();
</script>
<template>
  <h1 class="flex text-2xl items-center mx-5 font-FarhangDot">
    <NuxtLink :to="`/${locale}`">
      <div class="flex items-baseline">
        <div class="font-hairline">
          {{ $t("titleFirst") + "" }}
        </div>
        <div class="font-bold">
          {{ $t("titleSecond") }}
        </div>
        <div class="font-hairline text-xl mx-1">://</div>
        <div class="font-hairline text-xl">
          {{ "" + $t("description") }}
        </div>
      </div>
    </NuxtLink>
  </h1>
</template>
