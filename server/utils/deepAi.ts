const API_TOKEN = "831f9fc6-d995-419e-8faa-f58f6cfee11b";

export default async function cloudflareAI(input: any) {
  const resp = await fetch("https://api.deepai.org/api/text2img", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": "831f9fc6-d995-419e-8faa-f58f6cfee11b",
    },
    body: JSON.stringify({
      text: "orange cat",
    }),
  });

  const data = await resp.json();
  console.log(data);
  return data;
}
