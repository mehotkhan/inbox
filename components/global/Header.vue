<script lang="ts" setup></script>
<template>
  <header
    class="sticky w-full top-0 bg-gray-50 z-10 border-b-1 border-gray-200 dark:bg-slate-900 dark:border-slate-100"
  >
    <div
      class="flex flex-col md:flex-row container justify-between md:items-center py-4 gap-3 md:gap-0"
    >
      <div class="flex items-center">
        <LogoArea />
        <MainMenu class="text-md hidden md:text-sm md:contents" />
      </div>
      <div class="flex gap-2 text-md items-center justify-end">
        <LanguageSelector class="" />
        <DarkMode class="" />
        <MobileMenu class="text-md md:hidden" />
        <MemberAvatarButton />
      </div>
    </div>
  </header>
</template>
