// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [// '@nuxt/icon',
  // '@nuxtjs/tailwindcss',
  // // '@nuxt/ui-edge',
  '@nuxt/ui',
  '@pinia/nuxt', '@nuxt/ui'],
  
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
})