export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')
  try {
    const body = await readBody(event)
   

    const config = useRuntimeConfig()

    // Create FormData object
      // name: <string>'',
      // code: <string>'',
      // type: <string>'',
      // value: <number>0,
      // min_order_amount: <number>0,
      // max_discount_amount: <number>0,
      // usage: <number>0,
      // start_date: '',
      // expiry_date: '',
      // is_active: <boolean>true
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
    

    const data = await $fetch<{ success: boolean; status: string; errors: any; message: string }>(
      `${config.public.apiBase}/coupon/create`,
      {
        method: 'POST',
        body: formData, // Send as FormData
          headers: {
        Authorization: `Bearer ${token}`,
      },
      },
    
    )
    console.log(data)
    if(data.status == 'success'){
      return data
    }
    else{
      return createError({
        statusCode: 400,
        statusMessage: data.message,
        data: data.errors,
      })
    }
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
