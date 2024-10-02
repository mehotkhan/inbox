<script setup lang="ts">
const { userRole } = useUser();
</script>

<template>
  <div>
    <ProfileTabs v-if="userRole === 'Owner'" />
    <PostArchives v-else  />
  </div>
</template>
