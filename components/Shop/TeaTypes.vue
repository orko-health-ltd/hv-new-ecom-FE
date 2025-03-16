<template>
  <div class="py-5">
    <div class="flex flex-col items-center justify-center mt-10 gap-2"> 
       <h1 class="text-2xl font-semibold">Tea types</h1>
    <h5 class="w-1/3 text-center">
      With over 100 teas available, we’ve got your beloved favourites as well
as unexpected flavours so there’s something for every taste
    </h5>
    </div>
   
    <UCarousel class="ps-10 h-[500px]"
    v-slot="{ item }"
   
    loop
    dots
    arrows
    auto-scroll
    :items="items"
    :ui="{ item: 'basis-1/5' }"
  >
  <nuxt-link :to="`/shop/${item.slug}`" :state="{description:item.desc}" class="flex flex-col hover:scale-105 transition-transform items-top justify-center gap-2">
     <div class="z-10 relative ">
     <img :src="item.img" width="234" height="234" class="rounded-lg">
    
  </div>
    <div class="relative top-[-120px] hover:shadow-lg  w-[238px] h-[300px] bg-white">
    <div class="flex flex-col items-center justify-center gap-2 p-5">
      <div class=" h-[80px]">

      </div>
      <h1 class="font-semibold">{{ item.name }}</h1>
      <p class="text-sm text-center">{{ item.desc }}</p>
    </div>
    </div>
  </nuxt-link>
 
  </UCarousel>
  </div>
</template>

<script lang="ts" setup>
const items = [
  {
    img: 'https://cdn.intelligencebank.com/au/share/NOrD/2lPAP/dMgDY/size=408&quality=70&compresstype=WebP&ext=png/image-hero-banner',
    name: 'Black Tea',
    slug: 'black-tea',
    desc:'Black tea is a type of tea that is more oxidized than oolong, yellow, white and green teas. It is generally stronger in flavour than other teas.'
  },
  {
    img: 'https://cdn.intelligencebank.com/au/share/NOrD/2lPAP/XM9X9/size=408&quality=70&compresstype=WebP&ext=png/image-hero-banner',
    name: 'Green Tea',
    slug: 'green-tea',
  desc:'Green tea is made from Camellia sinensis leaves and buds that have not undergone the same withering and oxidation process used to make oolong teas and black teas.'
  },
  {
    img: 'https://cdn.intelligencebank.com/au/share/NOrD/2lPAP/dMgDY/size=408&quality=70&compresstype=WebP&ext=png/image-hero-banner',
    name: 'Herbal Tea',
    slug: 'herbal-tea',
  desc:'Herbal tea is a type of tea that is made from herbs, spices, or other natural ingredients. It is not made from the Camellia sinensis plant, which is used to make black, green, oolong, and white teas.'
  },
  {
    img: 'https://cdn.intelligencebank.com/au/share/NOrD/2lPAP/dMgDY/size=408&quality=70&compresstype=WebP&ext=png/image-hero-banner',
    name: 'White Tea',
    slug: 'white-tea',
  desc:'White tea is made from young tea leaves that have not undergone the same withering process used to make other types of tea. It is the least processed type of tea and is known for its delicate flavor and aroma.'
  },
  {
    img: 'https://cdn.intelligencebank.com/au/share/NOrD/2lPAP/dMgDY/size=408&quality=70&compresstype=WebP&ext=png/image-hero-banner',
    name: 'Oolong Tea',
    slug: 'oolong-tea',
  desc:'Oolong tea is a type of tea that is partially oxidized, which gives it a unique flavor and aroma. It is made from the Camellia sinensis plant and is known for its smooth, mellow taste.'
  },
 {
    img: 'https://cdn.intelligencebank.com/au/share/NOrD/2lPAP/dMgDY/size=408&quality=70&compresstype=WebP&ext=png/image-hero-banner',
   name: 'Rooibos Tea',
   slug: 'rooibos-tea',
  desc:'Rooibos tea is a type of herbal tea that is made from the leaves of the rooibos plant, which is native to South Africa. It is known for its sweet, nutty flavor and is often used as a substitute for coffee.'
  },
  {
    img: 'https://cdn.intelligencebank.com/au/share/NOrD/2lPAP/dMgDY/size=408&quality=70&compresstype=WebP&ext=png/image-hero-banner',
    name: 'Matcha Tea',
    slug: 'matcha-tea',
  desc:'Matcha tea is a type of green tea that is made from finely ground green tea leaves. It is known for its vibrant green color and rich, earthy flavor.'
  },
  {
    img: 'https://cdn.intelligencebank.com/au/share/NOrD/2lPAP/dMgDY/size=408&quality=70&compresstype=WebP&ext=png/image-hero-banner',
    name: 'Chai Tea',
    slug: 'chai-tea',
  desc:'Chai tea is a type of spiced tea that is made by brewing black tea with a mixture of spices, such as cinnamon, cardamom, ginger, and cloves. It is a popular beverage in many parts of the world.'
  },
 {
    img: 'https://cdn.intelligencebank.com/au/share/NOrD/2lPAP/dMgDY/size=408&quality=70&compresstype=WebP&ext=png/image-hero-banner',
   name: 'Pu-erh Tea',
   slug: 'pu-erh-tea',
  desc:'Pu-erh tea is a type of fermented tea that is made from the Camellia sinensis plant. It is known for its rich, earthy flavor and is often aged for several years to develop its unique flavor profile.'
  },
  {
    img: 'https://cdn.intelligencebank.com/au/share/NOrD/2lPAP/dMgDY/size=408&quality=70&compresstype=WebP&ext=png/image-hero-banner',
    name: 'Matcha Tea',
    slug: 'matcha-tea',
  desc:'Matcha tea is a type of green tea that is made from finely ground green tea leaves. It is known for its vibrant green color and rich, earthy flavor.'
  },
  {
    img: 'https://cdn.intelligencebank.com/au/share/NOrD/2lPAP/dMgDY/size=408&quality=70&compresstype=WebP&ext=png/image-hero-banner',
    name: 'Chai Tea',
    skugg: 'chai-tea',
  desc:'Chai tea is a type of spiced tea that is made by brewing black tea with a mixture of spices, such as cinnamon, cardamom, ginger, and cloves. It is a popular beverage in many parts of the world.'
  },
 
  
]
</script>

<style>

</style>