export default defineEventHandler(async (event) => {
  const { year, month, day } = getQuery(event);
  // Fetch today's events from the holiday API
  const holidayApiUrl = `https://holidayapi.ir/gregorian/${year}/${month}/${day}`;
  const todayEvents = await fetch(holidayApiUrl);

  // Parse the JSON response from the holiday API
  const todayJson: any = await todayEvents.json();

  // Map the descriptions of today's events
  // const desEvents = todayJson.events.map((event: any) => event.description);
  return todayJson;
});
