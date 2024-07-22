import type { Event as NostrEvent } from "nostr-tools";

export default defineEventHandler(async (event) => {
  try {
    const bodyEvent: NostrEvent = await readBody(event);
    const userProfile = JSON.parse(bodyEvent.content);
    const newUser: InsertMember = {
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      displayName: userProfile.displayName,
      about: userProfile.about,
      avatar: userProfile.avatar,
      pub: userProfile.pub,
    };

    setEvents(bodyEvent);
    drizzleDb.insert(member).values(newUser).run();
    const res = drizzleDb.select().from(member).all();
    console.log("register");
    return { res };
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
