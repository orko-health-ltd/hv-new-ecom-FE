<template>
  <div class="w-[230px] h-auto bg-white rounded-lg shadow-lg p-4">
    <img :src="props.product.img" class="hover:animate-scaleUpDown" alt="">
    <div class="space-y-2 mt-4">
       <h1 class="text-black">{{ props.product.name }}</h1>
    <p class="flex items-center text-lime-600"> <UIcon class="text-xl" name="tabler:currency-taka" /> {{ props.product.price }}</p>
     <UButton
     @click="addProductToCart(props.product)"
    icon="dashicons:cart"
    size="sm"
    color="indigo"
    variant="soft"
    label="Add to cart"
    :trailing="false"
  />
    </div>
   
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  }
})
const cart = myCartStore()
const addProductToCart = (product: any) => {
  cart.addProduct(product)
}
</script>



<style>

</style>
