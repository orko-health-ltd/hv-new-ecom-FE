<template>
  <div class="flex flex-col items-center justify-center px-10 md:px-24 py-7 md:py-14">
      <div class="flex w-full items-center space-x-5 mb-2 text-[#b4a345]">
      <div class="w-full border-t-2 border-[#b4a345]"></div>
      <h2 class="text-[20px] font-thin ">Explore</h2>
      <div class="w-full border-t-2 border-[#b4a345]"></div>
    </div>
     <h2 class="text-dark font-quattrocento text-[34px]  tracking-[20px] font-serif uppercase">
Products
</h2>
<div class="grid grid-cols-1 md:grid-cols-4 gap-2">
<div v-for="product in products" :key="product.id">
  <img :src="product.img" alt="">
   <div class="flex flex-col justify-center items-center  my-5 ">
     <h2 class="text-dark  text-lg font-sans font-[500]">
{{ product.name }}
</h2>
<div class="flex w-2/3 justify-between items-center mt-5 gap-5">
   <div class="w-full border-t-2 border-[#b4a345]"></div>
      <nuxt-link :to="`product/${product.slug}`" class="text-[12px] text-[#b4a345]">Exploreol</nuxt-link>
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
import TheInspirationCollection from 'assets/images/home/The-Inspiration-Collection-Open.jpg'

const products = [
  {
    id:1,
    name: 'The Grandeur Collection',
    slug:'grandeur',
    img :Grandeur_WT
  },
  {
    id:2,
    name: 'The Prestige Collection',
    slug:'prestige',
    img :PG_00755
  },
  {
    id:3,
    name: 'The Glamour Collection',
    slug:'glamour',
    img :TheGlamourCollection
  },
  {
    id:4,
    name: 'The Inspiration Collection',
    slug:'inspiration',
    img :TheInspirationCollection
  }
]
</script>



<style>

</style>
