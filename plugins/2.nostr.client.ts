import { hexToBytes } from "@noble/hashes/utils";
import { useWebSocket } from "@vueuse/core";
import { finalizeEvent, type Event } from "nostr-tools";
interface NostrEvent extends Event {
  isVerified?: boolean;
}
export default defineNuxtPlugin(() => {
  const authID = ref("");
  const userValidated = ref(false);
  const { $dexie } = useNuxtApp();
  const { loggedIn, certs } = useUser();

  // Determine the relay URL based on the environment
  const relayURL = isDev()
    ? "http://localhost:8787/"
    : "https://inbox.alizemani.ir/nostr-relay";

  const { data, send, open, close } = useWebSocket(relayURL, {
    immediate: false,
    autoReconnect: {
      retries: 5,
      delay: 2000,
      onFailed() {
        console.error("Failed to connect WebSocket after 5 retries");
      },
    },
  });

  // Open or close the WebSocket based on the logged-in status
  // watchEffect(() => {
  //   if (loggedIn.value) {
  //     open();
  //   } else {
  //     close();
  //   }
  // });

  // Handle incoming WebSocket messages
  watch(data, (newData) => {
    try {
      const incomingMessage = JSON.parse(newData);
      handleIncomingMessage(incomingMessage);
    } catch (error) {
      console.error("Failed to parse incoming message:", error);
    }
  });

  // Function to handle different types of incoming messages
  const handleIncomingMessage = async (message: any) => {
    const [messageType, ...args] = message;

    switch (messageType) {
      case "AUTH":
        await sendAuthMessage(args[0]);
        break;
      case "EVENT":
        await handleIncomingEvent(args[1]);
        break;
      case "EOSE":
        // Handle End of Subscription Event if needed
        break;
      case "CLOSED":
        userValidated.value = false;
        close();
        break;
      case "OK":
        await handleOKMessage(args);
        break;
      case "NOTICE":
        // Handle Notices if needed
        break;
      default:
        console.warn("Unknown message type:", messageType);
    }
  };

  // Function to handle "OK" messages
  const handleOKMessage = async (args: any[]) => {
    const [eventId] = args;
    console.log("OK message for event ID:", eventId);

    const dbEvent = await $dexie.events.get({ id: eventId });

    if (dbEvent) {
      console.log("Event exists in DB, updating status to 'Sent'");
      await $dexie.events.update(eventId, { status: "Sent" });
    }

    if (!userValidated.value && eventId === authID.value) {
      userValidated.value = true;
      sendREQMessage();
    }
  };

  // Function to send an authentication message
  const sendAuthMessage = async (challenge: string) => {
    const privKey = certs.value?.priv;

    if (!privKey) {
      console.error("Missing private key for authentication");
      return;
    }

    const authEvent: NostrEvent = finalizeEvent(
      {
        created_at: Math.floor(Date.now() / 1000),
        kind: 22242,
        tags: [["challenge", challenge]],
        content: "",
      },
      hexToBytes(privKey)
    );

    authID.value = authEvent.id;
    send(JSON.stringify(["AUTH", authEvent]));
  };

  // Function to send a REQ message
  const sendREQMessage = () => {
    console.log("Sending REQ message");
    const subscriptionId = "my-subscription-id";
    const filter = {};
    const reqMessage = JSON.stringify(["REQ", subscriptionId, filter]);
    send(reqMessage);
  };

  // Function to handle incoming events
  const handleIncomingEvent = async (event: NostrEvent) => {
    try {
      const dbEvent = await $dexie.events.get({ id: event.id });
      console.log(event.isVerified);
      if (dbEvent && event.isVerified) {
        await $dexie.events.update(event.id, { status: "Sent" });
      } else if (!dbEvent) {
        await $dexie.events.add({
          ...event,
          tags:
            typeof event.tags === "string"
              ? JSON.parse(event.tags)
              : event.tags,
          status: "New",
        });
      }
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  // Function to send an EVENT message
  const sendEVENTMessage = async (event: NostrEvent) => {
    send(JSON.stringify(["EVENT", event]));
    console.log("Sent event:", event);
  };

  return {
    provide: {
      sendEVENTMessage,
    },
  };
});
