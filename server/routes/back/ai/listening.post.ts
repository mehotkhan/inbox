import cloudflareAI from "~/server/utils/cloudlfareAi";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const messages = [
    {
      role: "user",
      content: body.story,
    },
  ];
  body.promps.forEach((element: any) => {
    messages.push({
      role: "system",
      content: element.promp,
    });
  });
  const aiResponse = await cloudflareAI("@cf/meta/llama-2-7b-chat-fp16", {
    messages,
  });
  const response = await aiResponse.json();

  return {
    title: body.title,
    response: response.result.response,
  };
});
