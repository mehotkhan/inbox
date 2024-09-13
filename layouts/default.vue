<script lang="ts" setup>
const { isOwner, isDev } = useOwner();
const route = useRoute();

const editEnable = ref(false);
</script>
<template>
  <div class="flex-col flex">
    <slot name="app-before" />
    <div id="app-before" />
    <Header />
    <main class="flex min-h-screen mt-[3rem]">
      <div class="container">
        <div class="prose md:prose-xl dark:prose-invert">
          <UCard
            :ui="{
              base: 'min-h-screen',
              rounded: 'rounded-none',
              ring: 'ring-none',
              shadow: 'shadow-none',
            }"
          >
            <template #header>
              <div class="flex justify-between pt-5">
                <Breadcrumb v-if="isDev" />
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
                    <!-- <UButton
                      label="افزودن یادداشت"
                      size="md"
                      color="primary"
                      variant="ghost"
                      to="/create"
                    />
                    <UButton
                      label="افزودن محصول"
                      size="md"
                      color="primary"
                      variant="ghost"
                      to="/create"
                    /> -->
                  </div>
                  <MemberActivate v-if="route.path === '/profile'" />
                </div>
              </div>
            </template>
            <slot v-if="!editEnable" />

            <AdminEditPost v-else />
            <template #footer>
              <div
                class="flex flex-col-reverse md:flex-row items-center md:justify-between pt-5 border-t"
              >
                <div class="flex items-center gap-2">
                  <p class="text-xs">
                    {{ $t("DeveloperMode") }}
                  </p>
                  <UToggle
                    v-model="isDev"
                    color="green"
                    size="md"
                    label="آزمایشگاه؟"
                    on-icon="i-heroicons-check-20-solid"
                    off-icon="i-heroicons-x-mark-20-solid"
                  />
                </div>
                <p class="text-sm">{{ $t("copyRightText") }}</p>
                <Social class="items-center" />
              </div>
            </template>
          </UCard>
        </div>
      </div>
      <slot name="app-after" />
      <div id="app-after" />
    </main>
    <SupportStart v-if="isDev" />
    <div
      v-if="isDev"
      class="fixed right-2 bottom-2 bg-gray-200 w-20 py-3 rounded items-center flex justify-around flex-col gap-1"
    >
      <span class="text-md text-black">مدیر؟</span>
      <UToggle
        v-model="isOwner"
        color="green"
        size="xl"
        title="is Admin"
        on-icon="i-heroicons-check-20-solid"
        off-icon="i-heroicons-x-mark-20-solid"
      />
    </div>
  </div>
</template>
