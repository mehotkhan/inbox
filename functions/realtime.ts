import { WebUUID } from "web-uuid";

export async function onRequest(context: any) {
  const currentLength = 0;
  const upgradeHeader = context.request.headers.get("Upgrade");
  if (!upgradeHeader || upgradeHeader !== "websocket") {
    return new Response("Expected Upgrade: websocket", { status: 426 });
  }

  const webSocketPair = new WebSocketPair();
  const [client, server] = Object.values(webSocketPair);
  server.accept();
  server.addEventListener("message", async ({ data }) => {
    console.log("incoming from server", JSON.parse(data));
    // const id = new WebUUID();
    // server.send("NEW-MESSAGE" + id);

    // await context.env.ALIZEMANI.put(
    //   "messages/" + id,
    //   JSON.stringify(data)
    // );
  });
  // setInterval(async () => {
  //   const query = await context.env.ALIZEMANI.list({
  //     // prefix: "comments/pending/",
  //     prefix: "comments/pending/",
  //   });
  //   const pendingComments = await query.keys.map((item: any) => item.name);
  //   if (currentLength === 0) {
  //     currentLength = pendingComments.length;
  //     server.send("NEW-MESSAGE-ARRAY:" + JSON.stringify(pendingComments));
  //   } else if (currentLength !== pendingComments.length) {
  //     currentLength = pendingComments.length;
  //     server.send("NEW-MESSAGE-ARRAY:" + JSON.stringify(pendingComments));
  //   }
  // }, 2000);

  server.addEventListener("close", async (evt: any) => {
    console.log(evt);
  });

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}

const test = [
  "REQ",
  "9600211011305111",
  {
    ids: ["d7dd5eb3ab747e16f8d0212d53032ea2a7cadef53837e5a6c66d42849fcb9027"],
  },
];
