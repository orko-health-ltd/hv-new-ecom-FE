import { FormData, File } from 'formdata-node'
export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')
  try {
    const body = await readMultipartFormData(event)
       if (!body) {
         throw createError({
           statusCode: 400,
           statusMessage: 'Invalid FormData',
         })
       }
     const getValue = (fieldName: string) => {
       const field = body.find((item) => item.name === fieldName)
       return field ? field.data.toString() : ''
     }
    const id = event.context.params?.id
    
    const config = useRuntimeConfig()

    // Create FormData object
    const formData = new FormData()
    formData.append('title', getValue('title'))
    formData.append('color', getValue('color'))
    formData.append('links', getValue('links'))
    formData.append('is_popup', getValue('is_popup'))
    formData.append('description', getValue('description'))
   
    const imageField = body.find((item) => item.name === 'image')
    if (imageField) {
      formData.append(
        'image',
        new File([imageField.data], imageField.filename || 'unnamed_file', {
          type: imageField.type,
        })
      )
    }
    // formData.append('is_active', is_active)

    const data = await $fetch<{ token: string; user: any }>(
      `${config.public.apiBase}/banner/update?_id=${id}`,
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
    console.log(error)
    throw createError({
      statusCode: 400,
      statusMessage: 'Error' + error,
      data: error,
    })
  }
})
