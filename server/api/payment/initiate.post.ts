import SSLCommerz from 'sslcommerz-lts'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const config = useRuntimeConfig()
    const store_id = config.public.sslKey  
    const store_passwd = config.public.sslPass 
    const is_live = false

    const data = {
      total_amount: body.amount,
      currency: 'BDT',
      tran_id: 'TXN_' + Date.now(),
      success_url: `${config.public.appUrl}/success`,
      fail_url: `${config.public.appUrl}/fail`,
      cancel_url: `${config.public.appUrl}/cancel`,
      ipn_url: `${config.public.apiBase}/ipn`,
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
    return {
      data: apiResponse.GatewayPageURL,
      // data: "https://epay-gw.sslcommerz.com/2faf41d25c9f51fed49d38a8e713ff001cd97c0b",
      logo: apiResponse.storeLogo,
      status: 'success',
    }
    return apiResponse // must return raw JSON!
  } catch (err) {
    console.error('Error in Easy Checkout:', err)
    return {
      status: 'fail',
      message: 'Failed to initialize SSLCommerz',
    }
  }
})
