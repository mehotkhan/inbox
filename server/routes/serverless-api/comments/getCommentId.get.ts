import { hexToBytes } from "@noble/hashes/utils";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { defineEventHandler } from "h3";
import { finalizeEvent } from "nostr-tools";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    // Validate required fields
    if (!query.path) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing path!",
      });
    }
    const { DB } = event.context.cloudflare.env;
    const { inboxPriv } = event.context.inboxConfig;
    const commentPath: string = query.path.toString();
    const drizzleDb = drizzle(DB);
    const existingEvent = await drizzleDb
      .select()
      .from(events)
      .where(eq(events.content, commentPath))
      .get();
    if (existingEvent) {
      return existingEvent;
    } else {
      const channelEvent: NostrEvent = finalizeEvent(
        {
          kind: 40,
          created_at: Math.floor(Date.now()),
          tags: [],
          content: commentPath,
        },
        hexToBytes(inboxPriv)
      );
      const newEvent: InsertEvent = {
        id: channelEvent.id,
        pubkey: channelEvent.pubkey,
        created_at: channelEvent.created_at,
        kind: channelEvent.kind,
        tags: JSON.stringify(channelEvent.tags),
        content: channelEvent.content,
        sig: channelEvent.sig,
        isVerified: true,
      };

      // Insert the new event into the database
      const newChannel = await drizzleDb
        .insert(events)
        .values(newEvent)
        .returning()
        .get();
      return newChannel;
    }
  } catch (e: any) {
    // Log the error for debugging (avoid logging sensitive info in production)
    console.error("Error creating EVENT:", e);

    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.statusMessage || "Internal Server Error",
    });
  }
});
