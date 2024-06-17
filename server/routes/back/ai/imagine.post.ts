import cloudflareAI from "~/server/utils/cloudlfareAi";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const inputs = {
    prompt: body.imagineText,
  };
  const aiResponse: any = await cloudflareAI(
    "@cf/stabilityai/stable-diffusion-xl-base-1.0",
    inputs,
  );
  const blob = await aiResponse.blob();
  const buffer = Buffer.from(await blob.arrayBuffer());
  const base64String =
    "data:" + blob.type + ";base64," + buffer.toString("base64");
  return {
    response: base64String,
  };
});
