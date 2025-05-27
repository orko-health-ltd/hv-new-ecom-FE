export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')
  try {
    const body = await readBody(event)
    const { name ,email, password} = body

    const config = useRuntimeConfig()

    // Create FormData object
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)

    const data = await $fetch<{ token: string; user: any }>(
      `${config.public.apiBase}/create/user`,
      {
        method: 'POST',
        body: formData, // Send as FormData
          headers: {
        Authorization: `Bearer ${token}`,
      },
      },
    
    )

    return data
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Error'+ error,
      data: error,
    })
  }
})
