<script lang="ts" setup>
import { vElementVisibility } from "@vueuse/components";
const { userRole } = useUser();
const { approveComment, denyComment } = useComments();
const { $dexie } = useNuxtApp();
const count = ref(10);
const allInbox = useLiveQuery(async () => {
  return await $dexie.events
    .orderBy("created_at")
    .filter((event: NostrEvent) => event.status === "New")
    .reverse()
    .limit(count.value)
    .toArray();
}, [count]);

const allInboxCount = useLiveQuery(async () => {
  return await $dexie.events
    .orderBy("created_at")
    .filter((event: NostrEvent) => event.status === "New")
    .count();
}, []);
const loadMore = () => {
  count.value += 10;
  console.log("load more ");
};
</script>
<template>
  <div>
    <ol v-if="allInboxCount > 0">
      <li v-for="comment in allInbox" :key="comment.id" class="mb-2 group">
        <div class="flex justify-between">
          <span :external="false" class="">
            <span class="text-xl font-normal">
              {{ comment.content }}
            </span>
            <span class="font-hairline text-md">
              / <SocialMemberDetails :pub="comment.pubkey" />
            </span>
            <span class="font-hairline text-md">
              / {{ eventFormatTimeAgo(comment.created_at) }}
            </span>
            <span class="font-hairline text-md">
              / <SocialChannelDetails :pub="comment.tags[0][1]" />
            </span>

            <span v-if="userRole === 'Owner'" class="font-hairline text-md">
              /
              <UButton
                variant="link"
                :label="$t('Approve')"
                @click="approveComment(comment)"
            /></span>
            <span v-if="userRole === 'Owner'" class="font-hairline text-md">
              /
              <UButton
                variant="link"
                :label="$t('Deny')"
                color="red"
                @click="denyComment(comment)"
            /></span>
          </span>
        </div>
      </li>
      <li
        v-if="allInbox.length !== allInboxCount"
        v-element-visibility="loadMore"
      >
        ....
      </li>
    </ol>
    <p v-else>{{ $t("Noting is Here :(") }}</p>
  </div>
</template>
