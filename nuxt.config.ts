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
    '@vueuse/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'shadcn-nuxt',
  ],
  app: {
    head: {
      meta: [{ name: 'author', content: 'Ishmam Bin Azim' }],
    },
  },
 shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "components/ui"
     */
    componentDir: 'components/ui'
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
})
