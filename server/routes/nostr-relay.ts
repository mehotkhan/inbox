import { events, InsertEvent } from "~/server/db/schema";
import { DB } from "~/server/utils/db";
import { verifyEvent } from "nostr-tools/pure";



type NostrEvent = {
  id: string;
  pubkey: string;
  created_at: number;
  kind: number;
  tags: any[];
  content: string;
  sig: string;
};

type NostrFilter = {
  ids?: string[];
  kinds?: number[];
  authors?: string[];
  since?: number;
  until?: number;
  tags?: Record<string, string[]>;
};

const db: any = DB();

export default defineWebSocketHandler({
  open(peer: any) {
    console.log("[ws] open", peer);
    peer.subscribe("events");
  },

  async message(peer, message) {
    const msg: [string, any, NostrFilter?] = JSON.parse(message.text());

    if (msg[0] === "EVENT") {
      const event: NostrEvent = msg[1];

      // Verify the event signature
      if (verifyEvent(event)) {
        // Save event to the database
        const newEvent: InsertEvent = {
          id: event.id,
          pubkey: event.pubkey,
          created_at: event.created_at,
          kind: event.kind,
          tags: JSON.stringify(event.tags),
          content: event.content,
          sig: event.sig,
        };
        await db.insert(events).values(newEvent).run();
        peer.publish("events", JSON.stringify(["OK", event.id, true, ""]));
        console.log('published')
      } else {
        peer.publish("events", JSON.stringify(["OK", event.id, false, "invalid signature"]));
      }
    } else if (msg[0] === "REQ") {
      try {
        const subscriptionId = msg[1];
        const filters: NostrFilter[] = msg.slice(2);
        console.log("filters", filters);
        const results = await db.select().from(events);


        for await (const result of results) {
          peer.publish("events", JSON.stringify(['EVENT', subscriptionId, result]));

        }
        peer.publish("events", JSON.stringify(["EOSE", subscriptionId]));
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
