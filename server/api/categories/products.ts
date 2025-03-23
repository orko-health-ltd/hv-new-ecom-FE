export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')

  const config = useRuntimeConfig()
  try {
    const query = getQuery(event)
    const products = await $fetch(`${config.public.apiBase}/category/products`, {
      query: {
        slug: event.context.params?.slug,
        ...query
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return products
  } catch (error: unknown) {
    const statusCode =
      error instanceof Error && 'statusCode' in error
        ? (error as { statusCode: number }).statusCode
        : 500

    throw createError({
      statusCode,
      message: 'Failed to fetch products data',
    })
  }
})
