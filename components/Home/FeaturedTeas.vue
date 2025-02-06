<template>
   <UCarousel
    ref="carouselRef"
    v-slot="{ item }"
    :items="items"
    :ui="{ item: 'basis-full w-screen flex-col w-full' }"
    class="rounded-lg overflow-hidden w-full"
    indicators
  >
  
  <div class="bg-white w-full px-5  md:px-[16%] gap-2 md:gap-10 py-10 grid grid-cols-2 justify-center items-center">
    
     <div class="container">
      <img :src="item.img" alt="">
    </div>
    <div class="font-serif px-2 lg:px-14 py-5 flex flex-col justify-center items-center">
      <h1 class="text-lg md:text-4xl text-gray-800 font-serif mb-0 sm:mb-2">{{ item.name }}</h1>
     <h1 class="text-2xl md:text-6xl text-gray-800 font-serif mb-0 sm:mb-2">{{ item.title }}</h1>
     <p class="text-gray-900 text-xs tracking-normal mb-5 sm:mb-10 font-thin">{{ item.description }}</p>
      <div class="flex w-full items-center space-x-2 md:space-x-5 mb-2 text-[#b4a345]">
      <div class="w-full border-t-2 border-[#b4a345]"></div>
      <h5 class="text-sm md:text-[20px] font-thin ">Explore</h5>
      <div class="w-full border-t-2 border-[#b4a345]"></div>
    </div>
    </div>
   
  </div>
  </UCarousel>
</template>

<script lang="ts" setup>
import DWGT from 'assets/images/home/DWGT.jpg'
import SNWT from 'assets/images/SNWT.jpg'
import GEBT from 'assets/images/GEBT.jpg'
const items = [
  {
    name:'Dragon Well',
    title: 'Green Tea',
    description: "Our fine Halda Valley Dragon Well Green Tea has a bitter sweet, strong aroma and a deep, long-lasting flavor. A truly satisfying cup of wellness.",
    img:DWGT
  },
  {
    name:'Silver Needle',
    title: 'White Tea',
    description: "The lingering fragrance of our Halda Valley Silver Needle White Tea is Delicately honeysuckle floral, with a warmed sugar sweetness and soft mouthfeel and uplifting finish.",
    img:SNWT
  },
  // {
  //   name:'Dragon Well',
  //   title: 'Green Tea',
  //   description: "Our fine Halda Valley Dragon Well Green Tea has a bitter sweet, strong aroma and a deep, long-lasting flavor. A truly satisfying cup of wellness.",
  //   img:dwgt
  // },
 {
    name:'Golden Eyebrow',
    title: 'Black Tea',
    description: "Halda Valley Golden Eyebrow Black Tea is made of delicate handpicked leaves that offers Strong honey and floral fragrance with distinctly honey-sweet & mellow taste.",
    img:GEBT
  },
]
const carouselRef = ref()

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 3000)
})
</script>



<style>

</style>
