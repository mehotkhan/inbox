export const getFilteredEvents = async (filters: NostrFilter[]) => {
  // console.log("filters", filters);
  // const { D1 } = event.context.cloudflare.env;

  const drizzleDb = initDrizzle();
  return await drizzleDb.select().from(events);
};
