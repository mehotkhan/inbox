const API_TOKEN = "Wujfeehxn6aigWzdmVeMj9UDUjFCKltBis49ta9f";

export default async function cloudflareAI(model: string, input: any) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/f9a92d69969273a83e53532b989a53af/ai/run/${model}`,
    {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      method: "POST",
      body: JSON.stringify(input),
    },
  );
  return response;
}
