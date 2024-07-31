<script lang="ts" setup>
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const props = defineProps({
  category: {
    type: String,
    required: false,
    default: undefined,
  },
  path: {
    type: String,
    required: false,
    default: "/notes/",
  },
});
const query: QueryBuilderParams = {
  path: props.path,
  limit: 10,
  sort: [{ date: -1 }],
  where: props.category ? [{ category: props.category }] : undefined,
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
