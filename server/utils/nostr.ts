export const getFilteredEvents = async (filters: NostrFilter[]) => {
  console.log("filters", filters);
  return await drizzleDb.select().from(events);
};

export const setEvents = (event: NostrEvent) => {
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
};
