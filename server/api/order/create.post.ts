export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')
  try {
    const body = await readBody(event)
    const config = useRuntimeConfig()

    // Create FormData object
    const formData = new FormData()
    formData.append('customerInfo',JSON.stringify(body.customerInfo))
    formData.append('paymentMethod', body.paymentMethod)
    formData.append('subTotal', body.subTotal)
    formData.append('discount', body.discount)
    formData.append('shippingcost', body.shippingMethod)
    formData.append('products', JSON.stringify(body.products))
    formData.append('totalAmount', body.subtotal)
    formData.append('shippingAddress',JSON.stringify(body.shippingAddress))
    formData.append('note', body.customerInfo.note)
    formData.append('contactPerson',JSON.stringify( body.contactPerson))
    
    formData.append('ssl_data',JSON.stringify(body.ssl_data))
    const data = await $fetch<{ token: string; user: any }>(
      `${config.public.apiBase}/order/create`,
      {
        method: 'POST',
        body: formData, // Send as FormData
       
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
