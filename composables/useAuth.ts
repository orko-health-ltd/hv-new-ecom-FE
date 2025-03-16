import { jwtDecode } from 'jwt-decode'
export const useAuth = () => {
  const token = useCookie('token') // Reactive token reference

  // Function to check if token is valid
  const isTokenValid = () => {
    if (!token.value) return false

    try {
      const decoded: { exp: number } = jwtDecode(token.value)
      const now = Math.floor(Date.now() / 1000) // Current time in seconds
      return decoded.exp > now // Token is valid if expiry is in the future
    } catch (error) {
      return false // If decoding fails, token is invalid
    }
  }

  // Function to get authentication headers
  const getAuthHeaders = () => {
    if (!isTokenValid()) {
      return null // Return null instead of throwing an error
    }

    return {
      Authorization: `Bearer ${token.value}`,
    }
  }

  return { getAuthHeaders, isTokenValid }
}
