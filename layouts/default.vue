<template>
  <div>
    <!-- <div  class="flex  h-screen z-10 items-center justify-center  bg-background px-4 ">
     <img src="/assets/images/logo/preloader.gif" alt="">
     
    </div>
    <div > -->
    <Navbar />
    <div class="pt-[120px] lg:pt-[90px]">
<slot  />
    </div>
    
    <Footer />
        <UNotifications /></div>
  <!-- </div> -->
</template>

<script lang="ts" setup>
onMounted(() => {
  
  useHead({
    title: 'Halda Valley - Value you',
    meta: [
      {
        name: 'description',
        content: 'Halda Valley is a premium tea company offering the finest quality teas sourced from the pristine Halda Valley region. We are committed to delivering exceptional tea experiences through our carefully curated selection of premium teas.',
      },
    ],
   
  })
 
  
})
</script>



<style>

</style>
