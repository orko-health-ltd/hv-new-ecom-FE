export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')
console.log(event.context.params?.id)
  const config = useRuntimeConfig()
  try {
    const response = await $fetch<{ data: any; status: number }>(
      `${config.public.apiBase}/order/${event.context.params?.id}`
    )
    
    return { data: response.data, status: 'success' }
  } catch (error: unknown) {
    const statusCode =
      error instanceof Error && 'statusCode' in error
        ? (error as { statusCode: number }).statusCode
        : 500

    throw createError({
      statusCode,
      message: 'Failed to fetch product data' + error,
    })
  }
})