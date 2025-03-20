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
    formData.append('color', getValue('color'))
    formData.append('price', getValue('price'))
    formData.append('discount', getValue('discount'))
    formData.append('is_active', getValue('is_active'))
    formData.append('is_featured', getValue('is_featured'))
    formData.append('is_combo', getValue('is_combo'))
    formData.append('brand_id', getValue('brand_id'))
    formData.append('sku_id', getValue('sku_id'))
    formData.append('category_id', getValue('category_id'))
    formData.append('specification', getValue('specification'))

    // // Append image files to FormData as an array
    // const imageFiles = body.filter((item) => item.name === 'product_images')

    // imageFiles.forEach((file) => {
    //   // Append each file with the correct name for multiple files
    //   formData.append(
    //     'product_images[]',
    //     new Blob([file.data], { type: file.type }),
    //     file.filename
    //   )
    // })

    // Append image files to FormData as an array
       body
         .filter((item) => item.name && item.name.startsWith('product_images'))         .forEach((file) => {
           // Append the file directly instead of Blob
           formData.append(
             'product_images',
             new File([file.data], file.filename || 'unnamed_file', { type: file.type })
           )
         })    // Log the FormData to check the files
    console.log('FormData:', formData)

    // Send the FormData to the API
    const data = await $fetch<{ token: string; user: any }>(
      `${config.public.apiBase}/product/create`,
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
