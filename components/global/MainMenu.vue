<script lang="ts" setup>
const appConfig = useAppConfig();
const route = useRoute();
const { locale } = useI18n();
</script>

<template>
  <ul class="list-none flex mt-8">
    <li v-for="menu in appConfig.menuItems" :key="menu._path">
      <NuxtLink
        :external="false"
        :to="'/' + locale + menu._path"
        class="menu-item py-1 px-5 dark:hover:text-gray-600 capitalize"
        :class="
          locale + route.path === locale + menu._path
            ? 'router-link-active'
            : ''
        "
        >{{ $t(menu.title) }}</NuxtLink
      >
    </li>
  </ul>
</template>
<style lang="scss" scoped>
a {
  text-wrap: nowrap;
}
.menu-item {
  &:hover {
    background: #454545e1;
    color: white;
    border-radius: 3px;
  }
}
.router-link-active {
  background: #454545e1;
  color: white;
  border-radius: 3px;
  // text-decoration: underline;
}
</style>
