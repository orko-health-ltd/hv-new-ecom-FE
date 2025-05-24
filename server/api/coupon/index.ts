export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')
  const body = await readBody(event)
  const config = useRuntimeConfig()
  try {
    const brands = await $fetch(`${config.public.apiBase}/coupon/get/${body.coupon}`, {
   method: 'POST',
    })

    return brands
  } catch (error: unknown) {
    console.log(error)
    const statusCode =
      error instanceof Error && 'statusCode' in error
        ? (error as { statusCode: number }).statusCode
        : 500

    throw createError({
      statusCode,
      message: 'Failed to fetch message data',
    })
  }
})
