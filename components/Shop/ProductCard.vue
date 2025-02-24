<template>
  <div class="w-full h-auto bg-white rounded-lg shadow-lg p-4">
    <img :src="props.product.img" class="hover:animate-scaleUpDown" alt="">
    <div class="space-y-2 mt-4">
       <nuxt-link :to="'/product/'+props.product.slug" class="text-black">{{ props.product.name }}</nuxt-link>
    <p class="flex items-center text-lime-600"> <UIcon class="text-xl" name="tabler:currency-taka" /> {{ props.product.price }}</p>
     <UButton v-if="!isClicked"
     @click="addProductToCart(props.product)"
    icon="dashicons:cart"
    size="sm"
    color="indigo"
    variant="soft"
    label="Add to cart"
    :class="{'animate-click': isClicked }"
    :trailing="false"
     
  />
        <UButton 
    v-else
    icon="material-symbols:check-circle-outline-rounded"
    size="sm"
    color="green"
    variant="soft"
    label="Added to cart"
    :class="{'animate-click': isClicked }"
    :trailing="false"
     
  />
    </div>
   
  </div>
</template>

<script lang="ts" setup>
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
