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
    formData.append('product_id', getValue('product_id'))
    
       body
         .filter((item) => item.name && item.name.startsWith('product_images')).forEach((file) => {
           console.log('file', file)
           // Append the file directly instead of Blob
           formData.append(
             'product_images',
             new File([file.data], file.filename || 'unnamed_file', { type: file.type })
           )
         })    // Log the FormData to check the files
        
    // Send the FormData to the API
    const data = await $fetch<{ token: string; user: any }>(
      `${config.public.apiBase}/product/image/add`,
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
