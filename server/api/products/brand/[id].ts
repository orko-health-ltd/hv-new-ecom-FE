export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')

  const config = useRuntimeConfig()
  try {
    const response = await $fetch(
      `${config.public.apiBase}/product/listByBrand/${event.context.params?.id}`
    )
    
    return { data: response }
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
