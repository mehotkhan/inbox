export default defineWebSocketHandler({
  open(peer) {
    console.log("WS connected");
  },

  async message(peer, message) {
    try {
      const payload = message.text();
      // check JSON NOSTR PAYLOAD
      if (isJsonStringified(payload)) {
        const msg: [string, any, NostrFilter?] = JSON.parse(payload);

        if (msg[0] === "REQ") {
          let currentEvents = 0;
          const subscriptionId = msg[1];
          const filters: NostrFilter[] = msg.slice(2);
          const results = await getFilteredEvents(filters);

          if (results?.length !== currentEvents) {
            // method to be executed;
            for await (const result of results) {
              peer.send(JSON.stringify(["EVENT", subscriptionId, result]));
            }
            peer.send(JSON.stringify(["EOSE", subscriptionId]));
            currentEvents = results?.length;
          }

          //interval query : FOR TEST AREA
          setInterval(async () => {
            const results = await getFilteredEvents(filters);

            if (results?.length !== currentEvents) {
              // method to be executed;
              for await (const result of results) {
                peer.send(JSON.stringify(["EVENT", subscriptionId, result]));
              }
              peer.send(JSON.stringify(["EOSE", subscriptionId]));
              currentEvents = results?.length;
            }
          }, 1000);
        } else if (msg[0] === "CLOSE") {
          const subscriptionId = msg[1];
          // Handle subscription close if needed
          console.log("close subscription", subscriptionId);
        } else {
          console.log("unknown event :", msg);
        }
      }
    } catch (error) {
      console.log("bay payload");
    }
  },

  close(peer: any, event: any) {
    console.log("[ws] close", peer, event);
  },

  error(peer: any, error: any) {
    console.log("[ws] error", peer, error);
  },
});
