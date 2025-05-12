export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')

  try {
    // Read multipart form data correctly
    const body = await readBody(event)
    console.log('body', body)
    if (!body) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid FormData' })
    }
    console.log('body', body)
    const formData = new FormData()
    const config = useRuntimeConfig()

    formData.append('is_active', body.is_active)
    formData.append('banner_id', body.banner_id)
  
    // Send the FormData to the API
    const data = await $fetch<{ token: string; user: any }>(
      `${config.public.apiBase}/banner/update-status`,
      {
        method: 'POST',
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
