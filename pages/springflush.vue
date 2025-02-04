<template>
  <div>
    <UCarousel
      ref="carouselRef"
      v-slot="{ item }"
      :items="items"
      :ui="{ item: 'basis-full transition-opacity duration-500 ease-in-out' }"
      class="rounded-lg overflow-hidden"
      indicators
    >
      <img :src="item.img" alt="" class="w-full">
    </UCarousel>
    <div class="flex items-center text-gray-500 font-serif justify-center px-[10%] gap-20 py-10">
      <p class="font-extrathin text-sm">
        In this magnificent Spring, when nature resumes her loveliness with snug warmth and dazzling blossom, the human mind is filled with energy and hope. This blessed season allows lush camellias of Halda valley to flourish with all her treasures to offer the most exquisite, rare and amusing teas of the year- the ‘Spring flush”.
      </p>
       <p class="font-extrathin text-sm">
        To celebrate this new tea bounty after the dormant winter, this year Halda valley is honored to present the Spring flush (special edition) with three gems in her crown- Emerald Hill Oolong tea, Rhoda Revere Herbal Tea and Orthodox Black Tea packaged in three exciting boxes in different combinations. The exquisite collection of teas made out of young delicate, tender sprouts of spring with their astringent flavor and imperial fragrance are here to indulge you with the best tea experience of the year.
      </p>
    </div>
    <CommonSlide />
    <div class="grid grid-cols-2 px-[10%] py-10 gap-10 font-thin font-serif ">
      <div class="flex flex-col space-y-10 items-center justify-center">
       
            <div class="flex w-[350px] items-center space-x-5  text-[#b4a345]">
      <div class="w-full border-t-2 border-[#b4a345]"></div>
      <h2 class=" text-lg text-nowrap">Spring Flush</h2>
      <div class="w-full border-t-2 border-[#b4a345]"></div>
      
    </div>
    <h1 class="text-4xl ">Lucent</h1>
        <p class="font-extralight">The box with 3 jars containing Rhoda revere herbal tea, Emerald Hill Oolong tea and Orthodox black tea. With the new leaves of spring these teas are of the best quality in terms of flavor, liquor and tasting notes. The box also contains a uniquely designed tea pot to be kept as a souvenir.</p>
 <div class="flex w-[350px] items-center space-x-5  text-[#b4a345]">
      <div class="w-full border-t-2 border-[#b4a345]"></div>
      <h2 class=" text-lg text-nowrap">Explore</h2>
      <div class="w-full border-t-2 border-[#b4a345]"></div>
      
    </div>
      </div>
      <img src="/assets/images/Lucent-Collection.jpg" alt="">
      <img src="/assets/images/Scarlet-front-1.jpg" alt="">
      <div class="flex flex-col space-y-10 items-center justify-center">
       
            <div class="flex w-[350px] items-center space-x-5  text-[#b4a345]">
      <div class="w-full border-t-2 border-[#b4a345]"></div>
      <h2 class=" text-lg text-nowrap">Spring Flush</h2>
      <div class="w-full border-t-2 border-[#b4a345]"></div>
      
    </div>
    <h1 class="text-4xl ">Scarlet</h1>
        <p class="font-extralight">The box with 2 jars containing Rhoda revere herbal tea and Orthodox black tea. With the new leaves of spring these teas are of the best quality in terms of flavor, liquor and tasting notes. The box also contains two uniquely designed thermal cups to be kept as a souvenir.</p>
 <div class="flex w-[350px] items-center space-x-5  text-[#b4a345]">
      <div class="w-full border-t-2 border-[#b4a345]"></div>
      <h2 class=" text-lg text-nowrap">Explore</h2>
      <div class="w-full border-t-2 border-[#b4a345]"></div>
      
    </div>
      </div>
       <div class="flex flex-col space-y-10 items-center justify-center">
       
            <div class="flex w-[350px] items-center space-x-5  text-[#b4a345]">
      <div class="w-full border-t-2 border-[#b4a345]"></div>
      <h2 class=" text-lg text-nowrap">Spring Flush</h2>
      <div class="w-full border-t-2 border-[#b4a345]"></div>
      
    </div>
    <h1 class="text-4xl ">Twilight</h1>
        <p class="font-extralight">The box with 2 jars containing Emerald Hill Oolong tea and Orthodox black tea. With the new leaves of spring these teas are of the best quality in terms of flavor, liquor and tasting notes. The box also contains two uniquely designed thermal cups to be kept as a souvenir.</p>
 <div class="flex w-[350px] items-center space-x-5  text-[#b4a345]">
      <div class="w-full border-t-2 border-[#b4a345]"></div>
      <h2 class=" text-lg text-nowrap">Explore</h2>
      <div class="w-full border-t-2 border-[#b4a345]"></div>
      
    </div>
      </div>
      <img src="/assets/images/Twilight-front.jpg" alt="">
    </div>
  </div>
</template>

<script lang="ts" setup>
import scarlet from 'assets/images/scarlet.png'
import twilight from 'assets/images/twilight.png'
import lucent from 'assets/images/lucent.png'

const items = [
  { name: 'scarlet', img: scarlet },
  { name: 'twilight', img: twilight },
  { name: 'lucent', img: lucent }
]
</script>
