<script lang="ts" setup>
const { isOwner, isDev } = useOwner();
const route = useRoute();

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
    <ContentDoc v-if="!editEnable" v-slot="{ doc }">
      <PageIntro v-if="doc?.postInto" />
      <!-- Table of contents -->
      <p v-if="doc?.toc" class="text-2xl">{{ $t("contentToc") }}</p>
      <ol v-if="doc?.toc" class="border-b text-md pb-3">
        <li v-for="link of doc.body.toc.links" :key="link.id">
          <a :href="`#${link.id}`">{{ link.text }}</a>
        </li>
      </ol>
      <!-- Main post content -->
      <ContentRenderer :value="doc" />
    </ContentDoc>
    <AdminEditPost v-else />
    <template #footer>
      <div class="flex justify-between pt-5 border-t">
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
        <Social class="items-center hidden md:flex" />
      </div>
    </template>
  </UCard>
</template>
