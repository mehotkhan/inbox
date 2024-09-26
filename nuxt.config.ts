import viteCompression from "vite-plugin-compression";
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
    "nitro-cloudflare-dev",
    "@nuxtjs/seo",
  ],

  // extends: ["nuxt-seo-kit"],
  runtimeConfig: {
    app: {
      github: "https://github.com/mehotkhan",
      linkedin: "https://www.linkedin.com/in/ali-zemani/",
      twitter: "https://www.twitter.com/ZemaniAli/",
      language: "fa",
      githubRepo: "mehotkhan/Inbox",
      color: "#e5e7eb",
      githubToken: "",
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
      watch: {},
      sourcemap: false,
      minify: true,
      rollupOptions: { treeshake: false },
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
    // renderJsonPayloads: true,
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
  },

  content: {
    // experimental: {
    //   clientDB: true,
    // },
    // documentDriven: true,
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

  compatibilityDate: "2024-09-02",
});
