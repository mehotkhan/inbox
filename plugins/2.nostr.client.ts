import { useWebSocket } from "@vueuse/core";
import { Event as NostrEvent } from "nostr-tools";

export default defineNuxtPlugin(() => {
  const BASEURL = useRequestURL();
  console.log(BASEURL);
  const relayURL = `${BASEURL.protocol === "http:" ? "ws" : "wss"}://${BASEURL.host}/nostr`;

  const { $dexie } = useNuxtApp();
  const { profile } = useUser();

  const { status, data, send, open, close } = useWebSocket(relayURL, {
    autoReconnect: {
      retries: 3,
      delay: 1000,
      onFailed() {
        console.log("Failed to connect WebSocket after 3 retries");
      },
    },
  });

  watch(status, (newStatus) => {
    // console.log("socket open", status.value);

    if (status.value === "OPEN") {
      sendREQMessage();
    }
  });

  watch(data, (newData) => {
    try {
      const incomingEvent = JSON.parse(newData);
      handleIncomingEvent(incomingEvent[2]);
    } catch (error) {
      console.error("Failed to parse incoming message", error);
    }
  });

  const sendREQMessage = () => {
    const subscriptionId = "my-subscription-id";
    const filter = {
      kinds: [0, 1, 2],
      authors: [profile.value?.pub],
    };
    const reqMessage = JSON.stringify(["REQ", subscriptionId, filter]);
    send(reqMessage);
    // console.log("REQ message sent:", reqMessage);
  };

  const handleIncomingEvent = (event: NostrEvent) => {
    if (event?.kind === 1) {
      const newComment = {
        id: Date.now(),
        hash: "some_hash", // Use actual hash logic
        owner: event.pubkey,
        message: event.content,
        created_at: event.created_at,
        status: "published",
      };
      $dexie.comments.put(newComment);
    } else if (event?.kind === 0) {
      console.log("new profile", event);
    }
  };

  const sendEVENTMessage = async (event: NostrEvent) => {
    send(JSON.stringify(["EVENT", event]));
    // console.log("EVENT message sent:", event);
  };
  return {
    provide: {
      sendEVENTMessage,
    },
  };
});
