<template>
  
 <div class="z-0 max-w-screen  h-auto pt-[100px] md:h-screen top-0 overflow-hidden">
    <!-- Background Video -->

    <video
      autoplay
      muted
      loop
      playsinline
      class="inset-0 max-w-screen w-screen  h-auto md:h-screen object-cover" 
      src="/assets/videos/halda.mp4"
    ></video>
    

    <!-- Content Overlay -->
    <div class="absolute inset-0   h-1/2 mt-5 md:mt-0 md:h-screen flex flex-col items-center justify-center text-white">
     <section class="flex flex-col items-center justify-center mb-5 py-13 px-4">
    <!-- Title Section -->
    <div class="flex w-full items-center space-x-5 mb-2">
      <div class="w-full border-t-2 border-yellow-600"></div>
      <h2 class="text-lg md:text-[28px] text-nowrap lg:text-[35px]  text-white">Halda Valley</h2>
      <div class="w-full border-t-2 border-yellow-600"></div>
    </div>

    <h2 class="text-xl md:text-3xl lg:text-5xl uppercase tracking-[12px] font-bold text-white mb-2">Value You</h2>

    <!-- Icon Section -->
    <div class="flex w-full items-center space-x-6">
      <div class="w-full border-t-2 border-yellow-600"></div>
      <img 
        src="/assets/icon/Pattern-Icon-02.png"
        alt="Pattern Icon" 
        class="w-10 h-10 object-contain"
      />
      <div class="w-full border-t-2 border-yellow-600"></div>
    </div>
  </section>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>



<style>

</style>
