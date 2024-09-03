import { useWebSocket } from "@vueuse/core";
import type { Event as NostrEvent } from "nostr-tools";

export default defineNuxtPlugin(() => {
  const BASEURL = useRequestURL();
  const relayURL = `${BASEURL.protocol === "http:" ? "ws" : "wss"}://${BASEURL.host}/nostr-relay`;

  const { $dexie } = useNuxtApp();
  const { loggedIn, profile } = useUser();

  const { status, data, send, open, close } = useWebSocket(relayURL, {
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
    console.log("connect");
    open();
  }
  console.log("mount", loggedIn.value);

  watch(loggedIn, (newStatus) => {
    if (newStatus) {
      open();
    }
  });
  watch(status, (newStatus) => {
    if (newStatus === "OPEN") {
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
  // let timer: any = null;
  const sendREQMessage = () => {
    const subscriptionId = "my-subscription-id";
    const filter = {
      kinds: [0, 1, 2],
      authors: [profile.value?.pub],
    };
    const reqMessage = JSON.stringify(["REQ", subscriptionId, filter]);
    // setInterval(() => {
    console.log("req");
    send(reqMessage);
    // }, 5000);
  };

  // onUnmounted(() => {
  //   clearInterval(timer);
  // });

  const handleIncomingEvent = async (event: NostrEvent) => {
    try {
      console.log();
      // verifyEvent(event);
      if (event?.id) {
        const dbEvent = await $dexie.events.get({
          id: event.id,
        });
        if (dbEvent) {
          // update seen feild in db
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
    delete event.seen;
    send(JSON.stringify(["EVENT", event]));
  };
  return {
    provide: {
      sendEVENTMessage,
    },
  };
});
