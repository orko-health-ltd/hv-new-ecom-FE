export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')

  const config = useRuntimeConfig()
  try {
    const brands = await $fetch(`${config.public.apiBase}/contact-message/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return brands
  } catch (error: unknown) {
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
