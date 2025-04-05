export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')

  const config = useRuntimeConfig()
  try {
    const orders = await $fetch(`${config.public.apiBase}/order/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return orders
  } catch (error: unknown) {
    const statusCode =
      error instanceof Error && 'statusCode' in error
        ? (error as { statusCode: number }).statusCode
        : 500

    throw createError({
      statusCode,
      message: 'Failed to fetch order data',
    })
  }
})
