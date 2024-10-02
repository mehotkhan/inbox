<script setup lang="ts">
const { userRole } = useUser();
</script>

<template>
  <div :key="userRole.length">
    <MemberOwnerIntro v-if="userRole === 'Owner'" />
    <HomeIntroPost v-else />
  </div>
</template>
