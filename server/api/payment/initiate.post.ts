import SSLCommerz from 'sslcommerz-lts'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const {order_data} = body
    const config = useRuntimeConfig()
    const store_id = config.public.sslKey  
    const store_passwd = config.public.sslPass 
    const is_live = false
    const order_id = 'TXN_' + Date.now()
    const data = {
      total_amount: body.amount,
      currency: 'BDT',
      tran_id: order_id,
      success_url: `${config.public.appUrl}/success`,
      fail_url: `${config.public.appUrl}/fail`,
      cancel_url: `${config.public.appUrl}/cancel`,
      ipn_url: `${config.public.apiBase}/ipn?order_id=${order_id}`,
      shipping_method: body.shipping_method,
      product_name: body.product_name,
      product_category: body.product_category,
      product_profile: body.product_profile,
      cus_name: body.customer_name ,
      cus_email: body.customer_email ,
      cus_add1: body.customer_address ,
      cus_phone: body.customer_phone,
    }

    const sslcz = new SSLCommerz(store_id, store_passwd, is_live)
    const apiResponse = await sslcz.init(data)
    if (apiResponse.success) {
      //Create Temporary Order in your Database
       const formData = new FormData()
       formData.append('customerInfo', JSON.stringify(order_data.customerInfo))
       formData.append('paymentMethod', order_data.paymentMethod)
       formData.append('subTotal', order_data.subTotal)
       formData.append('order_id', order_id)
       formData.append('shippingcost', order_data.shippingMethod)
       formData.append('products', JSON.stringify(order_data.products))
       formData.append('totalAmount', order_data.subtotal)
       formData.append(
         'shippingAddress',
         JSON.stringify(order_data.shippingAddress)
       )
       formData.append('note', order_data.customerInfo.note)
       formData.append(
         'contactPerson',
         JSON.stringify(order_data.contactPerson)
       )

       formData.append('ssl_data', JSON.stringify(order_data.ssl_data))
       const data = await $fetch<{ token: string; user: any }>(
         `${config.public.apiBase}/order/create`,
         {
           method: 'POST',
           body: formData, // Send as FormData
         }
       )


      return {
        data: apiResponse.GatewayPageURL,
        data2: apiResponse,
        logo: apiResponse.storeLogo,
        status: 'success',
      }
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: apiResponse?.data?.failedreason || 'Request failed',
        data: apiResponse || null,
      })
    }
   
  } catch (err: any) {
    console.error('Error in Easy Checkout:', err)
    throw createError({
      statusCode: 500,
      statusMessage: err?.data.failedreason || err?.message || 'Failed to initialize SSLCommerz',
      data: err || null
    })
  }
})
