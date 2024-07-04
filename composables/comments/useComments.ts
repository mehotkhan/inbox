import { Event as NostrEvent, finalizeEvent } from "nostr-tools";
import { hexToBytes } from "@noble/hashes/utils";

export default function useComments() {
  const { profile } = useUser();
  const { $dexie, $sendEVENTMessage } = useNuxtApp();
  const sending = ref(false);

  const sendComment = async (message: string) => {
    sending.value = true;
    if (!profile.value?.pub) {
      sending.value = false;
      throw new Error("User profile is not loaded");
    }

    const event: NostrEvent = finalizeEvent(
      {
        kind: 1,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: message,
      },
      hexToBytes(profile.value.priv)
    );

    const newComment = {
      owner: String(profile.value.pub),
      message,
      created_at: Date.now(),
      hash: "some_hash_generation_logic_here",
      status: "sending",
    };
    // $dexie.comments.add(newComment);
    try {
      console.log("sending");
      await $sendEVENTMessage(event);

      newComment.status = "send";
      await $dexie.comments.put(newComment);
    } catch {
      console.error("WebSocket is not open. Cannot send event.");
    }
    sending.value = false;
  };

  const allComments = useLiveQuery(async () => {
    return await $dexie.comments
      .orderBy("created_at")
      .reverse()
      .limit(20)
      .toArray();
  }, []);

  return {
    sending,
    sendComment,
    allComments,
  };
}
