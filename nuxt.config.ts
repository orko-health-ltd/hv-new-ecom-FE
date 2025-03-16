// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL,
    },
  },
  // routeRules: {
  //   '/api/**': { appMiddleware: ['~/server/middleware/auth.ts'] }, // Apply to all API routes
  // },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: true,

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