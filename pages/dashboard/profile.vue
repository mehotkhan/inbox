<script setup lang="ts">
const { profile } = useUser();

definePageMeta({
  layout: "dashboard",
});
const register = async () => {
  const todo = await $fetch("/api/register", {
    method: "POST",
    body: {
      // My todo data
    },
  });
};
const items = [
  {
    slot: "account",
    label: "Account",
  },
  {
    slot: "comments",
    label: "Comments",
  },
];
</script>

<template>
  <main class="h-full overflow-y-auto">
    <div class="container px-6 mx-auto grid mt-10">
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Profile
      </h2>
      <UCard class="">
        <template #header>
          <div class="grid grid-cols-1 md:grid-cols-3">
            <div
              class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0"
            >
              <div>
                <p class="font-bold text-gray-700 text-xl">0</p>
                <p class="text-gray-400">Story</p>
              </div>
              <div>
                <p class="font-bold text-gray-700 text-xl">0</p>
                <p class="text-gray-400">Drafts</p>
              </div>
            </div>
            <div class="relative">
              <div
                class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500"
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
            <div class="flex justify-end mt-32 md:mt-0 md:justify-end gap-4">
              <MemberUpdateProfile />
              <MemberWebauthModal />
            </div>
          </div>
        </template>
        <div class="mt-20 text-center pb-12">
          <h1 class="text-4xl font-medium text-gray-700">
            {{ profile.displayName }}
          </h1>
          <p class="font-light text-gray-600 mt-3">{{ profile.about }}</p>
        </div>
        <template #footer>
          <UTabs :items="items" class="pb-40">
            <template #account="{ item }"> basic details </template>
            <template #comments="{ item }">
              <DashboardTable />
            </template>
          </UTabs>
        </template>
      </UCard>
    </div>
  </main>
</template>
