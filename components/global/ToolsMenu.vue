<script setup></script>
<template>
  <div class="flex gap-2 text-md items-center">
    <!-- <Social class="items-center hidden md:flex" /> -->
    <LanguageSelector class="items-center" />
    <DarkMode class="items-center" />
    <!-- <UButton
      v-if="sidebarEnabled"
      variant="ghost"
      class="p-0"
      @click="toggleSidebar"
    >
      <IconUil:list-ul aria-hidden="true" class="text-[1.1rem]" />
    </UButton> -->
    <!-- <MobileMenu class="text-md md:hidden" /> -->
    <!-- <MemberNotificationButton /> -->
    <MemberAvatarButton />
  </div>
</template>
