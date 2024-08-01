<script lang="ts" setup>
const { isOwner } = useOwner();
const route = useRoute();
const editEnable = ref(false);
const nodeEdit = () => {
  return route.path.startsWith("/notes/") || route.path.startsWith("/shop/");
};
</script>
<template>
  <UCard class="min-h-screen">
    <template #header>
      <div class="flex justify-between pt-5">
        <Breadcrumb />
        <div class="flex gap-4 items-center">
          <div v-if="nodeEdit()">
            <UButton
              v-if="isOwner"
              :label="editEnable ? 'بستن ویرایش' : 'ویرایش'"
              size="md"
              color="primary"
              variant="ghost"
              @click="editEnable = !editEnable"
            />
          </div>
          <div v-else>
            <UButton
              v-if="isOwner"
              label="افزودن یادداشت"
              size="md"
              color="primary"
              variant="ghost"
              to="/create"
            />
            <UButton
              v-if="isOwner"
              label="افزودن محصول"
              size="md"
              color="primary"
              variant="ghost"
              to="/create"
            />
          </div>

          <span class="text-[.98rem]"> ۶ کاربر آنلاین </span>
        </div>
      </div>
    </template>
    <ContentDoc v-if="!editEnable" />
    <AdminEditPost v-else />
    <template #footer>
      <div class="flex justify-between pt-5">مثلا کپی رایت :)</div>
    </template>
  </UCard>
</template>
