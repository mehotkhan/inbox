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
    <section class="flex flex-col flex h-screen relative">
      <Header />
      <div class="flex bg-gray-50 dark:bg-gray-900 overflow-hidden pt-20">
        <!-- Desktop sidebar -->
        <aside class="w-64 bg-white dark:bg-gray-800 md:bl">
          <DashboardSidebar />
        </aside>
        <div class="min-h-screen w-full overflow-y-auto">
          <slot />
        </div>
      </div>
      <slot name="app-after" />
      <div id="app-after"></div>
    </section>
    <SupportStart />
  </div>
</template>
