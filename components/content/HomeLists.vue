<script setup lang="ts">
const { userRole } = useUser();
</script>

<template>
  <div class="mt-10">
    <ProfileTabs v-if="userRole === 'Owner'" />
    <PostArchives v-else />
  </div>
</template>
