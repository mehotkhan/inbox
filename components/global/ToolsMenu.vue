<script setup></script>
<template>
  <div class="flex gap-2 text-md items-center">
    <LanguageSelector class="items-center" />
    <Social class="items-center hidden md:flex" />
    <DarkMode class="items-center" />

    <!-- <MobileMenu class="text-md md:hidden" /> -->
    <MemberNotificationButton />
    <MemberAvatarButton />
  </div>
</template>
