<template>
 
        <Card :class="[background, text]">
          
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              $45,231.89
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
  }
})

</script>

<style>

</style>