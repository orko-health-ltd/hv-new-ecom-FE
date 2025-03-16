<template>
  <div>
    <!-- <div  class="flex  h-screen z-10 items-center justify-center  bg-background px-4 ">
     <img src="/assets/images/logo/preloader.gif" alt="">
     
    </div>
    <div > -->
    <Navbar />
    <div class="pt-[100px]">
<slot  />
    </div>
    
    <Footer />
        <UNotifications /></div>
  <!-- </div> -->
</template>

<script lang="ts" setup>
onMounted(() => {
  
  useHead({
    title: 'Home',
    meta: [
      {
        name: 'description',
        content: 'Home page',
      },
    ],
   
  })
 
  
})
</script>



<style>

</style>
