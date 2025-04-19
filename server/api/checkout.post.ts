export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')
  try {
    const body = await readBody(event)
    const config = useRuntimeConfig()
    const order_id = 'ORD-' + Date.now()
    // Create FormData object properly
    const formData = new FormData()
    for (const [key, value] of Object.entries(body)) {
      formData.append(
        key,
        typeof value === 'string' ? value : JSON.stringify(value)
      )
    }
    formData.append('order_id', order_id)
    const data = await $fetch(`${config.public.apiBase}/order/create`, {
      method: 'POST',
      body: formData, // Use FormData correctly
      headers: {
        // Do NOT set 'Content-Type' manually for FormData
        Authorization: `Bearer ${token}`, // Add Authorization if required
      },
    })

   
    return data
  } catch (error: any) {
    console.error('API Error:', error)

    // Ensure proper error handling
    throw createError({
      statusCode: error?.statusCode || 400,
      statusMessage: error?.message || 'Request failed',
      data: error?.data || null,
    })
  }
})
