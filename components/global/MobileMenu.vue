<script setup lang="ts">
const { t } = useI18n();
const { isOwner } = useOwner();

const appConfig = useAppConfig();

const items = computed(() => {
  const menus: any[] = [];
  appConfig.menuItems.forEach((menu: any) => {
    menus.push([
      {
        label: t(menu.title),
        click: () => navigateTo(menu._path),
      },
    ]);
  });

  if (isOwner.value) {
    menus.push([
      {
        label: t("profile"),
        click: () => navigateTo("/profile"),
      },
    ]);
  }
  return menus;
});
</script>

<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
    <UIcon name="i-heroicons-bars-4" class="flex" aria-hidden="true" />
  </UDropdown>
</template>
