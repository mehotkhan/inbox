export const cloudflareAI = async (model: string, input: any) => {
  const { aiToken, clAccountId } = useRuntimeConfig();
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${clAccountId}/ai/run/${model}`,
    {
      headers: { Authorization: `Bearer ${aiToken}` },
      method: "POST",
      body: JSON.stringify(input),
    }
  );
  return response;
};
