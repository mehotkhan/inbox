<script setup lang="ts">
const { menuItems } = useMainMenu();

const items = computed(() => {
  const menus: any[] = [];
  menuItems.value.forEach((menu: any) => {
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
  <ClientOnly>
    <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
      <IconUil:align-justify class="text-md flex" aria-hidden="true" />
    </UDropdown>
  </ClientOnly>
</template>
