<script setup lang="ts"></script>

<template>
  <main>
    <!--content section -->
    <div class="flex border-b w-full justify-end pb-3">
      <UButton variant="outline" to="/dash/notes/create"> Create Note </UButton>
    </div>
    <div class="flex border-t pt-2">
      <DashboardTable />
    </div>
    <!-- /content section -->
  </main>
</template>
