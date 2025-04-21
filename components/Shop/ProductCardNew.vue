<template>
  <div class="w-full h-auto bg-white rounded   p-4">
   <div class="flex py-2 justify-end items-center w-full">
    <div class="relative group">
     <UIcon name="material-symbols:favorite-outline" class="text-lg transition-opacity duration-300 group-hover:opacity-0" />
      <UIcon name="material-symbols:favorite" class="text-lg absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
   
   </div>
 
       <nuxt-link :to="'/product/'+props.product.slug" class="relative group">
        <NuxtImg
              :src="`/halda/${props.product.front_image}`"
              :alt="props.product.name"class="transition-opacity duration-300 group-hover:opacity-0" />
       <NuxtImg
              :src="`/halda/${props.product.front_image}`"
              :alt="props.product.name"class="absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"  />
       </nuxt-link>  
      
      <div class="flex flex-col space-y-2 mt-4">
       <nuxt-link :to="'/product/'+props.product.slug" class="w-full font-semibold text-black">{{ props.product.name }}
         <p>
        <div class="text-gray-500 flex items-center text-xs"><UIcon name="fluent:leaf-two-16-regular" class="text-lg"/> {{ props.product.category }}</div>
       </p>
       </nuxt-link>
      
    
     <div v-if="props.product.stock == 0" class="flex border border-gray-500 rounded-md px-2 py-2 items-center text-center justify-between gap-2 w-full ">
        <h1 class="w-full text-gray-400 font-semibold">Out of stock</h1>
      <!-- <UIcon name="material-symbols:shopping-bag" />
      <p @click="addProductToCart(props.product)"  class="right-1/3 font-semibold text-sm items-center flex relative" >
        <UIcon class="text-xl" name="tabler:currency-taka" /> {{props.product.price}} Taka</p> -->
     </div>
     <div v-else-if="!isClicked" class="flex border border-gray-500 rounded-md px-2 py-2 items-center justify-between gap-2 w-full ">
      
      <UIcon name="material-symbols:shopping-bag" />
      <p @click="addProductToCart(props.product)"  class="right-1/3 font-semibold text-sm items-center flex relative" >
        <UIcon class="text-xl" name="tabler:currency-taka" /> {{props.product.price}} Taka</p>
     </div>
     <!-- <UButton v-if="!isClicked"
     @click="addProductToCart(props.product)"
    icon="material-symbols:shopping-bag"
    size="sm"
    color="indigo"
    variant="soft"
    :label="props.product.price"
    :class="{'animate-click': isClicked }"
    :trailing="false"
     
  />-->
        <UButton 
    v-else
    icon="material-symbols:check-circle-outline-rounded"
    size="sm"
    color="blue"
    variant="soft"
    label="Added to cart"
    :class="{'animate-click': isClicked }"
    :trailing="false"
     
  /> 
    </div>
   
  </div>
</template>

<script lang="ts" setup>

  const config = useRuntimeConfig()
const toast = useToast()
const isClicked = ref(false);
const props = defineProps({
  product: {
    type: Object,
    required: true,
  }
})

const cart = useMyCartStore()
const addProductToCart = (product: any) => {
   isClicked.value = true;
  setTimeout(() => (isClicked.value = false), 1500);
  toast.add({ title: 'Product added to cart', color: 'green',timeout: 1500 })
  cart.addToCart(product)
}
useHead({
  title: props.product.name,
  meta: [
    { name: 'description', content: props.product.description },
    { property: 'og:title', content: props.product.name },
    { property: 'og:description', content: props.product.description },
    { property: 'og:image', content: config.public.apiBase+'/'+props.product.front_image },
    { name: 'twitter:card', content: config.public.apiBase+'/'+props.product.front_image }
  ]
})
</script>



<style>
@keyframes clickEffect {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
.animate-click {
  animation: clickEffect 0.3s ease-in-out;
}
</style>
