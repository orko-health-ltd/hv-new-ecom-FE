<template>
  <div class="flex flex-col items-center justify-center px-10 md:px-24 py-7 md:py-14">
      <div class="flex w-1/3 items-center space-x-5 mb-2 text-[#b4a345]">
      <div class="w-1/2 border-t-2 border-[#b4a345]"></div>
      <h2 class="text-[20px] font-thin ">Featured</h2>
      <div class="w-1/2 border-t-2 border-[#b4a345]"></div>
    </div>
     <h2 class="text-dark font-quattrocento py-4 text-xl sm:text-[34px]  tracking-[20px] font-serif uppercase">
Products
</h2>
<div v-if="products.length > 0" class="grid grid-cols-1 md:grid-cols-4 gap-2">
<div v-for="product in products.slice(0,4)" :key="product._id">
  
  <NuxtImg  format="webp" width="300" height="200"
              :src="`/halda/${product.front_image}`"
              :alt="product.name" />
   <div class="flex flex-col justify-center items-center  my-5 ">
     <h2 class="text-dark  text-lg font-sans font-[500]">
{{ product?.brand_id?.name }}
</h2>
<div class="flex w-2/3 justify-between items-center mt-5 gap-5">
   <div class="w-full border-t-2 border-[#b4a345]"></div>
      <nuxt-link :to="`/product/${product.slug}`" class="text-[12px] text-[#b4a345]">Explore</nuxt-link>
      <div class="w-full border-t-2 border-[#b4a345]"></div>
</div>
     
    </div>
</div>
</div>
  </div>
</template>

<script lang="ts" setup>
import Grandeur_WT from 'assets/images/home/Grandeur_WT.jpg'
import PG_00755 from 'assets/images/home/PG_00755.jpg'
import TheGlamourCollection from 'assets/images/home/The-Glamour-Collection.jpg'
// import TheInspirationCollection from 'assets/images/home/The-Inspiration-Collection-Open.jpg'
interface Product {
  _id: string
  name: string
  slug: string
  brand_id: {
    name: string
  }
  front_image: string
}
const products = ref<Product[]>([])
const getProducts = async () => {
  const { data } = await $fetch<{ data: Product[] }>('/api/products/giftbox')
 
  products.value = data
}
onMounted(() => {
  getProducts()
})
</script>



<style>

</style>
