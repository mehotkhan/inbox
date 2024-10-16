import { DateTime } from "luxon";

export default defineEventHandler(async (event) => {
  const { inboxConfig } = event.context;
  // Get today's date using Luxon for easier date management
  const today = DateTime.now().setZone("Asia/Tehran"); // Adjust the timezone if needed
  const year = today.year;
  const month = today.month;
  const day = today.day;

  // Fetch today's events from the holiday API
  const holidayApiUrl = `https://holidayapi.ir/gregorian/${year}/${month}/${day}`;
  const todayEvents = await fetch(holidayApiUrl);

  // Parse the JSON response from the holiday API
  const todayJson: any = await todayEvents.json();

  // Map the descriptions of today's events
  const desEvents = todayJson.events.map((event: any) => event.description);

  // Prepare content for Cloudflare AI, combining today's events
  const content = `  ${desEvents.join(", ")}`;

  // Define the conversation messages for the GPT-4 model
  const messages = [
    {
      role: "system",
      content: "base on events you give,generate text for describe today", // System message defining the assistant's behavior
    },
    {
      role: "user",
      content, // User message with the content asking to generate a story based on today's events
    },
  ];

  // Call Cloudflare AI to generate a text based on today's events
  const aiResponse: any = await cloudflareAI(
    "@hf/nousresearch/hermes-2-pro-mistral-7b",
    {
      messages,
      max_tokens: 1000,
    },
    inboxConfig
  );

  // Extract and return the AI-generated response
  const generatedMessage =
    aiResponse?.result?.response || "Failed to generate a response.";
  return { message: generatedMessage };
});
