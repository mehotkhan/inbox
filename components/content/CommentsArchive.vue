<script lang="ts" setup>
import { vElementVisibility } from "@vueuse/components";

const { allComments, count, allCommentsCount } = useComments();
const loadMore = () => {
  count.value += 10;
  console.log("load more ");
};
</script>
<template>
  <div class="latest px-5 md:m-0">
    <h3>دیدگاه ها</h3>
    <ul v-if="allComments?.length > 0">
      <li v-for="comment in allComments" :key="comment.id" class="mb-2">
        <span :external="false" class="">
          {{ comment.content }}
          <span class="font-thin"> / {{ comment.pubkey }} </span>
          <span class="font-thin">
            / {{ eventFormatTimeAgo(comment.created_at) }}
          </span>
          <span class="font-thin"> / {{ comment.tags[0][1] }} </span>
        </span>
      </li>
      <li
        v-if="allComments.length !== allCommentsCount"
        v-element-visibility="loadMore"
      >
        ....
      </li>
    </ul>
    <p v-else>هیچی نیست :)</p>
  </div>
</template>
