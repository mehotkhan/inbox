<script lang="ts" setup></script>
<template>
  <ContentQuery v-slot="{ data }" :path="$route.path" find="one">
    <div
      class="flex flex-col-reverse md:flex-row justify-between items-center h-screen-md py-5"
    >
      <div class="basis-2/2 md:basis-1/2 flex-col justify-start items-center">
        <div class="items-center flex gap-3">
          <h1 class="">
            {{ data?.title }}
          </h1>
        </div>
        <p>
          {{ data?.description }}
        </p>
      </div>
      <div class="basis-2/2 md:basis-1/2 flex justify-end items-center">
        <nuxt-img
          v-if="data?.thumbnail"
          preload
          loading="lazy"
          sizes="sm:100vw md:50vw lg:400px"
          class="flex w-full max-w-[25rem]"
          :src="data?.thumbnail"
          :alt="data?.title"
          :placeholder="[400, 400]"
        />
      </div>
    </div>
  </ContentQuery>
</template>
