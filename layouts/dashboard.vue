<template>
  <div class="flex-col flex">
    <slot name="app-before" />
    <div id="app-before"></div>
    <header
      class="fixed w-full top-0 bg-white bl z-10 border-b-2 border-gray-200 dark:border-slate-800 shadow-sm dark:bg-slate-900"
    >
      <div class="flex justify-between items-center py-4 px-[3rem]">
        <div class="flex items-center">
          <DashboardNavbar class="text-md hidden md:text-sm lg:contents" />
          <!-- <Notifications /> -->
        </div>
        <div class="flex gap-3">
          <BaseToolsMenu />
        </div>
      </div>
    </header>
    <Suspense>
      <section class="flex pb-[2rem] pt-[7rem] px-[3rem]">
        <aside class="basis-1/12 mx-3">
          <DashboardAppsMenu class="sticky top-[7rem]" />
        </aside>

        <div class="basis-11/12 flex min-h-screen relative">
          <div class="w-full absolute left-0 right-0">
            <slot />
          </div>
        </div>
      </section>
    </Suspense>
    <slot name="app-after" />
    <div id="app-after"></div>
    <ContactStart />
  </div>
</template>
