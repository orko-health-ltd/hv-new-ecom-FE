<template>
  <div class="z-0 max-w-screen h-auto md:h-[70vh] top-0 overflow-hidden">
    <UCarousel
      ref="carouselRef"
      v-slot="{ item }"
      :items="items"
      loop
      :ui="{ item: 'basis-full w-screen flex-col w-full' }"
      class="overflow-hidden w-full"
      indicators
    >
      <div
        class="bg-[#2323232a] bg-cover w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] gap-2 md:gap-10 py-10 flex justify-start items-center"
        :style="`background-image: url(${item._id == '1234' ? item.image :
          $config.public.apiBase + '/' + item.image
        }); background-size: cover; background-position: center;`"
      >
        <div
          class="font-mono mx-0 sm:mx-[5%] w-full px-4 sm:px-10 py-5 flex font-bold flex-col"
        >
          <!-- <span class="text-sm md:text-lg text-white uppercase tracking-widest mb-2">New Collection</span> -->
          <h1 class="text-2xl md:text-4xl text-white font-serif mb-2">
            {{ item.title }}
          </h1>
          <h2 class="text-xl md:text-2xl text-white font-serif mb-4">
            {{ item.description }}
          </h2>
          <!-- <p class="text-white text-sm md:text-base max-w-2xl mb-8">Experience the finest craftsmanship and timeless elegance with our latest collection. Each piece tells a unique story of artistry and sophistication.</p> -->
          <div class="flex flex-wrap font-sans gap-2">
            <template v-for="(link, index) in item.links" :key="index">
              <nuxt-link :to="'/shop/'+link.link">
                <Button v-if="index == 0" variant="outline"
                
                >
                  {{ link.title }}
                </Button>
                <Button v-else-if="index == 1"   class="bg-cyan-500 hover:bg-cyan-600 text-white justify-start sm:justify-center"
                 
                
                >
                  {{ link.title }}
                </Button>
                <Button v-else-if="index == 2"   class="bg-green-600 hover:bg-green-700 text-white justify-start sm:justify-center"
                
                >
                  {{ link.title }}
                </Button>
              </nuxt-link>
            </template>
          </div>        </div>

        <!-- <div class="font-serif px-2 lg:px-14 py-5 flex flex-col justify-center items-center">
      <h1 class="text-lg md:text-4xl text-gray-800 font-serif mb-0 sm:mb-2">{{ item.name }}</h1>
     <h1 class="text-2xl md:text-6xl text-gray-800 font-serif mb-0 sm:mb-2">{{ item.title }}</h1>
     <p class="text-gray-900 text-xs tracking-normal mb-5 sm:mb-10 font-thin">{{ item.description }}</p>
      <div class="flex w-full items-center space-x-2 md:space-x-5 mb-2 text-[#b4a345]">
      <div class="w-full border-t-2 border-[#b4a345]"></div>
      <nuxt-link :to="`/product-category/${item.slug}`" class="text-sm md:text-[20px] font-thin ">Explore</nuxt-link>
      <div class="w-full border-t-2 border-[#b4a345]"></div>
    </div>
    </div> -->
      </div>
    </UCarousel>
    <!-- 
    <video
      autoplay
      muted
      loop
      playsinline
      class="inset-0 max-w-screen w-screen  h-auto md:h-[87vh] object-cover" 
      src="/assets/videos/halda.mp4"
    ></video>
    
    <div class="absolute inset-0   h-1/2 mt-5 md:mt-0 md:h-screen flex flex-col items-center justify-center text-white">
     <section class="flex flex-col items-center justify-center mb-5 py-13 px-4">
  
    <div class="flex w-full items-center space-x-5 mb-2">
      <div class="w-full border-t-2 border-yellow-600"></div>
      <h2 class="text-lg md:text-[28px] text-nowrap lg:text-[35px]  text-white">Halda Valley</h2>
      <div class="w-full border-t-2 border-yellow-600"></div>
    </div>

    <h2 class="text-xl md:text-3xl lg:text-5xl uppercase tracking-[12px] font-bold text-white mb-2">Value You</h2>

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
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import GEBT from 'assets/images/Cover-scaled.jpg'
import SNWT from 'assets/images/gallery/prod-3.jpg'
import dwgt from 'assets/images/bg.webp'

import type { Banner } from '~/types'
const items = ref(<Banner[]>[
  //   {
  //     name:'Silver Needle',
  //     title: 'White Tea',
  //     slug:'silver-needle-white-tea',
  //     description: "The lingering fragrance of our Halda Valley Silver Needle White Tea is Delicately honeysuckle floral, with a warmed sugar sweetness and soft mouthfeel and uplifting finish.",
  //     img:SNWT
  //   },
  //   // {
  //   //   name:'Dragon Well',
  //   //   title: 'Green Tea',
  //   //   description: "Our fine Halda Valley Dragon Well Green Tea has a bitter sweet, strong aroma and a deep, long-lasting flavor. A truly satisfying cup of wellness.",
  //   //   img:dwgt
  //   // },
  //  {
  //     name:'Golden Eyebrow',
  //    title: 'Black Tea',
  //     slug:'golden-eyebrow-black-tea',
  //     description: "Halda Valley Golden Eyebrow Black Tea is made of delicate handpicked leaves that offers Strong honey and floral fragrance with distinctly honey-sweet & mellow taste.",
  //     img:DWGT
  //   },
])
const carouselRef = ref()
const getBanners = async () => {
  const { data } = await $fetch<{ data: Banner[] }>('/api/banners')
  console.log(data)
  if(data.length > 0)
  items.value = data as Banner[]
}
onMounted(() => {
  items.value.push(
    {
    _id: '1234',
    is_active: true,
    title: 'Green Tea',
    description:
      'Our fine Halda Valley Dragon Well Green Tea has a bitter sweet, strong aroma and a deep, long-lasting flavor. A truly satisfying cup of wellness.',
    image: GEBT,
    links: [
      {
        title: 'Shop All',
        link: '/shop/all',
      },
      {
        title: 'Shop Top Selling',
        link: '/shop/best-selling',
      },
      {
        title: 'Shop Gift Box',
        link: '/shop/gift-box',
      },
    ],
    },
    {
    _id: '1234',
    is_active: true,
    title: 'Green Tea',
    description:
      'Our fine Halda Valley Dragon Well Green Tea has a bitter sweet, strong aroma and a deep, long-lasting flavor. A truly satisfying cup of wellness.',
    image: SNWT,
    links: [
      {
        title: 'Shop All',
        link: '/shop/all',
      },
      {
        title: 'Shop Top Selling',
        link: '/shop/best-selling',
      },
      {
        title: 'Shop Gift Box',
        link: '/shop/gift-box',
      },
    ],
    },
    {
    _id: '1234',
    is_active: true,
    title: 'Green Tea',
    description:
      'Our fine Halda Valley Dragon Well Green Tea has a bitter sweet, strong aroma and a deep, long-lasting flavor. A truly satisfying cup of wellness.',
    image: dwgt,
    links: [
      {
        title: 'Shop All',
        link: '/shop/all',
      },
      {
        title: 'Shop Top Selling',
        link: '/shop/best-selling',
      },
      {
        title: 'Shop Gift Box',
        link: '/shop/gift-box',
      },
    ],
    },
  )
  getBanners()
  setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 5000)
})
</script>

<style></style>
