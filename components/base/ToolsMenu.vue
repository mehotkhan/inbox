<script setup>
const { sidebarEnabled, toggleSidebar } = useSidebar();
</script>
<template>
  <div class="flex gap-2 text-md items-center">
    <!-- <BaseSocial class="items-center hidden md:flex" /> -->
    <BaseLanguageSelector class="items-center" />
    <BaseDarkMode class="items-center" />
    <UButton
      v-if="sidebarEnabled"
      variant="ghost"
      class="p-0"
      @click="toggleSidebar"
    >
      <IconUil:list-ul aria-hidden="true" class="text-[1.1rem]" />
    </UButton>
    <!-- <BaseMobileMenu class="text-md md:hidden" /> -->
    <!-- <MemberNotificationButton /> -->
    <!-- <MemberAvatarButton /> -->
  </div>
</template>
