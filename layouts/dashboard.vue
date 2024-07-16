<script lang="ts" setup>
const { welcomeMessage } = useSupport();
const isSideMenuOpen = ref(false);
const togglePagesMenu = ref(false);
onMounted(() => {
  welcomeMessage();
});
</script>
<template>
  <div class="flex-col flex">
    <slot name="app-before" />
    <div id="app-before"></div>
    <Header />
    <section class="flex flex-col flex min-h-screen mt-[4rem]">
      <div
        class="flex bg-gray-50 dark:bg-gray-900"
        :class="{ 'overflow-hidden': isSideMenuOpen }"
      >
        <!-- Desktop sidebar -->
        <aside
          class="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0"
        >
          <div class="py-4 text-gray-500 dark:text-gray-400">
            <DashboardSidebar />
          </div>
        </aside>
        <slot />
      </div>
      <slot name="app-after" />
      <div id="app-after"></div>
    </section>
    <SupportStart />
  </div>
</template>
