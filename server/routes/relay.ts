// https://crossws.unjs.io/adapters
// import wsAdapter from "crossws/adapters/bun";

// import { defineHooks } from "crossws";

// const hooks = defineHooks({
//   upgrade(req) {
//     console.log(`[ws] upgrading ${req.url}...`);
//     // return {
//     //   headers: {},
//     // };
//   },

//   open(peer) {
//     console.log(`[ws] open: ${peer}`);
//   },

//   message(peer, message) {
//     console.log("[ws] message", peer, message);
//   },

//   close(peer, event) {
//     console.log("[ws] close", peer, event);
//   },

//   error(peer, error) {
//     console.log("[ws] error", peer, error);
//   },
// });

// const { websocket, handleUpgrade } = wsAdapter({
//   hooks,
// });

// const testData = createCrossWS();
// // export default websocket;
// export default defineEventHandler({
//   handler() {
//     throw createError({
//       statusCode: 426,
//       statusMessage: "Upgrade Required",
//     });
//   },
//   websocket,
// });

// export default wsAdapter({
//   hooks: {
//     message: console.log,
//   },
// });
