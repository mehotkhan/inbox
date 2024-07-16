import { verifyEvent } from "nostr-tools/pure";

export default defineWebSocketHandler({
  open(peer: any) {
    console.log("[ws] open", peer);
    // peer.subscribe("events");
  },

  async message(peer, message) {
    const msg: [string, any, NostrFilter?] = JSON.parse(message.text());

    if (msg[0] === "EVENT") {
      const event: NostrEvent = msg[1];

      // Verify the event signature
      if (verifyEvent(event)) {
        // Save event to the database
        const newEvent = setEvents(event);
        peer.send(JSON.stringify(["EVENT", "test-id", newEvent]));
      } else {
        peer.publish(
          "events",
          JSON.stringify(["OK", event.id, false, "invalid signature"]),
        );
      }
    } else if (msg[0] === "REQ") {
      try {
        const subscriptionId = msg[1];
        const filters: NostrFilter[] = msg.slice(2);

        const results = await getFilteredEvents(filters);
        for await (const result of results) {
          peer.send(JSON.stringify(["EVENT", subscriptionId, result]));
        }
        peer.send(JSON.stringify(["EOSE", subscriptionId]));
      } catch (err) {
        console.log(err);
      }
    } else if (msg[0] === "CLOSE") {
      const subscriptionId = msg[1];
      // Handle subscription close if needed
      console.log("close subscription", subscriptionId);
    }
  },

  close(peer: any, event: any) {
    console.log("[ws] close", peer, event);
  },

  error(peer: any, error: any) {
    console.log("[ws] error", peer, error);
  },
});
