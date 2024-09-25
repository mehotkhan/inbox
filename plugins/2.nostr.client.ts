import { hexToBytes } from "@noble/hashes/utils";
import { useWebSocket } from "@vueuse/core";
import { finalizeEvent, type Event as NostrEvent } from "nostr-tools";

export default defineNuxtPlugin(() => {
  const authID = ref("");
  const userValidated = ref(false);
  const relayURL = isDev()
    ? "http://localhost:8787/"
    : "https://inbox.alizemani.ir/nostr-relay";
  // const relayURL = "https://relay.alizemani.ir/";
  const { $dexie } = useNuxtApp();
  const { loggedIn, certs } = useUser();

  const { data, send, open, close } = useWebSocket(relayURL, {
    immediate: false,
    autoReconnect: {
      retries: 5,
      delay: 2000,
      onFailed() {
        console.log("Failed to connect WebSocket after 5 retries");
      },
    },
  });

  if (loggedIn.value) {
    open();
  }
  watch(loggedIn, (newStatus) => {
    if (newStatus) {
      open();
    }
  });

  watch(data, (newData) => {
    try {
      const incomingEvent = JSON.parse(newData);
      handleIncomingMessage(incomingEvent);
    } catch (error) {
      console.error("Failed to parse incoming message", error);
    }
  });

  const handleIncomingMessage = async (message: any) => {
    const messageType = message[0];
    console.log('incoming',message)
    switch (messageType) {
      case "AUTH":
        await sendAuthMessage(message[1]);
        break;
      case "EVENT":
        await handleIncomingEvent(message[2]);
        break;
      case "EOSE":
        // Handle End of Subscription Event
        break;
      case "CLOSED":
        userValidated.value = false;
        close();
        break;
      case "OK":
        // Handle OK responses
        if (!userValidated.value && message[1] === authID.value) {
          userValidated.value = true;
          sendREQMessage();
        }
        break;
      case "NOTICE":
        // Handle Notices
        break;
      default:
        console.log("Unknown message type", messageType);
    }
  };
  const sendAuthMessage = async (challenge: string) => {
    const pubKey = certs.value?.pub;
    const privKey = certs.value?.priv;

    if (!pubKey || !privKey) {
      console.error("Missing pubkey or privkey for authentication");
      return;
    }

    const authEvent: NostrEvent = finalizeEvent(
      {
        created_at: Math.floor(Date.now() / 1000),
        kind: 22242,
        tags: [["challenge", challenge]],
        content: "",
      },
      hexToBytes(certs.value.priv)
    );
    authID.value = authEvent.id;
    // Send AUTH message
    send(JSON.stringify(["AUTH", authEvent]));
  };

  const sendREQMessage = () => {
    console.log("req");
    const subscriptionId = "my-subscription-id";
    const filter = {};
    const reqMessage = JSON.stringify(["REQ", subscriptionId, filter]);
    send(reqMessage);
  };

  const handleIncomingEvent = async (event: NostrEvent) => {
    try {
      if (event?.id) {
        const dbEvent = await $dexie.events.get({
          id: event.id,
        });
        if (dbEvent) {
          // update seen field in db
          await $dexie.events.update(event.id, { seen: true });
        } else {
          $dexie.events.add({
            ...event,
            tags: JSON.parse(event.tags),
            seen: true,
          });
        }
        if (event?.kind === 0) {
          const userProfile = JSON.parse(event.content);
          $dexie.members.put(userProfile);
        }
      }
    } catch (error) {
      console.log("bad event", error);
    }
  };
  const sendEVENTMessage = async (event: NostrEvent) => {
    send(JSON.stringify(["EVENT", event]));
    console.log("sending", event);
  };
  return {
    provide: {
      sendEVENTMessage,
    },
  };
});
