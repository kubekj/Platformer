// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  imports: {
    autoImport: true,
  },
  modules: ["@nuxt/ui", "@pinia/nuxt"],
  compatibilityDate: "2025-02-09",
  nitro: {
    preset: "deno",
  },
  // css: ["~/assets/css/main.css"],
  build: {
    transpile: ["chart.js"],
  },
  app: {
    head: {
      title: "Yuiop - Experience Management Platform",
      meta: [
        {
          name: "description",
          content:
            "Create and manage unique experiences with our comprehensive platform.",
        },
      ],
    },
  },
});
