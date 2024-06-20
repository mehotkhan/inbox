<script setup lang="ts">
const { allComments } = useComments();

watch(allComments, () => {
  console.log(allComments.value);
});
</script>

<template>
  <div class="flex w-full">
    <UCard
      v-for="comment in allComments"
      :key="comment.id"
      class="p-6 text-base bg-white rounded-lg dark:bg-gray-900 mb-10 w-full"
    >
      <template #header>
        <div class="w-full flex justify-between">
          <div class="flex items-center">
            <p
              class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"
            >
              <img
                class="mr-2 w-4 h-4 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                alt="Michael Gough"
              />Michael Gough
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              <time pubdate datetime="2022-02-08" title="February 8th, 2022"
                >Feb. 8, 2022</time
              >
            </p>
          </div>
          <button
            id="dropdownComment1Button"
            data-dropdown-toggle="dropdownComment1"
            class="inline-flex items-center text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <span class="sr-only">Comment settings</span>
          </button>
          <!-- Dropdown menu -->
          <div
            id="dropdownComment1"
            class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              class="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownMenuIconHorizontalButton"
            >
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Edit</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Remove</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Report</a
                >
              </li>
            </ul>
          </div>
        </div>
      </template>
      <p class="text-gray-500 dark:text-gray-400">
        {{ comment.text }}
      </p>
      <template #footer>
        <div class="flex justify-end gap-3">
          <button
            type="button"
            class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
          >
            <svg
              class="mr-1.5 w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 18"
            ></svg>
            Reply
          </button>
        </div>
      </template>
    </UCard>
  </div>
</template>
