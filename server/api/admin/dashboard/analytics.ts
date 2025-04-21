export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')
  console.log('token', token)
  const config = useRuntimeConfig()
  try {
    const users = await $fetch(
      `${config.public.apiBase}/dashboard/analytics`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return users
  } catch (error: unknown) {
    const statusCode =
      error instanceof Error && 'statusCode' in error
        ? (error as { statusCode: number }).statusCode
        : 500

    throw createError({
      statusCode,
      message: 'Failed to fetch analytics data',
    })
  }
})
