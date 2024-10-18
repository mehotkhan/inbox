export default defineEventHandler(async (event) => {
  const requestURL = getRequestURL(event);
  const pathname = requestURL.pathname;

  if (pathname.startsWith("/serverless-api/")) {
    let config = {
      ownersPub: "",
      inboxPriv: "",
      openaiToken: "",
      aiToken: "",
      clAccountId: "",
      githubToken: "",
      githubClientId: "",
      githubRepo: "",
    };
    const { inboxKV } = event.context.cloudflare.env;
    const appConfigKey = "app:config";

    if (process.env.NODE_ENV === "production") {
      const appConfig = await inboxKV.get(appConfigKey);
      config = JSON.parse(appConfig);
    } else {
      //DEVELOPER AREA!!
      const {
        ownersPub,
        inboxPriv,
        openaiToken,
        aiToken,
        clAccountId,
        githubToken,
        githubClientId,
        githubRepo,
      } = useRuntimeConfig(event);

      config = {
        ownersPub,
        inboxPriv,
        openaiToken,
        aiToken,
        clAccountId,
        githubToken,
        githubClientId,
        githubRepo,
      };
      await inboxKV.put(appConfigKey, JSON.stringify(config));
    }

    event.context.inboxConfig = config;
  }
});
