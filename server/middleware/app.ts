export default defineEventHandler(async (event) => {
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
    console.log(JSON.stringify(config));
  }

  event.context.inboxConfig = config;
});
