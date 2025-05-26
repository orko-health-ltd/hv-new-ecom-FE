import { Card } from './../../../.nuxt/components.d'
import SSLCommerz from 'sslcommerz-lts'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const { order_data } = body
    const config = useRuntimeConfig()
    const store_id = config.public.sslKey
    const store_passwd = config.public.sslPass
    const is_live = true
    const order_id = 'ORD-' + Date.now()
    const data = {
      total_amount: body.amount,
      currency: 'BDT',
      tran_id: order_id,
      success_url: `${config.public.appUrl}/billing?success=true&order_id=${order_id}`,
      fail_url: `${config.public.appUrl}/billing?fail`,
      cancel_url: `${config.public.appUrl}/billing?cancel`,
      ipn_url: `${config.public.apiBase}/ipn?order_id=${order_id}`,
      shipping_method: 'Courier',
      ship_name: body.customer_name,
      ship_add1: body.customer_address,
      ship_add2: body.customer_address,
      ship_city: body.customer_city,
      ship_state: body.customer_state,
      ship_postcode: body.customer_state,
      ship_country: body.customer_country,
      product_name: body.product_name,
      product_category: body.product_category,
      product_profile: body.product_profile,
      cus_name: body.customer_name,
      cus_email: body.customer_email,
      cus_add1: body.customer_address,
      cus_phone: body.customer_phone,
      cus_city: body.customer_city,
      cus_country: body.customer_country,
      cus_state: body.customer_state,
    }

    const sslcz = new SSLCommerz(store_id, store_passwd, is_live)
    const apiResponse = await sslcz.init(data)
    if (apiResponse.status == 'SUCCESS') {
      //Create Temporary Order in your Database
      console.log('order -data',order_data)

      const formData = new FormData()
      formData.append('customerInfo', JSON.stringify(order_data.customerInfo))
      formData.append('paymentMethod', order_data.paymentMethod)
      formData.append('subTotal', order_data.subTotal)
      formData.append('discount', order_data.discount)
      formData.append('order_id', order_id)
      formData.append('shippingcost', order_data.shippingcost)
      formData.append('products', JSON.stringify(order_data.products))
      formData.append('totalAmount', order_data.totalAmount)
      formData.append(
        'shippingAddress',
        JSON.stringify(order_data.shippingAddress)
      )
      formData.append('note', order_data.note)
      formData.append('contactPerson', JSON.stringify(order_data.contactPerson))

      formData.append('ssl_data', JSON.stringify(apiResponse))
      const data = await $fetch<{ token: string; user: any }>(
        `${config.public.apiBase}/order/create`,
        {
          method: 'POST',
          body: formData, // Send as FormData
        }
      )
      console.log('data', data)
      return {
        payment_url: apiResponse.GatewayPageURL,
        // data2: apiResponse,
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
      statusMessage:
        err?.data.failedreason ||
        err?.message ||
        'Failed to initialize SSLCommerz',
      data: err || null,
    })
  }
})
