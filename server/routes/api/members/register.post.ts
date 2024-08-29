import type { Event as NostrEvent } from "nostr-tools";

export default defineEventHandler(async (event) => {
  try {
    const bodyEvent: NostrEvent = await readBody(event);
    const { DB } = event.context.cloudflare.env;

    const userProfile = JSON.parse(bodyEvent.content);
    const newUser: InsertMember = {
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      displayName: userProfile.displayName,
      about: userProfile.about,
      avatar: userProfile.avatar,
      pub: userProfile.pub,
    };

    const newEvent: InsertEvent = {
      id: bodyEvent.id,
      pubkey: bodyEvent.pubkey,
      created_at: bodyEvent.created_at,
      kind: bodyEvent.kind,
      tags: JSON.stringify(bodyEvent.tags),
      content: bodyEvent.content,
      sig: bodyEvent.sig,
    };
    const drizzleDb = initDrizzle(DB);
    drizzleDb.insert(events).values(newEvent).run();
    drizzleDb.insert(member).values(newUser).run();
    return newEvent;
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
