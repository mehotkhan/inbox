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

    if (process.env.NODE_ENV === "production") {
      const { inboxKV } = event.context.cloudflare.env;
      const appConfigKey = "app:config";

      const appConfig = await inboxKV.get(appConfigKey);
      config = JSON.parse(appConfig);
    } else {
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
    }

    event.context.inboxConfig = config;
  }
});
