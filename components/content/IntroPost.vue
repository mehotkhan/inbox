<script lang="ts" setup>
const { locale } = useI18n();
const config = useRuntimeConfig();
</script>
<template>
  <div>
    <ContentQuery
      v-slot="{ data }"
      :path="locale ?? config.app.language"
      find="one"
      :where="{ banner: true }"
      :sort="{ date: -1 }"
    >
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
            class="flex w-full max-w-[25rem]"
            :src="data?.thumbnail"
            :alt="data?.title"
            :placeholder="[400]"
          />
        </div>
      </div>
    </ContentQuery>
  </div>
</template>
