<script setup lang="ts">
const appConfig = useAppConfig();

const items = computed(() => {
  const menus: any[] = [];
  appConfig.menuItems.forEach((menu: any) => {
    menus.push([
      {
        label: menu.title,
        click: () => navigateTo(menu._path),
      },
    ]);
  });

  return menus;
});
</script>

<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
    <IconUil:align-justify class="text-md flex" aria-hidden="true" />
  </UDropdown>
</template>
