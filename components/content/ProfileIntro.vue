<script setup lang="ts">
const { isOwner } = useOwner();
</script>

<template>
  <div>
    <MemberOwnerIntro v-if="isOwner" />
    <MemberUserIntro v-else />
  </div>
</template>
