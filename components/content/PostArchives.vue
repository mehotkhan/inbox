<script lang="ts" setup>
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const { locale } = useI18n();
const config = useRuntimeConfig();

const props = defineProps({
  path: {
    type: String,
    required: false,
    default: "/notes/",
  },
});

// Compute the path using a consistent value during SSR
const computedPath = computed(() => {
  return (locale.value || config.app.language) + props.path;
});

const query: QueryBuilderParams = {
  path: computedPath.value,
  limit: 10,
  sort: [{ date: -1 }],
};
</script>

<template>
  <div>
    <ContentList :query="query" class="nuxt-content">
      <template #default="{ list }">
        <div class="latest px-5 md:m-0">
          <ol>
            <li
              v-for="{ _path: slug, title, date, category } in list"
              :key="slug"
              class="mb-2"
            >
              <NuxtLink :external="false" :to="slug" class="">
                {{ title }}
                <span class="font-thin"> / {{ category }} </span>
                <span class="font-thin"> / {{ formatDateTime(date) }} </span>
              </NuxtLink>
            </li>
          </ol>
        </div>
      </template>
      <template #not-found>
        <p>هیچی نیست :)</p>
      </template>
    </ContentList>
  </div>
</template>
