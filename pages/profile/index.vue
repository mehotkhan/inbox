<script setup lang="ts">
const { profile } = useUser();
</script>
<template>
  <section class="flex flex-col justify-center content-center pb-10">
    <UCard class="">
      <template #header>
        <div class="flex justify-between pt-5">
          <DashboardBreadcrumb />

          <div class="flex gap-4">
            <MemberUpdateProfile />
            <MemberWebauthModal />
          </div>
        </div>
      </template>
      <section class="flex flex-col node-page">
        <div
          class="flex flex-col-reverse md:flex-row justify-between items-center h-screen-sm pb-10"
        >
          <div
            class="basis-2/2 md:basis-1/2 flex-col justify-around items-center min-h-[18rem]"
          >
            <h2 class="">
              {{ profile.displayName }}
            </h2>
            <p>
              {{ profile.about }}
            </p>
            <div class="flex flex-row mt-0 list-none items-center gap-2">
              <span class="text-lg">
                <span class="font-bold text-xl"> # </span>
                کاربر عادی
              </span>
            </div>
          </div>
          <div class="basis-2/2 md:basis-1/2 flex justify-end items-center">
            <div
              class="w-48 h-48 bg-indigo-100 rounded-full shadow-2xl flex items-center justify-center text-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-24 w-24"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="flex border-t pt-2">
          <div class="basis-10/12 pl-4">
            <DashboardTable />
          </div>
          <div class="basis-2/12">
            <div class="sticky top-20 right-10 w-full flex">
              <DashboardSidebar />
            </div>
          </div>
        </div>
      </section>
    </UCard>
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
