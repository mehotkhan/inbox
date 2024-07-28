<script setup lang="ts">
const { profile } = useUser();
</script>

<template>
  <main>
    <!-- poster section -->
    <div
      class="flex flex-col-reverse md:flex-row justify-between items-center h-screen-sm pb-10"
    >
      <div
        class="basis-2/2 md:basis-1/2 flex-col justify-around items-center min-h-[18rem]"
      >
        <h2 class="">
          {{ profile?.displayName }}
        </h2>
        <p>
          {{ profile?.about }}
        </p>
        <div class="flex flex-row mt-0 list-none items-center gap-2">
          <span class="text-lg">
            <span class="font-bold text-xl"> # </span>
            کاربر عادی
          </span>
        </div>
      </div>
      <div class="basis-2/2 md:basis-1/2 flex justify-end items-center">
        <nuxt-img
          preload
          loading="lazy"
          sizes="sm:100vw md:50vw lg:400px"
          class="flex w-[20rem] rounded-full"
          src="https://avatars.githubusercontent.com/u/739984?v=4"
          :alt="profile.displayName"
          :placeholder="[300, 300]"
        />
      </div>
    </div>
    <!-- /poster section -->

    <!--content section -->
    <div class="flex border-t pt-2">
      <DashboardTable />
    </div>
    <!-- /content section -->
  </main>
</template>
