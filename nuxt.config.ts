// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    // '@nuxt/icon',
    // '@nuxtjs/tailwindcss',
    // // '@nuxt/ui-edge',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/ui',
    '@vite-pwa/nuxt',
  ],
  app: {
    head: {
      meta: [{ name: 'author', content: 'Ishmam Bin Azim' }],
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
})