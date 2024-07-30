import type { Event as NostrEvent } from "nostr-tools";
import { finalizeEvent } from "nostr-tools";
import { hexToBytes } from "@noble/hashes/utils";

export default function useComments() {
  const { certs } = useUser();
  const { $dexie } = useNuxtApp();
  const sending = ref(false);
  const currentChannelId = ref<string | null>(null);
  const route = useRoute();

  onMounted(async () => {
    const channel = await createChannel();
    currentChannelId.value = channel.id;
  });

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
        created_at: Math.floor(Date.now() / 1000),
        content: message,
        tags: [["e", currentChannelId.value as string]],
      },
      hexToBytes(certs.value.priv)
    );

    $dexie.events.add({
      ...event,
      seen: false,
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
        created_at: Math.floor(Date.now() / 1000),
        content: message,
      },
      hexToBytes(certs.value.priv)
    );

    $dexie.events.add({
      ...event,
      seen: false,
    });

    sending.value = false;
  };

  const createChannel = async () => {
    const path = route.fullPath;
    const channel = await $dexie.events.get({
      content: path,
    });
    if (!channel) {
      const channelEvent: NostrEvent = finalizeEvent(
        {
          kind: 40,
          created_at: Math.floor(Date.now() / 1000),
          tags: [],
          content: path,
        },
        hexToBytes(certs.value.priv)
      );

      $dexie.events.add({
        ...channelEvent,
        seen: false,
      });

      return channelEvent;
    }
    return channel;
  };

  const allComments = useLiveQuery(async () => {
    return await $dexie.events
      .orderBy("created_at")
      .filter(
        (event: NostrEvent) =>
          event.kind == 42 &&
          event.tags.some(
            (tag) => tag[0] === "e" && tag[1] === currentChannelId.value
          )
      )
      .reverse()
      .limit(20)
      .toArray();
  }, []);

  return {
    sending,
    sendComment,
    sendReplay,
    allComments,
    createChannel,
  };
}
