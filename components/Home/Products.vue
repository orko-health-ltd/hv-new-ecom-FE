<template>
  <div class="flex flex-col items-center justify-center px-24 py-14">
      <div class="flex items-center space-x-5 mb-2 text-[#b4a345]">
      <div class="w-44 border-t-2 border-[#b4a345]"></div>
      <h5 class="text-[20px] font-thin ">Explore</h5>
      <div class="w-44 border-t-2 border-[#b4a345]"></div>
    </div>
     <h2 class="text-dark font-quattrocento text-[34px]  tracking-[20px] font-serif uppercase">
Products
</h2>
<div class="grid grid-cols-4 gap-2">
<div v-for="product in products" :key="product.id">
  <img :src="product.img" alt="">
   <div class="flex flex-col justify-center items-center  my-5 ">
     <h2 class="text-dark  text-lg font-sans font-[500]">
{{ product.name }}
</h2>
<div class="flex w-2/3 justify-between items-center mt-5 gap-5">
   <div class="w-full border-t-2 border-[#b4a345]"></div>
      <h5 class="text-[12px] text-[#b4a345]">Explore</h5>
      <div class="w-full border-t-2 border-[#b4a345]"></div>
</div>
     
    </div>
</div>
</div>
  </div>
</template>

<script lang="ts" setup>
const products = [
  {
    id:1,
    name: 'The Grandeur Collection',
    img :new URL('/assets/images/home/Grandeur_WT.jpg', import.meta.url).href
  },
  {
    id:2,
    name: 'The Prestige Collection',
    img :new URL('/assets/images/home/PG_00755.jpg', import.meta.url).href
  },
  {
    id:3,
    name: 'The Glamour Collection',
    img :new URL('/assets/images/home/The-Glamour-Collection.jpg', import.meta.url).href
  },
  {
    id:4,
    name: 'The Inspiration Collection',
    img :new URL('/assets/images/home/The-Inspiration-Collection-Open.jpg', import.meta.url).href
  }
]
</script>



<style>

</style>
