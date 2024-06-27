import { Event as NostrEvent } from "nostr-tools";

const relayURL = "ws://localhost:3000/nostr-relay";

export default defineNuxtPlugin(() => {
  const { profile } = useUser();
  const { $dexie } = useNuxtApp();
  let websocket: WebSocket | null = null;
  let retryCount = 3;

  const connectWebSocket = () => {
    websocket = new WebSocket(relayURL);
    websocket.onopen = handleOpen;
    websocket.onmessage = handleMessage;
    websocket.onclose = handleClose;
    websocket.onerror = handleError;
  };

  const handleOpen = () => {
    console.log(`Connected to ${relayURL}`);
    sendREQMessage();
    keepAlive();
  };

  const handleMessage = (event: MessageEvent) => {
    console.log("Incoming event");
    try {
      const incomingEvent = JSON.parse(event.data);
      handleIncomingEvent(incomingEvent[2]);
    } catch (error) {
      console.error("Failed to parse incoming message", error);
    }
  };

  const handleClose = () => {
    console.log("WebSocket connection closed");
    if (retryCount > 0) {
      setTimeout(() => {
        console.log(`Reconnecting WebSocket... Retries left: ${retryCount}`);
        retryCount--;
        connectWebSocket();
      }, 1000);
    } else {
      console.log("Failed to connect WebSocket after 3 retries");
    }
  };

  const handleError = (error: Event) => {
    console.error("WebSocket error:", error);
  };

  const sendREQMessage = () => {
    if (websocket?.readyState === WebSocket.OPEN) {
      const subscriptionId = "my-subscription-id";
      const filter = {
        kinds: [0, 1, 2],
        authors: [profile.value?.pub],
      };
      const reqMessage = JSON.stringify(["REQ", subscriptionId, filter]);
      websocket.send(reqMessage);
      console.log("REQ message sent:", reqMessage);
    }
  };

  const sendEVENTMessage = async (event: NostrEvent) => {
    if (websocket?.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify(["EVENT", event]));
      console.log("EVENT message sent:", event);
    }
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
    }
  };

  const keepAlive = () => {
    setInterval(() => {
      if (websocket?.readyState === WebSocket.OPEN) {
        websocket.send(JSON.stringify(["PING"]));
        console.log("Sent keep-alive PING");
      }
    }, 30000);
  };

  connectWebSocket();

  return {
    provide: {
      sendEVENTMessage,
    },
  };
});
