export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')
  try {
    const body = await readBody(event)
    const { name ,image,is_active} = body
    const id = event.context.params?.id
    
    const config = useRuntimeConfig()

    // Create FormData object
    const formData = new FormData()
    formData.append('name', name)
    formData.append('image', image)
    formData.append('is_active', is_active)

    const data = await $fetch<{ token: string; user: any }>(
      `${config.public.apiBase}/category/update?_id=${id}`,
      {
        method: 'PUT',
        body: formData, // Send as FormData
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return data
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Error' + error,
      data: error,
    })
  }
})
