// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL,
    },
  },
  nitro: {
    devProxy: {
      '/api': {
        target: process.env.NITRO_PORT || 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: false,

  modules: [
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
    prefix: '',
    componentDir: 'components/ui',
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
    strict: true,
  },
})