<script lang="ts" setup>
const { isOwner } = useOwner();
const { locale } = useI18n();
const editEnable = ref(false);
</script>
<template>
  <UCard
    :ui="{
      body: {
        base: 'min-h-screen',
      },
    }"
  >
    <template #header>
      <div class="flex justify-between pt-5">
        <Breadcrumb />
        <div class="flex gap-4 items-center">
          <div v-if="isOwner">
            <UButton
              v-if="isOwner"
              :label="editEnable ? 'بستن ویرایش' : 'ویرایش'"
              size="md"
              color="primary"
              variant="ghost"
              @click="editEnable = !editEnable"
            />

            <UButton
              label="افزودن یادداشت"
              size="md"
              color="primary"
              variant="ghost"
              to="create"
            />
            <UButton
              label="افزودن محصول"
              size="md"
              color="primary"
              variant="ghost"
              to="create"
            />
          </div>

          <span class="text-[.98rem] p-2"> ۶ کاربر آنلاین </span>
        </div>
      </div>
    </template>
    <ContentDoc v-if="!editEnable" />
    <AdminEditPost v-else />
    <template #footer>
      <div class="flex justify-between pt-5 border-t">
        مثلا کپی رایت :)

        <Social class="items-center hidden md:flex" />
      </div>
    </template>
  </UCard>
</template>
