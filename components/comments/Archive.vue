<script lang="ts" setup>
import { vElementVisibility } from "@vueuse/components";
const { userRole } = useUser();

const { allComments, count, allCommentsCount } = useComments();
const loadMore = () => {
  count.value += 10;
  console.log("load more ");
};
</script>
<template>
  <div>
    <ul v-if="allComments?.length > 0">
      <li v-for="comment in allComments" :key="comment.id" class="mb-2 group">
        <div class="flex justify-between">
          <span :external="false" class="">
            <span class="text-xl font-normal">
              {{ comment.content }}
            </span>
            <span class="font-thin text-sm">
              / <SocialMemberDetails :pub="comment.pubkey" />
            </span>
            <span class="font-thin text-sm">
              / {{ eventFormatTimeAgo(comment.created_at) }}
            </span>
            <span class="font-thin text-sm">
              / <SocialChannelDetails :pub="comment.tags[0][1]" />
            </span>
          </span>
          <div
            v-if="userRole === 'Owner'"
            class="text-xs flex gap-2 group-hover:flex"
          >
            <span>تایید</span>
            <span>اسپم</span>
            <span>حذف</span>
          </div>
        </div>
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
