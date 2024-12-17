<script lang="ts" setup></script>
<template>
  <header
    class="sticky  w-full top-0 bg-gray-100 border-b-1 border-gray-200 dark:bg-slate-900 dark:border-slate-100"
  >
    <div
      class="flex flex-col md:flex-row container justify-between md:items-center py-4 gap-3 md:gap-0 mx-auto"
    >
      <div class="flex items-center">
        <LogoArea />
        <MainMenu class="text-md hidden md:text-sm md:contents" />
        <MobileMenu class="text-md md:hidden" />
      </div>
      <div class="flex gap-2 text-md items-center justify-end">
        <LanguageSelector class="" />
        <DarkMode class="" />
        <MemberAvatarButton />
      </div>
    </div>
  </header>
</template>
