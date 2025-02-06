<template>
  <div>
        <div class="overflow-hidden">
      <div class="h-[500px] flex justify-center items-center w-full bg-[url('/assets/images/home/bg-discover.jpg')] bg-cover bg-fixed top-0  overflow-x-hidden animate-breath">
        <div class="bg-[#00000070] w-full h-full flex items-center justify-center">
 <h1 class="text-4xl font-serif tracking-wider  text-white">{{ (route?.params.slug).replaceAll('_', ' ') }}</h1>
     
        </div>
           
      </div>
   </div>
 <products-grid />
  </div>
</template>

<script lang="ts" setup>

const route = useRoute()


</script>



<style>

</style>
