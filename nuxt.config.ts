import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";
import viteCompression from "vite-plugin-compression";
import { GenerateRoutes } from "./tools/contentRoutes";
import { GenerateDecap } from "./tools/configs-generators";

export default defineNuxtConfig({
  ssr: true,
  css: ["@/assets/scss/base.scss", "@/assets/scss/extra.scss"],
  devtools: { enabled: false },

  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    // "nuxt-gtag",
    "@nuxt/image",
    "@nuxtjs/i18n",
  ],
  // extends: ["nuxt-seo-kit"],
  runtimeConfig: {
    app: {
      title: process.env.SITE_NAME,
      description: process.env.SITE_DESCRIPTIONS,
      titleFirst: process.env.SITE_TITLE_FIRST,
      titleSecond: process.env.SITE_TITLE_SECOND,
      github: process.env.GITHUB,
      linkedin: process.env.LINKEDIN,
      twitter: process.env.TWITTER,
      favicon: "/favicon.ico",
      icon: "/icons.png",
      color: "#e5e7eb",
    },
    public: {
      siteUrl: process.env.PUBLIC_SITE_URL,
      siteName: process.env.SITE_NAME,
      siteDescription: process.env.SITE_DESCRIPTIONS,
      language: process.env.SITE_LANGUAGE,
    },
  },
  app: {
    pageTransition: { name: "page", mode: "in-out" },
  },
  vite: {
    plugins: [
      viteCompression({ algorithm: "brotliCompress" }),
      Components({
        resolvers: [
          IconsResolver({
            prefix: "Icon",
          }),
        ],
      }),
      Icons(),
    ],
    build: {
      watch: {},
      sourcemap: false,
      minify: true,
      rollupOptions: { treeshake: false },
    },
  },
  nitro: {
    experimental: {
      websocket: true,
    },
    // preset: "cloudflare-pages",

    // static: true,
    // compressPublicAssets: true,
    // minify: true,
    // prerender: {
    //   crawlLinks: false,
    //   routes: GenerateRoutes(["notes", "pages", "category"]),
    // },
  },
  // experimental: {
  //   payloadExtraction: false,
  //   treeshakeClientOnly: false,
  //   inlineSSRStyles: false,
  // },
  // image: {
  //   format: ["webp"],
  //   provider: "ipx",
  //   ipx: {
  //     modifiers: {
  //       quality: "80",
  //       format: ["webp"],
  //     },
  //   },
  // },
  hooks: {
    "build:done": () => {
      GenerateDecap();
    },
    "nitro:init": () => {
      GenerateDecap();
    },
  },
  image: {
    dir: "assets/content",
  },
  // gtag: {
  //   id: "G-78646PGVN1",
  // },
  content: {
    highlight: {
      theme: "github-dark",
      preload: ["ts", "js", "css", "json", "go"],
    },
  },
  i18n: {
    vueI18n: "./i18n.config.ts", // if you are using custom path, default
  },
  imports: {
    dirs: ["composables/**"],
  },
});
