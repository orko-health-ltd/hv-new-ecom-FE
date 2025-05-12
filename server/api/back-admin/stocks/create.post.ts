export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')
  try {
    const body = await readBody(event)
   

    const config = useRuntimeConfig()

    // Create FormData object
    const formData = new FormData()
    formData.append('product_id', body.product_id)
    formData.append('quantity', body.quantity)
    formData.append('type', body.type)
    formData.append('reason', body.reason)  
    formData.append('date', body.date)


    const data = await $fetch<{ token: string; user: any }>(
      `${config.public.apiBase}/stock/create`,
      {
        method: 'POST',
        body: formData, // Send as FormData
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log('from here',data)
    return data
  } catch (error) {
    console.log(error)
    throw createError({
      statusCode: 400,
      statusMessage: 'Error'+ error,
      data: error,
    })
  }
})
