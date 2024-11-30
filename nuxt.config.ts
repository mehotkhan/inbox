import viteCompression from "vite-plugin-compression";
import { generateRoutes } from "./tools/contentRoutes";

export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  css: ["@/assets/scss/base.scss", "@/assets/scss/extra.scss"],
  devtools: { enabled: false },

  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "nitro-cloudflare-dev",
    // "@nuxtjs/seo",
  ],

  // extends: ["nuxt-seo-kit"],
  runtimeConfig: {
    ownersPub: "",
    inboxPriv: "",
    openaiToken: "",
    aiToken: "",
    clAccountId: "",
    githubToken: "",
    githubClientId: "",
    githubRepo: "",
    app: {
      github: "https://github.com/mehotkhan",
      linkedin: "https://www.linkedin.com/in/ali-zemani/",
      twitter: "https://www.twitter.com/ZemaniAli/",
      language: "fa",
      color: "#e5e7eb",
    },
  },

  app: {
    pageTransition: { name: "page", mode: "in-out" },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        },
      },
    },
    plugins: [viteCompression({ algorithm: "brotliCompress" })],
    build: {
      sourcemap: false,
      minify: true,
      rollupOptions: { treeshake: true },
    },
  },

  nitro: {
    preset: "cloudflare-pages",
    compressPublicAssets: true,
    minify: true,
    prerender: {
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
    "/serverless-api/**": { ssr: true }, // Keep server-side rendering for specific API routes
  },

  content: {
    experimental: {
      clientDB: true,
    },
    markdown: {
      toc: { depth: 3, searchDepth: 3 },
    },
    highlight: {
      theme: "github-dark",
      preload: ["ts", "js", "css", "json", "go"],
    },
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
    defaultLocale: "en",
    strategy: "prefix",
  },
  imports: {
    dirs: ["composables/**"],
  },

  compatibilityDate: "2024-09-02",
});
