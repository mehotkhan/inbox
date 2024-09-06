<script lang="ts" setup></script>
<template>
  <div>
    <ContentDoc v-slot="{ doc }">
      <PageIntro v-if="doc?.postIntro" />
      <!-- Table of contents -->
      <p v-if="doc?.toc" class="text-2xl">{{ $t("contentToc") }}</p>
      <ol v-if="doc?.toc" class="border-b text-md pb-3">
        <li v-for="link of doc.body.toc.links" :key="link.id">
          <a :href="`#${link.id}`">{{ link.text }}</a>
        </li>
      </ol>
      <!-- Main post content -->
      <ContentRenderer :value="doc" />
    </ContentDoc>
  </div>
</template>
