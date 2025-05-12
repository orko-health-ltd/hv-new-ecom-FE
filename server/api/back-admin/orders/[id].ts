export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')

  const config = useRuntimeConfig()
  try {
    const response = await $fetch<{ data: any; status: number }>(
      `${config.public.apiBase}/order/show/${event.context.params?.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log(response)
    return { data: response.data, status: 'success' }
  } catch (error: unknown) {
    const statusCode =
      error instanceof Error && 'statusCode' in error
        ? (error as { statusCode: number }).statusCode
        : 500

    throw createError({
      statusCode,
      message: 'Failed to fetch order data' + error,
    })
  }
})