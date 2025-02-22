import { defineStore } from 'pinia'

interface User {
  name: string
  email: string
  role: string
}
interface AuthResponse {
  access_token: string,
  status: string,
  user: User
}
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useCookie('token'), // Using cookies for SSR
    user: <User>{}
  }),

  actions: {
    async login(email: string, password: string,remember: boolean = false) {
      try {
        const { data } = await useFetch<AuthResponse>('/api/login', {
          method: 'POST',
          body: { email, password },
        })

        if (data.value?.access_token) {
          this.token = data.value.access_token
          this.user = data.value.user
          useCookie('token').value = data.value.access_token // Store token in cookie
          // await this.fetchUser()
          return true
        }
      } catch (error) {
        console.error('Login failed', error)
        return false
      }
    },

    async fetchUser() {
      if (!this.token) return
      try {
        const { data } = await useFetch<User>('/api/me', {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        if (data.value) {
          this.user = data.value
        }
      } catch (error) {
        console.error('Failed to fetch user', error)
      }
    },

    logout() {
      console.log('Logout')
      this.token = null
      this.user = <User>{}
      useCookie('token').value = null
    },
  },
  persist: true,
})
