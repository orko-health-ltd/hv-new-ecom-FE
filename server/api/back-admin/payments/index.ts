export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')

  const config = useRuntimeConfig()
  try {
    const payments = await $fetch(`${config.public.apiBase}/payments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return payments
  } catch (error: unknown) {
    const statusCode =
      error instanceof Error && 'statusCode' in error
        ? (error as { statusCode: number }).statusCode
        : 500

    throw createError({
      statusCode,
      message: 'Failed to fetch payment data',
    })
  }
})
