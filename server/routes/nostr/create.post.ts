import type { Event as NostrEvent } from "nostr-tools";

export default defineEventHandler(async (event: any) => {
  try {
    const bodyEvent: NostrEvent = await readBody(event);
    const newEvent = await createNewEvent(bodyEvent);
    // console.log("added", newEvent);
    return "ok";
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
