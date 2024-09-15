<script lang="ts" setup>
const { locale } = useI18n();

const props = defineProps({
  category: {
    type: String,
    required: false,
    default: undefined,
  },
});
</script>

<template>
  <ContentQuery
    v-slot="{ data }"
    :where="{
      category: props.category,
    }"
    :path="locale + '/notes/'"
    :sort="{ date: -1 }"
  >
    <div v-if="data?.length > 0" class="px-5 md:m-0">
      <ol>
        <li
          v-for="{ _path: slug, title, date, category: _category } in data"
          :key="slug"
          class="mb-2"
        >
          <NuxtLink :external="false" :to="slug" class="">
            {{ title }}
            <span class="font-thin"> / {{ $t(_category) }} </span>
            <span class="font-thin"> / {{ formatDateTime(date) }} </span>
          </NuxtLink>
        </li>
      </ol>
    </div>
    <p v-else>هیچی نیست :)</p>
  </ContentQuery>
</template>
