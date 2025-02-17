import { defineNuxtPlugin } from '#app'
import { usePinia } from '#imports' // Use Nuxt's built-in Pinia
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = usePinia() // Get the existing Pinia instance
  pinia.use(piniaPluginPersistedState)
})
