<script setup lang="ts">
const { sidebarEnabled } = useSidebar();
onMounted(() => {
  sidebarEnabled.value = true;
});
onUnmounted(() => {
  sidebarEnabled.value = false;
});
</script>
<template>
  <section class="flex flex-col justify-center content-center pb-10">
    <ContentDoc>
      <template #default="{ doc }">
        <section
          class="flex flex-col node-page"
          :class="doc?.dir === 'ltr' ? 'ltr' : 'rtl'"
        >
          <div
            class="flex flex-col-reverse md:flex-row justify-between items-center h-screen-sm border-b pb-10"
          >
            <div
              class="basis-2/2 md:basis-1/2 flex-col justify-start items-center"
            >
              <h2 class="">
                {{ doc?.title }}
              </h2>
              <p>
                {{ doc?.description }}
              </p>
              <div class="flex flex-row mt-0 list-none items-center gap-2">
                <span v-for="tag in doc?.tags" :key="tag" class="text-lg">
                  <span class="font-bold text-xl"> # </span>
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="basis-2/2 md:basis-1/2 flex justify-end items-center">
              <nuxt-img
                preload
                loading="lazy"
                sizes="sm:100vw md:50vw lg:400px"
                class="flex max-h-[30rem]"
                :src="doc?.thumbnail"
                :alt="doc?.title"
              />
            </div>
          </div>
          <div class="flex">
            <div class="basis-8/12 pl-4">
              <ContentRenderer :value="doc" class="content mb-10" />
              <LazyComments />
            </div>

            <div class="basis-4/12 pr-4">
              <div class="sticky top-10 right-10 w-full flex justify-end">
                <LazyBaseSidebar :post="doc" />
              </div>
            </div>
          </div>
        </section>
      </template>
    </ContentDoc>
  </section>
</template>
<style lang="scss">
.content {
  h1,
  h2,
  h3,
  h4 {
    scroll-margin-top: 7rem;
  }
}
</style>
