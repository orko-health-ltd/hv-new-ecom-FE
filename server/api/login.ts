export default defineEventHandler(async (event) => {
  

  try {
    const body = await readBody(event)
    const { email, password } = body

  
    const config = useRuntimeConfig()

    // Create FormData object
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    const data = await $fetch<{ token: string; user: any }>(
      `${config.public.apiBase}/login`,
      {
        method: 'POST',
        body: formData, // Send as FormData
      }
    )

    return data
  } catch (error) {
   
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid login credentials'+error,
      data: error,
    })
  }
})
