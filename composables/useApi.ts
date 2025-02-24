// composables/useAxios.js
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useRuntimeConfig } from '#imports'

  const config = useRuntimeConfig()
  const authStore = useAuthStore()


// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: <string>config.public.apiBase,// Replace with your backend API URL
})

// Add a request interceptor to include the token on every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from the store or cookies (adjust as per your setup)
    const token = authStore.token || '' // Or use your Pinia store

    // If token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Return the Axios instance
export const useApi = () => {
  return axiosInstance
}
