<template>
  <div class="bg-[#01251a] z-10 fixed flex justify-between items-center w-full px-3 py-7">
    <div class="w-[160px]">
 <img class="w-full h-[48px] " src="/assets/images/logo/hv-logo-white.png" alt="">
    </div>
    <div class="w-full">
      <ul class="flex text-white justify-center items-center text-sm gap-8 w-full">
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/shop/">Shop</nuxt-link>
        <li>
           <UDropdown :items="items" mode="hover" class="border-none ring-0 hover:bg-none" :popper="{ placement: 'bottom-start' }">
    <UButton color="white" label=" About Us" class="bg-transparent ring-0 hover:!bg-transparent text-white border-none" trailing-icon="i-heroicons-chevron-down-20-solid" />
  </UDropdown>
         </li>
        <li>Our Tea</li>
        <li>Springflush</li>
        <li>Tea Lounge</li>
        <li>Media</li>
        <li>Contact Us</li>
        <li>Careers</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
const items = [
  [{
    label: 'Profile',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    }
  }]
]
</script>



<style>

</style>
