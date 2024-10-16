import { DateTime } from "luxon";

export default defineEventHandler(async (event) => {
  const { inboxKV, inboxConfig } = event.context.cloudflare.env;

  // Get today's date using Luxon in the specified timezone
  const today = DateTime.now().setZone("Asia/Tehran");
  const todayKvKey = `calendar:messages:${today.toFormat("yyyy/MM/dd")}`;

  // Check if today's message is already cached in KV
  let generatedMessage = await inboxKV.get(todayKvKey);
  if (!generatedMessage) {
    const todayEventsKey = `calendar:events:${today.toFormat("yyyy/MM/dd")}`;
    let todayEvents = await inboxKV.get(todayEventsKey);

    if (!todayEvents) {
      // Fetch today's events from the holiday API if not in KV
      const holidayApiUrl = `https://holidayapi.ir/gregorian/${today.toFormat("yyyy/MM/dd")}`;
      const response = await fetch(holidayApiUrl);
      todayEvents = await response.text();
      await inboxKV.put(todayEventsKey, todayEvents);
    }

    const todayJson = JSON.parse(todayEvents);
    const desEvents = todayJson.events
      .map((event: any) => event.description)
      .join(", ");
    const userContent = `  ${desEvents}`;

    // Define the conversation messages for the GPT-4 model
    const messages = [
      {
        role: "system",
        content:
          "Based on the events you provide, generate a text to describe today",
      },
      {
        role: "user",
        content: userContent,
      },
    ];

    // Call Cloudflare AI to generate a text based on today's events
    const aiResponse = await cloudflareAI(
      "@hf/nousresearch/hermes-2-pro-mistral-7b",
      {
        messages,
        max_tokens: 1000,
      },
      inboxConfig
    );

    // Cache the generated response in KV and set the final generated message
    generatedMessage =
      aiResponse?.result?.response || "Failed to generate a response.";
    await inboxKV.put(todayKvKey, generatedMessage);
  }

  return { message: generatedMessage };
});
