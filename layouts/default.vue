<script lang="ts" setup>
const { isOwner } = useOwner();
// const { welcomeMessage } = useSupport();

// onMounted(() => {
//   welcomeMessage();
// });
</script>
<template>
  <div class="flex-col flex blog bg-gray-50 dark:bg-gray-800">
    <slot name="app-before" />
    <div id="app-before" />
    <Header />
    <main class="flex min-h-screen mt-[3rem]">
      <div class="container">
        <div
          class="prose md:prose-xl dark:prose-invert leading-10 text-justify"
        >
          <section class="flex flex-col justify-center content-center pb-10">
            <UCard class="">
              <template #header>
                <div class="flex justify-between pt-5">
                  <Breadcrumb />
                  <div class="flex gap-4">
                    <span class="text-md font-thin"> ۶ کاربر آنلاین </span>

                    <MemberWebauthModal />
                  </div>
                </div>
              </template>
              <slot />
            </UCard>
          </section>
        </div>
      </div>
      <slot name="app-after" />
      <div id="app-after" />
    </main>
    <SupportStart />
    <div
      class="fixed right-2 bottom-2 bg-gray-200 w-20 py-3 rounded items-center flex justify-around flex-col gap-1"
    >
      <span class="text-md text-black">مدیر؟</span>
      <UToggle
        v-model="isOwner"
        color="green"
        size="xl"
        title="is Admin"
        on-icon="i-heroicons-check-20-solid"
        off-icon="i-heroicons-x-mark-20-solid"
      />
    </div>
  </div>
</template>
