import { verifyEvent } from "nostr-tools/pure";

export default defineWebSocketHandler({
  // upgrade(req) {
  //   const headers: any = req.headers;
  //   if (headers["cookie"]) {
  //     const cookie: any = JSON.parse(extractCookies(headers["cookie"]));
  //     if (cookie.userPub) {
  //       console.log(cookie.userPub);
  //     }
  //   }
  //   return {
  //     headers,
  //   };
  // },
  open(peer: any) {
    console.log("WS connected");

    // if (peer.ctx.node.req.rawHeaders) {
    //   console.log(extractCookies(peer.ctx.node.req.rawHeaders[21]));
    // }
    // rawHeaders;
    // peer.send(JSON.stringify(peer.ctx.node.HeadersList));
  },

  async message(peer, message) {
    try {
      const payload = message.text();
      // check JSON NOSTR PAYLOAD
      if (isJsonStringified(payload)) {
        const msg: [string, any, NostrFilter?] = JSON.parse(payload);

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
              JSON.stringify(["OK", event.id, false, "invalid signature"])
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
      } else {
        if (payload.startsWith("heartbeat")) {
          console.log("incoming heartbeat from :");
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
