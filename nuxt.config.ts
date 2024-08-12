// import viteCompression from "vite-plugin-compression";
import { generateRoutes } from "./tools/contentRoutes";

export default defineNuxtConfig({
  ssr: true,
  future: { compatibilityVersion: 4 },
  css: ["@/assets/scss/base.scss", "@/assets/scss/extra.scss"],
  devtools: { enabled: false },

  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "nuxt-tiptap-editor",
  ],

  runtimeConfig: {
    app: {
      title: "",
      description: "",
      titleFirst: "",
      titleSecond: "",
      github: "",
      linkedin: "",
      twitter: '""',
      language: "",
      githubToken: "",
      githubRepo: "",
      color: "#e5e7eb",
    },
  },

  app: {
    pageTransition: { name: "page", mode: "in-out" },
  },

  // vite: {
  //   plugins: [viteCompression({ algorithm: "brotliCompress" })],
  //   build: {
  //     watch: {},
  //     sourcemap: false,
  //     minify: true,
  //     rollupOptions: { treeshake: false },
  //   },
  // },

  nitro: {
    experimental: {
      websocket: true,
      tasks: true,
    },
    // preset: "cloudflare-pages",
    // static: true,
    compressPublicAssets: true,
    minify: true,
    prerender: {
      crawlLinks: false,
      failOnError: false,
      concurrency: 12,
      routes: generateRoutes(),
    },
  },

  experimental: {
    renderJsonPayloads: true,
    viewTransition: true,
  },
  image: {
    format: ["webp"],
  },

  // gtag: {
  //   id: "G-78646PGVN1",
  // },

  routeRules: {
    "/**": { prerender: true }, // Prerender (SSG) all routes by default
    "/api/**": { ssr: true }, // Keep server-side rendering for specific API routes
    "/nostr-relay": { ssr: true }, // Keep server-side rendering for specific API routes
    "/webrtc/**": { ssr: true }, // Keep server-side rendering for specific API routes
  },
  content: {
    experimental: {
      clientDB: true,
    },
    documentDriven: true,
    markdown: {
      toc: { depth: 3, searchDepth: 3 },
    },
    highlight: false,
    // highlight: {
    //   theme: "github-dark",
    //   preload: ["ts", "js", "css", "json", "go"],
    // },
  },

  i18n: {
    locales: [
      {
        name: "فارسی",
        dir: "rtl",
        code: "fa",
        file: "fa.json",
      },
      {
        name: "English",
        dir: "ltr",
        code: "en",
        file: "en.json",
      },
    ],
    // lazy: true,
    langDir: "locales",
    defaultLocale: "fa",
    strategy: "prefix",
  },
  imports: {
    dirs: ["composables/**"],
  },
  tiptap: {
    prefix: "Tiptap",
    lowlight: {
      theme: "github-dark",
    },
  },
  compatibilityDate: "2024-07-04",
});
