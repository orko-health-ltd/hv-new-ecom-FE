<template>
  <div class="bg-[#01251a] z-10 fixed flex justify-between items-center w-full px-3 py-7">
    <nuxt-link to="/" class="w-[160px]">
 <img class="w-full h-[48px] " src="/assets/images/logo/hv-logo-white.png" alt="">
    </nuxt-link>
    <div class="w-full">
      <ul class="flex text-white justify-center items-center text-sm gap-8 w-full">
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/shop/">Shop</nuxt-link>
        <li>
         
           <UDropdown :items="abouts" mode="hover" class="border-none ring-0 hover:bg-none"  :popper="{ placement: 'bottom-start' }">
    <UButton color="white" label=" About Us" class="bg-transparent ring-0 hover:!bg-transparent  border-none" :class="route.path.startsWith('/about-us') ? 'text-[#b4a345]':'text-white'" trailing-icon="i-heroicons-chevron-down-20-solid" />
       
  </UDropdown>
         </li>
        <li>  <UDropdown :items="teas" mode="hover" class="border-none ring-0 hover:bg-none"  :popper="{ placement: 'bottom-start' }">
    <UButton color="white" label="Our Tea" class="bg-transparent ring-0 hover:!bg-transparent  border-none" :class="route.path.startsWith('/product-category') ? 'text-[#b4a345]':'text-white'" trailing-icon="i-heroicons-chevron-down-20-solid" />
       
  </UDropdown></li>
        <nuxt-link to="/springflush">Springflush</nuxt-link>
        <a href="https://tealounge.haldavalley.com/">Tea Lounge</a>
          <li>  <UDropdown :items="medias" mode="hover" class="border-none ring-0 hover:bg-none"  :popper="{ placement: 'bottom-start' }">
    <UButton color="white" label="Media" class="bg-transparent ring-0 hover:!bg-transparent  border-none" :class="route.path.startsWith('/media') ? 'text-[#b4a345]':'text-white'" trailing-icon="i-heroicons-chevron-down-20-solid" />
       
  </UDropdown></li>
         <nuxt-link to="/contact-us">Contact Us</nuxt-link>
         <nuxt-link to="/career">Careers</nuxt-link>
       
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const teas = [[
  {
  label: 'Halda Valley Black Tea',
  to:'/product-category/Halda_Valley_Black_Tea'
  },
  {
  label: 'Dragon Well Green Tea',
  to:'/product-category/Dragon_Well_Green_Tea'
  },
  {
  label: 'Golden Eyebrow Black Tea',
  to:'/product-category/Golden_Eyebrow_Black_Tea'
  },
  {
  label: 'Red Robe Olong Tea',
  to:'/product-category/Red_Robe_Olong_Tea'
  },
  {
  label: 'Silver Needle White Tea',
  to:'/product-category/Silver_Needle_White_Tea'
  },
]]
const abouts = [
  [{
    label: 'Our Story',
    to: '/about-us/our-story',
  },
  {
    label: 'Timeline',
    to: '/about-us/timeline',
  },
  {
    label: 'Our People',
    to: '/about-us/our-people',
  },
  {
    label: 'Corporate Client List',
    to: '/about-us/corporate-client-list',
  }
  ]
]
const medias = [
  [{
    label: 'Media & Events',
    to: '/media/media-events',
  },
  {
    label: 'Brochure',
    to: '/media/brochure',
  },
  {
    label: 'Feedback Form',
    to: '/media/feedback-form',
  }
  ]
]
</script>



<style>
.router-link-active {
  color: #b4a345; 
}
</style>
