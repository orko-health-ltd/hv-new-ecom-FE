<template>
  <div>
     <img
                          alt="Product image"
                          class="aspect-square rounded-md object-cover"
                          height="64"
                          :src="imageUrl"
                          width="64"
                        />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['image'])
console.log(props.image)
const config = useRuntimeConfig()
const imageUrl = config.public.apiBase+'/'+props.image
</script>

<style>

</style>