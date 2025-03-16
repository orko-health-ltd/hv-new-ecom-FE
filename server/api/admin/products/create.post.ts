export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')
  try {
    // Read multipart form data correctly
    const body = await readMultipartFormData(event)
    if (!body) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid FormData' })
    }

    const formData = new FormData()
    const config = useRuntimeConfig()

    // Find fields in multipart data array and append to FormData
    const getValue = (fieldName: string) => {
      const field = body.find(item => item.name === fieldName)
      return field ? field.data.toString() : ''
    }

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
    formData.append('product_images', getValue('product_images'))
      body
        .filter((item) => item.name === 'product_images')
        .forEach((file) => {
          formData.append(
            'product_images[]',
            new Blob([file.data], { type: file.type }),
            file.filename
          )
        })
    const data = await $fetch<{ token: string; user: any }>(
      `${config.public.apiBase}/product/create`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return data
  } catch (error: unknown) {
    console.error('Error:', error)
    if (typeof error === 'object' && error !== null && 'statusCode' in error && error.statusCode === 403) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Unauthorized',
      })
    }
    throw createError({
      statusCode: 400,
      statusMessage: `Error: ${error instanceof Error ? error.message : String(error)}`,
      data: error,
    })
  }
})