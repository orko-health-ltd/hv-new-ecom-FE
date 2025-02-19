import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useCookie('token'), // Using cookies for SSR
    user: null,
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        const { data } = await useFetch('/api/login', {
          method: 'POST',
          body: { email, password },
        })

        if (data.value?.token) {
          this.token = data.value.token
          useCookie('token').value = data.value.token // Store token in cookie
          await this.fetchUser()
        }
      } catch (error) {
        console.error('Login failed', error)
      }
    },

    async fetchUser() {
      if (!this.token) return
      try {
        const { data } = await useFetch('/api/me', {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        this.user = data.value
      } catch (error) {
        console.error('Failed to fetch user', error)
      }
    },

    logout() {
      this.token = null
      this.user = null
      useCookie('token').value = null
    },
  },
})
