export default defineNuxtRouteMiddleware((to, from) => {
  const { isTokenValid } = useAuth()
  const token = useCookie('token').value
 
  if (!token || !isTokenValid()) return navigateTo('/back-admin/login')
})
