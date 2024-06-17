import deepAI from "~/server/utils/deepAi";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const inputs = {
    text: body.story,
  };
  const aiResponse: any = await deepAI(inputs);
  // const blob = await aiResponse.blob();
  // const buffer = Buffer.from(await blob.arrayBuffer());
  // const base64String = "data:" + blob.type + ';base64,' + buffer.toString('base64');
  return {
    title: body.title,
    // response: base64String,
  };
});
