<template>
  <div>
    <AdminHeader />
    <div class="grid gap-4 md:grid-cols-2 md:gap-8 px-10 py-5 lg:grid-cols-4">
      <AdminStatsCard
        :data="{ name: 'Total Products', value: analytics?.totalProducts }"
        :background="'bg-red-200'"
        :text="'text-red-900'"
      />
      <AdminStatsCard
        :data="{ name: 'Total Orders', value: analytics?.totalOrders }"
        :background="'bg-blue-200'"
        :text="'text-blue-900'"
      />
      <AdminStatsCard
        :data="{ name: 'Total Customers', value: analytics?.totalCustomers }"
        :background="'bg-green-200'"
        :text="'text-green-900'"
      />
      <AdminStatsCard
        :data="{ name: 'Total Sales', value: `৳ ${analytics?.totalSales}` }"
        :background="'bg-yellow-200'"
        :text="'text-yellow-900'"
      />
    </div>
    <AdminBarchart class="px-10 py-8" />
  </div>
</template>

<script lang="ts" setup>
const analytics = ref()
const getAnalytics = async () => {
  const response = await $fetch<{
    data: {
      totalProducts: number
      totalOrders: number
      totalSales: number
      totalCustomers: number
    }
    status: string
  }>('/api/back-admin/dashboard/analytics')
  if (response) {
    analytics.value = response.data
  }
}
onMounted(() => {
  getAnalytics()
})
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})
</script>
<style></style>
