import fs from "fs";
import { inspect } from "util";

export default defineWebSocketHandler({
  upgrade: (req) => {
    // const cookies = cookie.parse(req.headers.cookie || "");
    // console.log(`[ws] upgrading ${req.url} :`, req);
  },
  open(peer: any) {
    // const { D1 } = peer.ctx;
    try {
      fs.writeFileSync("dump.json", inspect(peer.ctx));
    } catch (err) {
      console.error(err);
    }
    // console.log("WS connected", peer.ctx.cloudflare);
  },

  async message(peer: any, message) {
    try {
      const payload = message.text();
      // check JSON NOSTR PAYLOAD
      if (isJsonStringified(payload)) {
        const msg: [string, any, NostrFilter?] = JSON.parse(payload);

        if (msg[0] === "REQ") {
          let currentEvents = 0;
          const subscriptionId = msg[1];
          const filters: NostrFilter[] = msg.slice(2);
          // const { D1 } = peer.node.ctx.cloudflare.env;

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
