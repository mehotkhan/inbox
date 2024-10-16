export function onRequest(event: any) {
  const { request, inboxConfig } = event.context;

  try {
    const url = new URL(request.url);
    const redirectUrl = new URL("https://github.com/login/oauth/authorize");
    redirectUrl.searchParams.set("client_id", inboxConfig.githubToken);
    redirectUrl.searchParams.set(
      "redirect_uri",
      url.origin + "/github-auth/callback"
    );
    redirectUrl.searchParams.set("scope", "repo user");
    redirectUrl.searchParams.set(
      "state",
      crypto.getRandomValues(new Uint8Array(12)).join("")
    );
    return Response.redirect(redirectUrl.href, 301);
  } catch (error: any) {
    return new Response(error.message, {
      status: 500,
    });
  }
}
