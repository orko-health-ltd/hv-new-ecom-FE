<template>
   <UCarousel
    ref="carouselRef"
    v-slot="{ item }"
    :items="items"
    :ui="{ item: 'basis-full' }"
    class="rounded-lg overflow-hidden"
    indicators
  >
  
  <div class="bg-white px-[16%] gap-10 py-10 grid grid-cols-2 justify-center items-center">
    
     <div class="w-[390px] h-[390px]">
      <img :src="item.img" alt="">
    </div>
    <div class="font-serif  px-14 py-5 flex flex-col justify-center items-center">
      <h1 class="text-4xl text-gray-800 font-serif mb-2">{{ item.name }}</h1>
     <h1 class="text-6xl text-gray-800 font-serif mb-2">{{ item.title }}</h1>
     <p class="text-gray-900 tracking-normal mb-10 font-thin">{{ item.description }}</p>
      <div class="flex items-center space-x-5 mb-2 text-[#b4a345]">
      <div class="w-44 border-t-2 border-[#b4a345]"></div>
      <h5 class="text-[20px] font-thin ">Explore</h5>
      <div class="w-44 border-t-2 border-[#b4a345]"></div>
    </div>
    </div>
   
  </div>
  </UCarousel>
</template>

<script lang="ts" setup>

const items = [
  {
    name:'Dragon Well',
    title: 'Green Tea',
    description: "Our fine Halda Valley Dragon Well Green Tea has a bitter sweet, strong aroma and a deep, long-lasting flavor. A truly satisfying cup of wellness.",
    img:new URL('/assets/images/home/DWGT.jpg', import.meta.url).href
  },
  {
    name:'Dragon Well',
    title: 'Green Tea',
    description: "Our fine Halda Valley Dragon Well Green Tea has a bitter sweet, strong aroma and a deep, long-lasting flavor. A truly satisfying cup of wellness.",
    img:new URL('/assets/images/home/DWGT.jpg', import.meta.url).href
  },
  // {
  //   name:'Dragon Well',
  //   title: 'Green Tea',
  //   description: "Our fine Halda Valley Dragon Well Green Tea has a bitter sweet, strong aroma and a deep, long-lasting flavor. A truly satisfying cup of wellness.",
  //   img:dwgt
  // },
  // {
  //   name:'Dragon Well',
  //   title: 'Green Tea',
  //   description: "Our fine Halda Valley Dragon Well Green Tea has a bitter sweet, strong aroma and a deep, long-lasting flavor. A truly satisfying cup of wellness.",
  //   img:dwgt
  // },
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
