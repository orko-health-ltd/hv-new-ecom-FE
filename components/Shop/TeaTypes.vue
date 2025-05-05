<template>
  <div class="py-5 space-y-3">
    <div class="flex flex-col items-center justify-center mt-10 gap-2"> 
       <h1 class="text-2xl font-semibold">Tea types</h1>
    <h5 class="w-full md:w-1/3 text-center">
      With over 100 teas available, we’ve got your beloved favourites as well
as unexpected flavours so there’s something for every taste
    </h5>
    </div>
    <UCarousel class=" block md:hidden max-h-[350px]" 
    v-slot="{ item }"
   
    loop
    dots
    arrows
    auto-scroll
    :items="categories??[]"
    :ui="{ item: 'basis-1/5' }"
  >
   <nuxt-link :to="`/shop/${item.slug}`" :state="{description:item.description}" class="flex flex-col hover:scale-105 transition-transform mx-2 items-top justify-center gap-2">
     <div class="z-10 p-2 relative ">
     <NuxtImg  format="webp" v-if="item.image" :placeholder="fallbackImage"  :src="`/halda/${item.image}`"  :alt="item.name" class="rounded-lg w-auto h-auto" />
     <img v-else src="https://cdn.intelligencebank.com/au/share/NOrD/2lPAP/dMgDY/size=408&quality=70&compresstype=WebP&ext=png/image-hero-banner" width="234" height="234" class="rounded-lg">
    
  </div>
    <div class="relative top-[-120px] hover:shadow-lg  w-[200px] h-[270px] bg-white">
    <div class="flex flex-col items-center justify-center gap-2 p-5">
      <div class=" h-[80px]">

      </div>
      <h1 class="font-semibold text-center text-sm sm:text-base">{{ item.name }}</h1>
      <p class="text-xs sm:text-sm text-center">{{ item.description }}</p>
    </div>
    </div>
  </nuxt-link>
  </UCarousel>
  <div class="hidden md:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
  <nuxt-link v-for="item in categories" :to="`/shop/${item.slug}`" :state="{description:item.description}" class="flex flex-col hover:scale-105 transition-transform items-top justify-center gap-2">
     <div class="z-10 relative ">
     <NuxtImg  format="webp" v-if="item.image" :placeholder="fallbackImage"  :src="`/halda/${item.image}`" width="234" height="234" :alt="item.name" class="rounded-lg" />
     <img v-else src="https://cdn.intelligencebank.com/au/share/NOrD/2lPAP/dMgDY/size=408&quality=70&compresstype=WebP&ext=png/image-hero-banner" width="234" height="234" class="rounded-lg">
    
  </div>
    <div class="relative top-[-120px] hover:shadow-lg  w-[230px] h-[300px] bg-white">
    <div class="flex flex-col items-center justify-center gap-2 p-5">
      <div class=" h-[80px]">

      </div>
      <h1 class="font-semibold">{{ item.name }}</h1>
      <p class="text-sm text-center">{{ item.description }}</p>
    </div>
    </div>
  </nuxt-link>
 </div>
  </div>
</template>

<script lang="ts" setup>
import IMG from '@/assets/images/no-image.jpg'
const fallbackImage = IMG
interface Category {
  id: number
  name: string
  image: string
  description: string
  slug: string
}

const { data: categories } = await useAsyncData('categories', () =>
  $fetch<{ data: Category[] }>('/api/categories').then(res => res.data)
)

</script>

<style>

</style>