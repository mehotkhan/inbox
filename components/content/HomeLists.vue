<script setup lang="ts">
const { userRole } = useUser();
</script>

<template>
  <div class="mt-10">
    <MemberOwnerTabs v-if="userRole === 'Owner'" />
    <div v-else>
      <h2>{{ $t("Latest Incoming") }}</h2>

      <PostArchives />
    </div>
  </div>
</template>
