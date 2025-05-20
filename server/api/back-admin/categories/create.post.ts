import { FormData, File } from 'formdata-node'
export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')

  try {
    // Read multipart form data correctly
    const body = await readMultipartFormData(event)
    if (!body) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid FormData' })
    }
    console.log('body', body)
    const formData = new FormData()
    const config = useRuntimeConfig()

    // Function to get the value of a field
    const getValue = (fieldName: string) => {
      const field = body.find((item) => item.name === fieldName)
      return field ? field.data.toString() : ''
    }

    // Append other fields to FormData
    formData.append('name', getValue('name'))
    formData.append('is_active', getValue('is_active'))
    formData.append('description', getValue('description'))
    // Handle image file
    const imageField = body.find((item) => item.name === 'image')
    if (imageField) {
      formData.append(
        'image',
        new File([imageField.data], imageField.filename || 'unnamed_file', {
          type: imageField.type,
        })
      )
    }
      

    // Send the FormData to the API
    const data = await $fetch<{ token: string; user: any }>(
      `${config.public.apiBase}/category/create`,
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
