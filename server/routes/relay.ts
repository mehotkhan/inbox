import { defineHooks } from "crossws";
// import wsAdapter from "crossws/adapters/cloudflare";

// const { handleUpgrade } = wsAdapter({
//   hooks: {
//     upgrade(req) {
//       console.log(`[ws] upgrading ${req.url}...`);
//       return {
//         headers: {},
//       };
//     },
//     open(peer) {
//       console.log("[ws] open", peer);
//     },

//     message(peer, message) {
//       console.log("[ws] message", peer, message);
//       if (message.text().includes("ping")) {
//         peer.send("pong");
//       }
//     },

//     close(peer, event) {
//       console.log("[ws] close", peer, event);
//     },

//     error(peer, error) {
//       console.log("[ws] error", peer, error);
//     },
//   },
// });

const hooks = defineHooks({
  upgrade(req) {
    console.log(`[ws] upgrading ${req.url}...`);
    return {
      headers: {},
    };
  },
  open(peer) {
    console.log(`[ws] open: ${peer}`);
  },

  message(peer, message) {
    console.log("[ws] message", peer, message);
    if (message.text().includes("ping")) {
      peer.send("pong");
    }
  },

  close(peer, event) {
    console.log("[ws] close", peer, event);
  },

  error(peer, error) {
    console.log("[ws] error", peer, error);
  },
});

export default defineEventHandler({
  handler() {
    throw createError({
      statusCode: 426,
      statusMessage: "Upgrade Required",
    });
  },
  websocket: hooks,
});
