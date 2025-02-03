<template>
  <div>
     <div class="w-full space-y-10 ">
      <h2 class="text-3xl text-center font-serif">Featured PRODUCTS</h2>
           <div class="w-full gap-3 grid  grid-cols-4">
          <ShopProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
        </div>
  </div>
</template>

<script lang="ts" setup>

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
 
]
</script>



<style>

</style>
