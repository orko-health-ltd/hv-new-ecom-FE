<template>
  <div>
    <AdminHeader />
      <div class="grid gap-4 md:grid-cols-2 md:gap-8 px-10 py-5 lg:grid-cols-4">
        <AdminStatsCard :background="'bg-red-200'" :text="'text-red-900'" />
        <AdminStatsCard :background="'bg-blue-200'" :text="'text-blue-900'" />
        <AdminStatsCard :background="'bg-green-200'" :text="'text-green-900'" />
        <AdminStatsCard :background="'bg-yellow-200'" :text="'text-yellow-900'" />
        </div>
        <AdminBarchart class="px-10 py-8" />
  </div>
</template>

<script lang="ts" setup>

definePageMeta({
  layout: 'admin',
  // middleware: ['auth']
})
</script>
<style>

</style>