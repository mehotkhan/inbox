<script lang="ts" setup>
const appConfig = useAppConfig();
const route = useRoute();
const { userRole } = useUser();
const { locale } = useI18n();
</script>

<template>
  <ul class="list-none flex mt-8">
    
    <li v-for="menu in appConfig.menuItems" :key="menu._path">
      <NuxtLink
        :external="false"
        :to="'/' + locale + menu._path"
        class="hover:text-black py-1 px-5 dark:hover:text-gray-200"
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
.router-link-active {
  background: #454545e1;
  color: white;
  border-radius: 3px;
  // text-decoration: underline;
}
</style>
