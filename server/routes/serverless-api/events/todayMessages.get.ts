import { DateTime } from "luxon";

export default defineEventHandler(async (event) => {
  const { inboxKV } = event.context.cloudflare.env;
  const { inboxConfig } = event.context;

  // Get today's date using Luxon in the specified timezone
  const today = DateTime.now().setZone("Asia/Tehran");
  const todayKvKey = `calendar:messages:${today.toFormat("yyyy/MM/dd")}`;

  // Check if today's message is already cached in KV
  let generatedMessage = await inboxKV.get(todayKvKey);

  // if (!generatedMessage) {
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
  const eventDescriptions = todayJson.events
    .map((event: any) => event.description)
    .join(", ");
  const userContent = `رخدادهای امروز: ${eventDescriptions}`;

  // Define the conversation messages for the GPT-4 model
  const messages = [
    {
      role: "system",
      content:
        "با استفاده از رخدادهای داده شده، امروز را به شکلی دوستانه و مثبت توصیف کن.",
    },
    {
      role: "user",
      content: userContent,
    },
  ];

  try {
    const aiResponse = await openAIApi("gpt-4", messages, inboxConfig, {
      max_tokens: 2000,
      temperature: 0.7, // Adjusted for creativity and coherence
      top_p: 0.9, // Adjusted for response quality
    });

    const generatedContent = aiResponse?.choices?.[0]?.message?.content;

    if (generatedContent) {
      // Cache the generated response in KV
      await inboxKV.put(todayKvKey, generatedContent);
      generatedMessage = generatedContent;
    } else {
      generatedMessage = "Failed to generate a response.";
    }
  } catch (error) {
    console.error("Error generating the response:", error);
    generatedMessage = "Error generating the response.";
  }
  // }

  return { message: generatedMessage };
});
