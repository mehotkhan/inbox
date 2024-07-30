<script setup>
const items = [
  [
    {
      label: "New allert",
      icon: "i-heroicons-bell",
    },
  ],
];
</script>

<template>
  <div class="relative flex">
    <UChip>
      <UDropdown
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
      >
        <UIcon name="i-heroicons-bell" dynamic class="text-xl" />

        <template #item="{ item }">
          <span class="truncate">{{ item.label }}</span>

          <UIcon
            :name="item.icon"
            class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
          />
        </template>
      </UDropdown>
    </UChip>
  </div>
</template>
