export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')
  try {
    const body = await readBody(event)
  
    const id = event.context.params?.id
    
    const config = useRuntimeConfig()

    // Create FormData object
    const formData = new FormData()
   formData.append('name', body.name)
   formData.append('code', body.code)
   formData.append('type', body.type)
   formData.append('value', body.value)
   formData.append('min_order_amount', body.min_order_amount)
   formData.append('max_discount_amount', body.max_discount_amount)
   formData.append('usage', body.usage)
   formData.append('start_date', body.start_date)
   formData.append('expiry_date', body.expiry_date)
   formData.append('is_active', body.is_active)

    const data = await $fetch<{ token: string; user: any }>(
      `${config.public.apiBase}/coupon/update?_id=${id}`,
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
