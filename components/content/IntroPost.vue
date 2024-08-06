<script lang="ts" setup>
const props = defineProps({
  banner: { type: Boolean, required: false, default: true },
});
const { locale } = useI18n();
const data = await queryContent(locale.value + "/notes")
  .where({ banner: props.banner })
  .sort({ date: -1 })
  .findOne();
</script>
<template>
  <div>
    <ContentRenderer :value="data" class="">
      <div
        class="flex flex-col-reverse md:flex-row justify-between items-center h-screen-md"
      >
        <div class="basis-2/2 md:basis-1/2 flex-col justify-start items-center">
          <div class="items-center flex gap-3">
            <h2 class="">
              <NuxtLink :external="false" :to="data?._path" class="">
                {{ data?.title }}
              </NuxtLink>
            </h2>
          </div>

          <p>
            {{ data?.description }}
          </p>
          <ul class="flex flex-row mt-0 list-none items-center">
            <li key="category" class="text-lg">
              {{ data?.category }}
              <span class="font-bold text-sm">.</span>
            </li>
            <li key="link" class="text-lg underline">
              <NuxtLink :external="false" :to="data?._path" class="underline">
                {{ $t("more") }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="basis-2/2 md:basis-1/2 flex justify-end items-center">
          <nuxt-img
            preload
            loading="lazy"
            sizes="sm:100vw md:50vw lg:400px"
            class="flex max-h-[30rem]"
            :src="data?.thumbnail"
            :alt="data?.title"
            :placeholder="[300, 300]"
          />
        </div>
      </div>
    </ContentRenderer>
  </div>
</template>
