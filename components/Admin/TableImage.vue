<template>
  <div>
   
     <NuxtImg
                          alt="Product image"
                          class="aspect-square rounded-md object-cover"
                          height="64"
                          :src="'/halda/'+props.image"
                          width="64"
                        />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['image'])

const config = useRuntimeConfig()

</script>

<style>

</style>