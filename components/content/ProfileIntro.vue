<script setup lang="ts">
const { userRole } = useUser();
</script>

<template>
  <div>
    <MemberOwnerIntro v-if="userRole === 'Owner'" />
    <MemberUserIntro v-else />
  </div>
</template>
