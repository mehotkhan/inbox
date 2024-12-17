import type { RouterConfig } from "@nuxt/schema";
import type { RouteRecordRaw } from "vue-router";

// 👉 Redirects
const redirects: RouteRecordRaw[] = [
  // {
  //   path: "/",
  //   name: "index",
  //   meta: {
  //     middleware: (to) => {
  //       // const loggedIn = cookieRef<boolean | null>("user-logged-in", false);
  //       // if (loggedIn.value) return { name: "profile" };
  //       return { name: "login", query: to.query };
  //     },
  //   },
  //   component: h("div"),
  // },
  {
    path: "/",
    name: "index",
    redirect: (_to) => {
      const config = useRuntimeConfig();
      return config.app.language ? "/" + config.app.language : "/fa_ir/";
    },
  },
];

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  routes: (scannedRoutes) => [...redirects, ...scannedRoutes],
  scrollBehaviorType: "smooth",
};
