<script lang="ts" setup>
const { isDev } = useOwner();
const { userRole } = useUser();

const route = useRoute();

const editEnable = ref(false);
</script>

<template>
  <div class="flex flex-col">
    <slot name="app-before" />
    <div id="app-before" />

    <!-- Header Section -->
    <Header />

    <!-- Main Content -->
    <main class="flex min-h-screen">
      <div class=" mx-auto w-7xl">
        <div class="prose md:prose-xl dark:prose-invert">
          <UCard
            :ui="{
              root: 'ring-0 shadow-none bg-transparent',
            }"
          >
            <!-- Header Slot -->
            <!-- <template #header>
              <div class="flex justify-between pt-5">
                <Breadcrumb v-if="isDev" />
                <div class="flex gap-4 items-center">
                  <div v-if="userRole === 'Owner'">
                    <UButton
                      v-if="isDev"
                      :label="editEnable ? 'بستن ویرایش' : 'ویرایش'"
                      size="md"
                      color="primary"
                      variant="ghost"
                      @click="editEnable = !editEnable"
                    /> -->
                    <!-- 
                      Commented Buttons 
                    -->
                    <!-- 
                    <UButton
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
                    /> 
                    -->
                  <!-- </div>
                </div> -->
                <!-- <MemberActivate v-if="route.path.includes('/profile')" /> -->
              <!-- </div> -->
            <!-- </template> -->

            <!-- Content Slot -->
            <slot v-if="!editEnable" />
            <AdminEditPost v-else />

            <!-- Footer Slot -->
            <template #footer>
              <div
                class="flex flex-col-reverse md:flex-row items-center md:justify-between pt-5 border-t"
              >
                <div class="flex items-center gap-2">
                  <p class="text-xs">{{ $t("DeveloperMode") }}</p>
                  <USwitch
                    v-model="isDev"
                    color="green"
                    size="md"
                    :label="$t('LABS?')"
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

    <!-- Developer Support -->
    <SupportStart v-if="isDev" />
  </div>
</template>
