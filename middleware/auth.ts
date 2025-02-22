export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to, from)
  const token = useCookie('token').value
  if (!token) return navigateTo('/admin/login')
})
