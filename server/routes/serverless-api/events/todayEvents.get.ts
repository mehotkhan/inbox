export default defineEventHandler(async (event) => {
  const { year, month, day } = getQuery(event);
  const { inboxKV } = event.context.cloudflare.env;

  if (!year || !month || !day) {
    throw new Error("Year, month, and day are required parameters.");
  }

  const todayKvKey = `calendar:events:${year}/${month}/${day}`;

  // Check if today's events already exist in the KV storage
  let todayEvents = await inboxKV.get(todayKvKey);
  if (todayEvents) {
    console.log("Cache hit:", todayKvKey);
    return JSON.parse(todayEvents);
  }

  // Fetch today's events from the holiday API if not found in KV storage
  try {
    const holidayApiUrl = `https://holidayapi.ir/gregorian/${year}/${month}/${day}`;
    const response = await fetch(holidayApiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch data from holiday API");
    }

    todayEvents = await response.json();
    await inboxKV.put(todayKvKey, JSON.stringify(todayEvents));

    console.log("Cache miss - new data fetched:", todayKvKey);
    return todayEvents;
  } catch (error) {
    console.error("Error fetching holiday API data:", error);
    throw error;
  }
});
