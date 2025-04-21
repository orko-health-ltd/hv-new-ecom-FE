<template>
 
        <Card :class="[background, text]">
          
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
             {{ data.name }}
            </CardTitle>
            <DollarSign class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
             {{ data.value }}
            </div>
            <p class="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
</template>

<script lang="ts" setup>
import { DollarSign } from 'lucide-vue-next';
defineProps({
  background: {
    type: String,
    default: 'bg-gray-200'
  },
  text: {
    type: String,
    default: 'text-gray-900'
  },
  data: {
    type: Object,
    default: () => ({
      name: 'Total Revenue',
      value: '0'
    })
  }
})

</script>

<style>

</style>