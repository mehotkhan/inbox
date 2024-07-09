import { onRequest as __github_auth_auth_ts_onRequest } from "/home/imanoel/Projects/Inbox/functions/github-auth/auth.ts";
import { onRequest as __github_auth_callback_ts_onRequest } from "/home/imanoel/Projects/Inbox/functions/github-auth/callback.ts";

export const routes = [
  {
    routePath: "/github-auth/auth",
    mountPath: "/github-auth",
    method: "",
    middlewares: [],
    modules: [__github_auth_auth_ts_onRequest],
  },
  {
    routePath: "/github-auth/callback",
    mountPath: "/github-auth",
    method: "",
    middlewares: [],
    modules: [__github_auth_callback_ts_onRequest],
  },
];
