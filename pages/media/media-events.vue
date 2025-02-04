<template>
  <div>
    <div
      class="flex font-serif flex-col items-center justify-center w-full bg-[url('/assets/images/home/bg-discover.jpg')] bg-cover py-10 h-[40vh]"
    >
      <h1 class="text-[47px] uppercase text-white tracking-widest">
        Media & Events
      </h1>
    </div>
    <div class="flex justify-center items-center bg-[#01251a]">
      <UTabs
        :items="items"
        class="w-full flex flex-col py-5 justify-center items-center"
        :ui="{
          list: {
            width: 'w-1/2',
            tab: { size: 'text-xl', inactive: 'text-white' },
            background: 'bg-[#01251a]',
          },
        }"
      >
        <template #events="{ item }">
          <div class="bg-white grid grid-cols-2 px-10 py-10">
           <a :href="event.url" v-for="event in events" :key="event.url" class="px-10 py-5">
              <img :src="event.img" alt="">
              <p>{{ event.description }}</p>
           </a>
          </div>
        </template>
        <template #press="{ item }">
          <div class="bg-white grid grid-cols-2 px-10 py-10">
           <a :href="press.url" v-for="press in presses" :key="press.url" class="px-10 py-5">
              <img :src="press.img" alt="">
              <p>{{ press.description }}</p>
           </a>
          </div>
        </template>
        <template #images="{ item }">
         <image-gallery :images="images" galleryID="my-test-gallery" />
        </template>
        <template #video="{ item }">
         <div class="bg-white p-10 gap-5 grid grid-cols-2">
          <div v-for="video in videos" class="w-full h-[400px] " :key="video.link" >
            
             <iframe :src="video.link" class="w-full h-full rounded-xl" frameborder="0"></iframe>
        
          </div>
          </div>
        </template>
      </UTabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import DSC04328 from 'assets/images/DSC04328-fb.jpg'
import Press1 from 'assets/images/DSC04328.jpg'
import Press2 from 'assets/images/The-Daily-Star.png'

import g1 from 'assets/images/gallery/1.jpg'
import g2 from 'assets/images/gallery/2.jpg'
import g3 from 'assets/images/gallery/3.jpg'
import g4 from 'assets/images/gallery/4.jpg'
import g5 from 'assets/images/gallery/5.jpg'
const items = [
  {
    slot: 'events',
    label: 'Events',
  },
  {
    slot: 'press',
    label: 'Press',
  },
  {
    slot: 'images',
    label: 'Images',
  },
  {
    slot: 'video',
    label: 'Video',
  },
]
const events = [
  {
    name: '',
    url:'https://www.facebook.com/haldavalley/photos/a.819440228126235/8722986614438184/',
    description: 'We are honored to have with us Mr. Mohammed Abu Zafar, Ambassador of Bangladesh to UAE and Permanent Representative to IRENA at Halda valley stall in Gulfood - 2023.',
    img:DSC04328
  }
]
const presses = [
  {
    name: '',
    url:'https://futurestartup.com/2022/05/18/halda-valley-food-and-beverage-managing-director-shamim-khan-on-what-worked-for-the-company-in-the-early-days/',
    description: 'Halda Valley Food and Beverage Managing Director Shamim Khan',
    img:Press1
  },
  {
    name: '',
    url:'https://www.thedailystar.net/lifestyle/check-it-out/news/halda-valleys-spring-flush-2087761',
    description: 'Halda Valley Food and Beverage Managing Director Shamim Khan',
    img:Press2
  }
]
const images = [
        {
          largeURL:
            g1,
          thumbnailURL:
            g1,
         width: 2500,
          height: 1566,
        },
        {
          largeURL:
           g2,
          thumbnailURL:
           g2,
           width: 2500,
          height: 1566,
        },
        {
          largeURL:
            g3,
          thumbnailURL:
            g3,
          width: 2500,
          height: 1566,
        },
        {
          largeURL:
            g4,
          thumbnailURL:
            g4,
          width: 2500,
          height: 1666,
        },
        {
          largeURL:
            g5,
          thumbnailURL:
            g5,
          width: 1420,
          height: 800,
        },
]
const videos = [
  {
          link:'https://www.youtube.com/embed/eVKvJ9vshX4'
        },
  {
          link:'https://www.youtube.com/embed/Y1yMQSPUteA'
        },
  {
          link:'https://www.youtube.com/embed/71q03ld_pj8'
        },
  {
          link:'https://www.youtube.com/embed/2OHB3FckqNg'
        }
      ]
</script>

<style></style>
