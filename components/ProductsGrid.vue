<template>
    <div>
 <div class="bg-white mx-5 xl:mx-20 min-h-screen py-5 md:py-20 ">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-5  items-start">
        <div class="w-full flex space-y-4 flex-col justify-start items-start px-2 sm:px-10">
          <h1 class="text-lg sm:text-xl md:text-2xl font-serif">Shop By Product</h1>
          <div class="space-y-1 md:space-y-3">
              <UCheckbox inputClass="w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6 text-yellow-600 border-yellow-600" label="Label" :model-value="false" />
              <UCheckbox inputClass="w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6 text-yellow-600 border-yellow-600" label="Label" :model-value="false" />
              <UCheckbox inputClass="w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6 text-yellow-600 border-yellow-600" label="Label" :model-value="false" />
              <UCheckbox inputClass="w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6 text-yellow-600 border-yellow-600" label="Label" :model-value="false" />
          </div>
         
           
        </div>
        <div class="w-full col-span-3">
           <div class="w-full gap-y-5 grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          <ShopProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
        </div>
       
      </div> 
    </div>
    </div>
</template>

<script setup lang="ts">

import Prod from 'assets/images/Web-image-04.jpg'
interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
}

const products: Product[] = [
  {    id: 1,
    name: 'Product 1',
    price: 210,
    img: Prod
  },
  {
    id: 2,
    price: 310,
    name: 'Product 2',
    img: Prod
  },
  {
    id: 3,
    price: 410,
    name: 'Product 3',
    img: Prod
  },
  {
    id: 4,
    price: 510,
    name: 'Product 4',
    img: Prod
  },
  {
    id: 5,
    price: 610,
    name: 'Product 5',
    img: Prod
  },
  {
    id: 6,
    price: 710,
    name: 'Product 6',
    img: Prod
  },
]
</script>

<style scoped>

</style>