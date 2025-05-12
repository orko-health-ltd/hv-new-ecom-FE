export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')

  const config = useRuntimeConfig()
  try {
    const response = await $fetch(
      `${config.public.apiBase}/product/show/${event.context.params?.id}`,
      {
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
