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
          <NuxtLink :to="slug" class="hover:underline">
            {{ title }}
          </NuxtLink>
          /
          <NuxtLink
            :to="locale + '/' + _category"
            class="font-thin hover:underline"
          >
            {{ $t(_category) }}
          </NuxtLink>
          <span class="font-thin"> / {{ formatDateTime(date) }} </span>
        </li>
      </ol>
    </div>
    <p v-else>{{ $t("Noting is Here :(") }}</p>
  </ContentQuery>
</template>
