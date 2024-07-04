// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: [
    "/*"
  ],
  exclude: [
    "/_nuxt/*",
    "/",
    "/_payload.json",
    "/_payload.json.br",
    "/_payload.json.gz",
    "/200",
    "/200.html.br",
    "/200.html.gz",
    "/404",
    "/404.html.br",
    "/404.html.gz",
    "/admin",
    "/favicon.ico",
    "/icon.png",
    "/index.html.br",
    "/index.html.gz",
    "/admin/config.yml",
    "/admin/style.css",
    "/admin/style.css.br",
    "/admin/style.css.gz",
    "/category/articles",
    "/category/books",
    "/category/physics",
    "/category/source",
    "/category/tuts",
    "/content/6c2b5bfc492ab5d2c7bd898863c7a4db-d.webp",
    "/content/bagche.webp",
    "/content/Blogging.png",
    "/content/Building-Progressive-Web-Applications-with-Vuejs.webp",
    "/content/cv-photo-new.webp",
    "/content/default-og-image.webp",
    "/content/image-20230910124129148.png",
    "/content/image-20230910124458790.png",
    "/content/image-20230910124542599.png",
    "/content/image-20230910125312646.png",
    "/content/image-20230910131055636.png",
    "/content/image-20230912155002189.png",
    "/content/image-20230912155242101.png",
    "/content/image-20230912155340616.png",
    "/content/image-20230912155516660.png",
    "/content/image-20230912190101019.png",
    "/content/library.jpg",
    "/content/mirotalksfu-header.gif",
    "/content/Modern-Web-Development-on-the-JAMstack.webp",
    "/content/physics.webp",
    "/content/positrondiscovery.webp",
    "/content/Programming-Language-PNG-Download-Image.png",
    "/content/The-Practitioners-Guide-To-Graph-Data.webp",
    "/content/tom-bombadil-and-goldberry.webp",
    "/content/totoro_render.webp",
    "/content/totoro-image-1.webp",
    "/content/totoro-image-12.webp",
    "/content/totoro-image-5.webp",
    "/content/totoro-image-6.webp",
    "/content/wasm-in-actions.png",
    "/content/web-assembly-logo.png",
    "/content/web3.js.webp",
    "/icons/android-chrome-192x192.png",
    "/icons/android-chrome-512x512.png",
    "/icons/apple-touch-icon.png",
    "/icons/favicon-16x16.png",
    "/icons/favicon-32x32.png",
    "/notes/building-progressive-web-applications-with-vue-js",
    "/notes/getting-started-with-ethereum",
    "/notes/intro-wasm",
    "/notes/modern-web-development-on-the-jamstack",
    "/notes/self-learning-physics",
    "/notes/the-positron",
    "/notes/the-practitioner-s-guide-to-graph-data",
    "/notes/tom-bombadil-and-goldberry",
    "/notes/webassembly-in-action",
    "/pages/about",
    "/pages/contact",
    "/_ipx/_/image-20230912155002189.png",
    "/_ipx/_/image-20230912155340616.png",
    "/_ipx/_/image-20230912155516660.png",
    "/_ipx/_/image-20230912190101019.png",
    "/_ipx/q_50&blur_3&s_50x25/physics.webp",
    "/_ipx/q_50&blur_3&s_50x25/positrondiscovery.webp",
    "/_ipx/w_1280/6c2b5bfc492ab5d2c7bd898863c7a4db-d.webp",
    "/_ipx/w_1280/Blogging.png",
    "/_ipx/w_1280/Building-Progressive-Web-Applications-with-Vuejs.webp",
    "/_ipx/w_1280/library.jpg",
    "/_ipx/w_1280/Modern-Web-Development-on-the-JAMstack.webp",
    "/_ipx/w_1280/physics.webp",
    "/_ipx/w_1280/positrondiscovery.webp",
    "/_ipx/w_1280/Programming-Language-PNG-Download-Image.png",
    "/_ipx/w_1280/The-Practitioners-Guide-To-Graph-Data.webp",
    "/_ipx/w_1280/tom-bombadil-and-goldberry.webp",
    "/_ipx/w_1280/totoro-image-12.webp",
    "/_ipx/w_1280/wasm-in-actions.png",
    "/_ipx/w_1280/web-assembly-logo.png",
    "/_ipx/w_384/6c2b5bfc492ab5d2c7bd898863c7a4db-d.webp",
    "/_ipx/w_384/Blogging.png",
    "/_ipx/w_384/Building-Progressive-Web-Applications-with-Vuejs.webp",
    "/_ipx/w_384/library.jpg",
    "/_ipx/w_384/Modern-Web-Development-on-the-JAMstack.webp",
    "/_ipx/w_384/physics.webp",
    "/_ipx/w_384/positrondiscovery.webp"
  ]
};

// node_modules/.pnpm/wrangler@3.62.0_@cloudflare+workers-types@4.20240620.0/node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "/home/imanoel/Projects/Inbox/.wrangler/tmp/pages-2uUJJ8/functionsWorker-0.0107383825179721.mjs";
import { isRoutingRuleMatch } from "/home/imanoel/Projects/Inbox/node_modules/.pnpm/wrangler@3.62.0_@cloudflare+workers-types@4.20240620.0/node_modules/wrangler/templates/pages-dev-util.ts";
export * from "/home/imanoel/Projects/Inbox/.wrangler/tmp/pages-2uUJJ8/functionsWorker-0.0107383825179721.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        if (worker.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return worker.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=sen6gi4332s.js.map
