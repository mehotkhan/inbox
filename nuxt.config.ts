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
    "nitro-cloudflare-dev",
    "@nuxt/eslint",
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
    // build: {
    // watch: {},
    // sourcemap: false,
    // minify: true,
    // rollupOptions: { treeshake: false },
    // },
  },

  nitro: {
    experimental: {
      websocket: true,
      tasks: true,
    },
    // preset: "cloudflare-pages",

    // static: true,
    // compressPublicAssets: true,
    // minify: true,
    prerender: {
      crawlLinks: false,
      routes: GenerateRoutes(["notes", "cat"]),
    },
  },

  experimental: {
    renderJsonPayloads: true,
    viewTransition: true,
  },
  image: {
    dir: "assets/content",
    format: ["webp"],
  },

  // hooks: {
  //   "build:done": () => {
  //     GenerateDecap();
  //   },
  //   "nitro:init": () => {
  //     GenerateDecap();
  //   },
  // },

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
    locales: [
      {
        code: "fa",
        file: "fa.json",
      },
      {
        code: "en",
        file: "en.json",
      },
    ],
    // lazy: true,
    langDir: "locales",
    defaultLocale: "fa",
  },
  imports: {
    dirs: ["composables/**"],
  },

  compatibilityDate: "2024-07-04",
});
