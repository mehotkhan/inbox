import { useWebSocket } from "@vueuse/core";
import type { Event as NostrEvent } from "nostr-tools";

export default defineNuxtPlugin(() => {
  const BASEURL = useRequestURL();
  const relayURL = `${BASEURL.protocol === "http:" ? "ws" : "wss"}://${BASEURL.host}/relay`;

  const { $dexie } = useNuxtApp();
  const { loggedIn, profile } = useUser();

  const { status, data, send, open, close } = useWebSocket(relayURL, {
    immediate: false,
    autoReconnect: {
      retries: 3,
      delay: 1000,
      onFailed() {
        console.log("Failed to connect WebSocket after 3 retries");
      },
    },
  });

  if (loggedIn.value) {
    console.log("connect");
    open();
  }
  console.log("mount", loggedIn.value);

  watch(loggedIn, (newStatus) => {
    if (loggedIn.value) {
      open();
    }
  });

  watch(status, (newStatus) => {
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
        hash: "some_hash", // Use actual hash logic
        owner: event.pubkey,
        message: event.content,
        created_at: event.created_at,
        status: "published",
      };
      $dexie.comments.add(newComment);
    } else if (event?.kind === 0) {
      const userProfile = JSON.parse(event.content);
      $dexie.members.put(userProfile);
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
