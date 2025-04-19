<template>
   <div class="w-full overflow-hidden h-auto md:h-[90vh] flex items-center justify-center">
     <UCarousel v-slot="{ item }" :items="items" :ui="{ item: 'basis-full' }" class=" overflow-hidden  " arrows>
    <img :src="item" class="w-full overflow-hidden" draggable="false" >
  </UCarousel>
   </div>
</template>

<script lang="ts" setup>
import slide1 from 'assets/images/slides/Slide-1-scaled.jpg'
import slide2 from 'assets/images/slides/Slide-2-scaled.jpg'
import slide3 from 'assets/images/slides/Slide-3-scaled.jpg'
const items = [
  slide1,slide2,slide3
]
</script>



<style>

</style>
