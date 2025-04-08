export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')
  const {product_id,image_id} = await readBody(event)
  console.log(product_id,image_id)
  const config = useRuntimeConfig()
  try {
    const response = await $fetch(
      `${config.public.apiBase}/product/image/delete/${image_id}/${product_id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return { data: response }
  } catch (error: unknown) {
    const statusCode =
      error instanceof Error && 'statusCode' in error
        ? (error as { statusCode: number }).statusCode
        : 500

    throw createError({
      statusCode,
      message: 'Failed to fetch user data',
    })
  }
})
