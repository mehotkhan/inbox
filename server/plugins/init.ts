export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook("beforeResponse", async (event: any) => {
    // const requestURl = getRequestURL(event);
    // console.log("Event,", requestURl.pathname);
    // Will run when nitro is being closed
  });
});
