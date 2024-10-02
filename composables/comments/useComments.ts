import { hexToBytes } from "@noble/hashes/utils";
import { finalizeEvent } from "nostr-tools";

export default function useComments() {
  const { certs } = useUser();
  const { $dexie } = useNuxtApp();
  const sending = ref(false);
  const count = ref(10);
  const currentChannelId = ref<string | null>(null);
  const route = useRoute(); // useRoute is reactive

  const sendComment = async (message: string) => {
    sending.value = true;
    if (!certs.value?.pub) {
      sending.value = false;
      throw new Error("User profile is not loaded");
    }
    if (!currentChannelId.value) {
      sending.value = false;
      throw new Error("Channel ID is not loaded");
    }

    const event: NostrEvent = finalizeEvent(
      {
        kind: 42,
        created_at: Math.floor(Date.now()),
        content: message,
        tags: [["e", currentChannelId.value as string]],
      },
      hexToBytes(certs.value.priv)
    );

    $dexie.events.add({
      ...event,
      status: "Sending",
    });

    sending.value = false;
  };
  const sendReplay = async (message: string, parentId: string) => {
    if (!certs.value?.pub) {
      sending.value = false;
      throw new Error("User profile is not loaded");
    }
    if (!currentChannelId.value) {
      sending.value = false;
      throw new Error("Channel ID is not loaded");
    }

    const event: NostrEvent = finalizeEvent(
      {
        kind: 42,
        tags: [
          ["e", currentChannelId.value as string],
          ["e", parentId],
        ],
        created_at: Math.floor(Date.now()),
        content: message,
      },
      hexToBytes(certs.value.priv)
    );

    $dexie.events.add({
      ...event,
      status: "Sending",
    });

    sending.value = false;
  };

  const currentComments = useLiveQuery(async () => {
    return await $dexie.events
      .orderBy("created_at")
      .filter(
        (event: any) =>
          event.kind === 42 &&
          event.tags.some(
            (tag: any) => tag[0] === "e" && tag[1] === currentChannelId.value
          )
      )
      .reverse()
      .limit(20)
      .toArray();
  }, [currentChannelId]);

  const allComments = useLiveQuery(async () => {
    return await $dexie.events
      .orderBy("created_at")
      .filter((event: any) => event.kind == 42)
      .reverse()
      .limit(count.value)
      .toArray();
  }, [count]);

  const allCommentsCount = useLiveQuery(async () => {
    return await $dexie.events
      .orderBy("created_at")
      .filter((event: any) => event.kind == 42)
      .count();
  }, []);

  const getCurrentChannelID = async (path: string) => {
    try {
      const channel = await $dexie?.events?.get({
        content: path,
        kind: 40,
      });
      if (channel) {
        currentChannelId.value = channel?.id;
      } else {
        const { data }: any = await useApi(
          "/serverless-api/comments/getCommentId",
          {
            params: { path },
          }
        );
        $dexie?.events.add({
          ...data.value,
          status: "Sending",
        });
        currentChannelId.value = data.value.id;
      }
    } catch (e: any) {
      console.log(e);
    }
  };
  // Watch the route directly
  watch(
    () => route.path, // Watch the fullPath directly
    (newPath) => {
      getCurrentChannelID(newPath);
    },
    { immediate: true } // This ensures the watcher fires immediately
  );

  return {
    allCommentsCount,
    count,
    sending,
    sendComment,
    sendReplay,
    allComments,
    currentComments,
  };
}
