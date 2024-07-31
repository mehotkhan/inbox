import { eq } from "drizzle-orm";
import type { Event as NostrEvent } from "nostr-tools";
import { verifyEvent } from "nostr-tools/pure";

export default defineEventHandler(async (event) => {
  try {
    const bodyEvent: NostrEvent = await readBody(event);
    verifyEvent(bodyEvent);

    if (!bodyEvent || !bodyEvent.id) {
      throw new Error("Invalid event data");
    }

    // Execute the query to check if the event exists using drizzle's `get` method
    const { D1 } = event.context.cloudflare.env;

    const drizzleDb = initDrizzle(D1);
    const existingEvent = await drizzleDb
      .select()
      .from(events)
      .where(
        bodyEvent.kind === 40
          ? eq(events.content, bodyEvent.content)
          : eq(events.id, bodyEvent.id)
      );
    if (existingEvent.length !== 0) {
      console.log("Event already exists");
      return { status: "Dump" };
    } else {
      const newEvent: InsertEvent = {
        id: bodyEvent.id,
        pubkey: bodyEvent.pubkey,
        created_at: bodyEvent.created_at,
        kind: bodyEvent.kind,
        tags: JSON.stringify(bodyEvent.tags),
        content: bodyEvent.content,
        sig: bodyEvent.sig,
      };
      const dbSave = drizzleDb.insert(events).values(newEvent).run();
      console.log("New event added");
      return dbSave;
    }
  } catch (e) {
    console.error(e); // Log the error for debugging purposes
    throw createError({
      statusCode: 400,
      statusMessage: e.message || "Bad Request",
    });
  }
});
