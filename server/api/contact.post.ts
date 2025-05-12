export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')
  try {
    const body = await readBody(event)
    const { name, email , phone , message } = body

    const config = useRuntimeConfig()

    // Create FormData object
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('message', message)

    const data = await $fetch<{ success: string; message: any }>(
      `${config.public.apiBase}/contact-message/create`,
      {
        method: 'POST',
        body: formData, // Send as FormData
      
      }
    )

    return data
  } catch (error) {
    console.log(error)
    throw createError({
      statusCode: 400,
      statusMessage: 'Error' + error,
      data: error,
    })
  }
})
