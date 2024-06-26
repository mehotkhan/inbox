import { Event as NostrEvent, finalizeEvent } from "nostr-tools";
import { hexToBytes } from "@noble/hashes/utils";

const relayURL = "ws://localhost:3000/nostr-relay";

export default function useComments() {
  const { profile } = useUser();
  const { $dexie } = useNuxtApp();
  const sending = ref(false);
  const websocket = ref<WebSocket | null>(null);

  onMounted(() => {
    connectWebSocket();
  });

  const connectWebSocket = () => {
    websocket.value = new WebSocket(relayURL);
    websocket.value.onopen = () => {
      console.log(`Connected to ${relayURL}`);
      sendREQMessage();
      keepAlive();
    };

    websocket.value.onmessage = (event) => {
      const incomingEvent: any = JSON.parse(event.data);
      handleIncomingEvent(incomingEvent[2]);
    };

    websocket.value.onclose = () => {
      console.log("WebSocket connection closed");
      reconnectWebSocket();
    };

    websocket.value.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };

  const reconnectWebSocket = () => {
    let retries = 3;
    const delay = 1000;

    const retryConnection = () => {
      if (retries > 0) {
        console.log(`Reconnecting WebSocket... Retries left: ${retries}`);
        retries--;
        setTimeout(() => {
          connectWebSocket();
        }, delay);
      } else {
        console.log("Failed to connect WebSocket after 3 retries");
      }
    };

    retryConnection();
  };

  const sendREQMessage = () => {
    if (websocket.value && websocket.value.readyState === WebSocket.OPEN) {
      const subscriptionId = "my-subscription-id";
      const filter = {
        kinds: [0, 1, 2],
        authors: [profile.value?.pub],
      };
      const reqMessage = JSON.stringify(["REQ", subscriptionId, filter]);
      websocket.value.send(reqMessage);
      console.log("REQ message sent:", reqMessage);
    }
  };

  const handleIncomingEvent = (event: NostrEvent) => {
    if (event?.kind === 1) {
      // Check if the event kind is correct for comments
      const newComment = {
        id: Date.now(), // Temporary ID, will be updated when saved
        hash: "some_hash", // Use actual hash logic
        owner: event.pubkey,
        message: event.content,
        created_at: event.created_at,
        status: "published",
      };
      $dexie.comments.put(newComment);
    }
  };

  const sendComment = async (message: string) => {
    sending.value = true;
    if (!profile.value?.pub) {
      sending.value = false;
      throw new Error("User profile is not loaded");
    }
    const newComment = {
      owner: String(profile.value.pub),
      message,
      created_at: Date.now(),
      hash: "some_hash_generation_logic_here",
      status: "sending",
    };

    $dexie.comments.add(newComment);

    const event: NostrEvent = finalizeEvent(
      {
        kind: 1,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: message,
      },
      hexToBytes(profile.value.priv),
    );

    if (websocket.value) {
      console.log("send");
      websocket.value.send(JSON.stringify(["EVENT", event]));
      newComment.status = "send";
    } else {
      console.error("WebSocket is not open. Cannot send event.");
    }

    await $dexie.comments.put(newComment);
    sending.value = false;
  };

  const keepAlive = () => {
    if (websocket.value) {
      const interval = 30000; // 30 seconds
      setInterval(() => {
        if (websocket.value && websocket.value.readyState === WebSocket.OPEN) {
          websocket.value.send(JSON.stringify(["PING"]));
          console.log("Sent keep-alive PING");
        }
      }, interval);
    }
  };

  const allComments = useLiveQuery(async () => {
    return await $dexie.comments.orderBy("created_at").reverse().toArray();
  }, []);

  return {
    sending,
    sendComment,
    allComments,
    connectWebSocket,
  };
}
