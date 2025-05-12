export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')

  try {
   const body = await readBody(event)
   const config = useRuntimeConfig()
   
    const formData = new FormData()

    // Function to get the value of a field
    // Append order fields to FormData
    if (body && typeof body === 'object') {
      Object.entries(body).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value.toString())
        }
      })
    }
    // Send the FormData to the API
      console.log(formData)
    const data = await $fetch<{ token: string; user: any }>(
      `${config.public.apiBase}/order/update/${event.context.params?.id}`,
      {
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      }
    )

    return data
  } catch (error: unknown) {
    console.error('Error:', error)
    if (
      typeof error === 'object' &&
      error !== null &&
      'statusCode' in error &&
      error.statusCode === 403
    ) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Unauthorized',
      })
    }
    throw createError({
      statusCode: 400,
      statusMessage: `Error: ${
        error instanceof Error ? error.message : String(error)
      }`,
      data: error,
    })
  }
})