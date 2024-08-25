import * as cookie from "cookie";
import { eq } from "drizzle-orm";
import { verifyEvent } from "nostr-tools/pure";

export default defineWebSocketHandler({
  // upgrade: (req) => {
  //   const cookies = cookie.parse(req.headers.cookie || "");
  //   console.log(`[ws] upgrading ${req.url} :`, cookies.userPub);
  // },
  open: (peer) => {
    const cookies = cookie.parse(peer.headers["cookie"]);
    if (!cookies.userPub) {
      peer.terminate();
      console.log("pub cookie not fond in ws");
    }
    // if user registered
    const drizzleDb = initDrizzle();
    const existingMember = drizzleDb
      .select()
      .from(member)
      .where(eq(member.pub, cookies.userPub));
    if (!existingMember.get()) {
      console.log("user not found in ws");
      peer.terminate();
    }

    console.log("[ws] OPEN", existingMember.get().displayName);
    peer.subscribe("events");
    peer.subscribe(`user-${existingMember.get().pub}`);
  },

  message: (peer, message) => {
    try {
      const payload = message.text();
      // check JSON NOSTR PAYLOAD
      if (isJsonStringified(payload)) {
        const msg: [string, any, NostrFilter?] = JSON.parse(payload);
        switch (msg[0]) {
          case "EVENT":
            handleEvent(peer, msg);
            break;
          case "REQ":
            handleREQ(peer, msg);
            break;
          case "CLOSE":
            break;
          default:
            console.log("Unknown message type:", data.type);
            break;
        }
      }
    } catch (error) {
      console.log("bay payload");
    }
  },

  close: (peer, event: CloseEvent) => {
    console.log("[ws] close", peer, event);
  },

  error: (peer, error: Error) => {
    console.log("[ws] error", peer, error);
  },
});

const handleREQ = async (peer: any, msg: any) => {
  const subscriptionId = msg[1];
  const drizzleDb = initDrizzle();
  const results = await await drizzleDb.select().from(events);

  // method to be executed;
  for await (const result of results) {
    peer.send(JSON.stringify(["EVENT", subscriptionId, result]));
  }
  peer.send(JSON.stringify(["EOSE", subscriptionId]));
};

const handleEvent = async (peer: any, msg: any) => {
  const event: NostrEvent = msg[1];
  if (!event || !event.id) {
    throw new Error("Invalid event data");
  }
  if (verifyEvent(event)) {
    const drizzleDb = initDrizzle();
    const existingEvent = await drizzleDb
      .select()
      .from(events)
      .where(
        event.kind === 40
          ? eq(events.content, event.content)
          : eq(events.id, event.id)
      );
    if (existingEvent.length !== 0) {
      console.log("Event already exists");
      return { status: "Dump" };
    } else {
      const subscriptionId = msg[1];

      const newEvent: InsertEvent = {
        id: event.id,
        pubkey: event.pubkey,
        created_at: event.created_at,
        kind: event.kind,
        tags: JSON.stringify(event.tags),
        content: event.content,
        sig: event.sig,
      };
      drizzleDb.insert(events).values(newEvent).run();

      peer.send(JSON.stringify(["EVENT", subscriptionId, event]));
      peer.send(JSON.stringify(["OK", event.id, true, ""]));
      peer.publish("events", JSON.stringify(["EVENT", subscriptionId, event]));

      console.log("New event added");
    }
  } else {
    peer.send(JSON.stringify(["OK", event.id, false, "invalid signature"]));
  }
};
