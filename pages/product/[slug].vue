<template>
  <div>
    <!-- <div class="overflow-hidden">
      <div
        class="h-[70vh] w-full bg-[url('/assets/images/Cover-scaled.jpg')] bg-cover bg-fixed top-0 overflow-x-hidden animate-breathout"
      >
        <div
          class="flex flex-col justify-center items-center h-full w-full bg-black bg-opacity-50"
        >
          <h1 class="text-white text-center text-4xl md:text-6xl font-bold">
            {{ useRoute().params.slug }}
          </h1>
        </div>
      </div>
    </div> -->
     <div class="flex text-xs gap-2 px-10 py-2 pt-8">
      <p>Shop</p>
      \
      <p>Category \ Product</p>
    </div>
    <div class="bg-white">
      <div class="container mx-auto px-4 py-8">
        <div class="flex items-start">
          <!-- Product Images -->
          <!-- <div class="flex w-full"> -->
            <div class="sticky top-20">
           <div class="flex w-auto flex-col gap-4 py-4 px-2 justify-center">
            <div class="p-2 w-20 h-20 border rounded-md bg-gray-100" @click="scrollToImage(image.id)"   v-for="image in product.images"
                :key="image.image">
              <img
              
                :src="image.image"
                alt="Thumbnail 1"
                class="object-cover rounded-md cursor-pointer transition duration-300"
                             />
              </div>
            </div>
            </div>
          <div class="w-full mx-10 px-4 mb-8">
            <img  v-for="image in product.images"
             :key="image.image"
                :src="image.image"
              alt="Product"
              class="w-full h-auto rounded-lg shadow-md mb-4"
              :id="image.id"
            />
           </div>
          <!-- </div> -->

          <!-- Product Details -->
          <div class="w-full sticky top-[-170px]  px-4">
            <p class="text-sm">Loose Leaf <UIcon name="fluent:leaf-three-16-regular" /> </p>
            <h2 class="text-3xl font-bold mb-2">Dragon Well Green Tea 100 gm
</h2>
            <!-- <p class="text-gray-600 mb-4">SKU: WH1000XM4</p> -->
            <div class="mb-4">
              <span class="text-2xl font-bold mr-2">TK : 845</span>
              <span class="text-gray-500 line-through">TK : 975</span>
            </div>
            <div class="flex text-sm items-center mb-4">
              <svg v-for="i in 5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-3 text-gray-800"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd"
                />
              </svg>
             
              <span class="ml-2 text-gray-600">4.5 (120 reviews)</span>
              <span class="underline px-3">Write a review</span>
            </div>
            <p class="text-gray-700 mb-6">
              Green tea with sweet fruits, rose, sunflower and hibiscus, with a touch of bergamot to finish.
            </p>

            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-2">Choose a format:</h3>
               <div class="flex gap-5 w-full">
                <div @click="format ='loose'" class="border flex justify-center items-center px-3 py-2  rounded-md w-full text-center" :class="format == 'loose' ? 'border-black' : 'border-gray-300'">
                  <p class="flex items-center justify-center gap-2"><UIcon name="fluent:leaf-three-16-regular"/> Loose leaf
                  
                 </p> <UIcon v-if="format == 'loose'" class="right-[-40px] relative" name="material-symbols:check-circle"/>
                </div>
                <div @click="format='bag'" class="border flex justify-center items-center px-3 py-2  rounded-md w-full text-center" :class="format == 'bag' ? 'border-black' : 'border-gray-300'">
                  <p class="flex items-center justify-center gap-2"><UIcon name="lineicons:teabag"/> Tea Bag</p>
                  <UIcon v-if="format == 'bag'" class="right-[-40px] relative" name="material-symbols:check-circle"/>
                </div>
               </div>
            </div>
            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-2">Choose a Size:</h3>
               <div class="flex gap-5 w-full">
                <div @click="price = 45" class="border flex flex-col justify-center items-center px-3 py-2  rounded-md w-full text-center space-y-2" :class="price == 45 ? 'border-black' : 'border-gray-300'">
                   <UIcon v-if="price == 45" class="right-[-40px] relative" name="material-symbols:check-circle"/>
                  <img :src="img1" class="size-20" alt="">
                  <p class="flex text-sm items-center justify-center gap-2">
                    45g
                  
                 </p>
                 <p class="flex font-semibold items-center"><UIcon name="tabler:currency-taka" />345 BDT</p>
                </div>
                <div @click="price = 100" class="border flex flex-col justify-center items-center px-3 py-2  rounded-md w-full text-center space-y-2" :class="price == 100 ? 'border-black' : 'border-gray-300'">
                   <UIcon v-if="price == 100" class="right-[-40px] relative" name="material-symbols:check-circle"/>
                  <img :src="img1" class="size-20" alt="">
                  <p class="flex text-sm items-center justify-center gap-2">
                    100g
                  
                 </p>
                 <p class="flex font-semibold items-center"><UIcon name="tabler:currency-taka" />875 BDT</p>
                </div>
                <div @click="price =150" class="border flex flex-col justify-center items-center px-3 py-2  rounded-md w-full text-center space-y-2" :class="price == 150 ? 'border-black' : 'border-gray-300'">
                   <UIcon v-if="price == 150" class="right-[-40px] relative" name="material-symbols:check-circle"/>
                  <img :src="img1" class="size-20" alt="">
                  <p class="flex text-sm items-center justify-center gap-2">
                    150g
                  
                 </p>
                 <p class="flex font-semibold items-center"><UIcon name="tabler:currency-taka" />1205 BDT</p>
                </div>
                <div @click="price =200" class="border flex flex-col justify-center items-center px-3 py-2  rounded-md w-full text-center space-y-2" :class="price == 200 ? 'border-black' : 'border-gray-300'">
                   <UIcon v-if="price == 200" class="right-[-40px] relative" name="material-symbols:check-circle"/>
                  <img :src="img1" class="size-20" alt="">
                  <p class="flex text-sm items-center justify-center gap-2">
                    200g
                  
                 </p>
                 <p class="flex font-semibold items-center"><UIcon name="tabler:currency-taka" />1545 BDT</p>
                </div>
              
               
               </div>
            </div>

            <div class="mb-6">
                 <NumberField id="Quantity" class="flex items-center justify-between" :default-value="1" :min="0">
                   <h3 class="text-lg font-semibold mb-2">Quantity</h3>
                  <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                  </NumberFieldContent>
                </NumberField>
            </div>

            <div class="flex space-x-4 mb-6">
              <button
                class="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                Add to Cart
              </button>
              <button
                class="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                Wishlist
              </button>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-2">Features:</h3>
              <div class="grid grid-cols-2 text-gray-700">
                <div><UIcon name="solar:tea-cup-bold" /> Black</div>
                <div><UIcon name="material-symbols:sunny-outline-rounded" /> Afternoon</div>
                <div><UIcon name="material-symbols:sunny-snowing-outline" /> Morning</div>
                <div><UIcon name="hugeicons:energy" /> Energy</div>
               
                
              </div>
            </div>
            <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Description</AccordionTrigger>
      <AccordionContent>
       King of Chinese green tea Dragon Well tea – also referred to as Long Jing or Lung Ching – originated from Hangzhou in Zhejiang province. Dragon Well is very significant to Chinese culture and it is essential to gain a true experience of Chinese tea. Dragon Well is well regarded amongst the green tea lovers and ranks as the finest amongst the top five famous Chinese teas. The Dragon Well Green Tea leaves are picked young and taken back to the village where the skilled tea masters use their bare hands to press them flat in a hot, dry wok in the traditional way. Here, it is meticulously dried by hand using a traditional pan-firing method. Featured as the ‘Tea of the Emperor’, this stunning blend affords a pale and illuminating yellow liquor with the most gentle and pure aroma.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Ingredients</AccordionTrigger>
      <AccordionContent>
      Black tea, hibiscus, natural and artificial bergamot flavouring (2%), rose petals, sunflower petals, natural and artificial flavouring, mallow flowers.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>Brewing Guide</AccordionTrigger>
      <AccordionContent>
     <li>
      Pre heat your cup with hot water for 1 minute then pour the water out 
     </li> 
     <li>

Take 2 grams of Dragon Well Green Tea in the warm cup
     </li>
     <li>

Fill the cup with 85°C (185°F) hot pure drinking water and enjoy the aroma
     </li>
     <li>

Let the tea steep for 3 – 5 minutes and enjoy the great taste up to 5 infusions
     </li>
      </AccordionContent>
    </AccordionItem>
     <AccordionItem value="item-4">
      <AccordionTrigger>Delivery & Returns</AccordionTrigger>
      <AccordionContent></AccordionContent>
      </AccordionItem>
     <AccordionItem value="item-5">
      <AccordionTrigger>Reviews(1200)</AccordionTrigger>
      <AccordionContent></AccordionContent>
      </AccordionItem>
  </Accordion>
          </div>
        </div>

        <div class="flex py-10 flex-col justify-center text-gray-700 items-center px-[15%]">
          <div>
            <h1 class="text-2xl font-semibold">Flavour Profile</h1>
            <p>Medium-bodied black tea provides a base for fruity and floral notes to shine.</p>
            <div class="grid grid-cols-4 gap-10 mt-10">
              <div>
                <UIcon name="solar:tea-cup-bold" class="text-5xl"/>
                <h1 class="text-xl font-semibold py-2">Aroma and Taste</h1>
                <p>
                  Ultra fruity scent of tropical and stone fruits. Once brewed, the fruits are joined by distinct yet balanced florals with light bergamot.
                </p>
              </div>
           
              <div>
                <UIcon name="fluent-emoji-high-contrast:fallen-leaf" class="text-5xl"/>
                <h1 class="text-xl font-semibold py-2">Ingredients</h1>
                <p>
                  Ultra fruity scent of tropical and stone fruits. Once brewed, the fruits are joined by distinct yet balanced florals with light bergamot.
                </p>
              </div>
              
              <div>
                <UIcon name="material-symbols:location-on-outline" class="text-5xl"/>
                <h1 class="text-xl font-semibold py-2">Origin & Terroir</h1>
                <p>
                  Ultra fruity scent of tropical and stone fruits. Once brewed, the fruits are joined by distinct yet balanced florals with light bergamot.
                </p>
              </div>
              <div>
                <UIcon name="streamline:health-care-2" class="text-5xl"/>
                <h1 class="text-xl font-semibold py-2">Health & Wellness</h1>
                <p>
                  Ultra fruity scent of tropical and stone fruits. Once brewed, the fruits are joined by distinct yet balanced florals with light bergamot.
                </p>
              </div>
            </div>
          </div>
         
        </div>
         <div class="w-full container py-20 px-[15%] bg-gray-200">
            <h1 class="text-2xl font-sans font-semibold">How to brew Dragon Well Green Tea</h1>
            <div class="flex w-1/2 justify-between text-sm py-10">
              <p><UIcon name="mdi:spoon-sugar" /> 1 tsp per cup</p>
              <p><UIcon name="ic:sharp-access-time" /> 2-3 min</p>
              <p><UIcon name="material-symbols:device-thermostat" /> 100℃ (212℉)</p>
            </div>
            <div class="grid grid-cols-5">
              <div class="col-span-3 space-y-3">
                <div class="flex px-10 items-center gap-10 py-8 rounded-md bg-white border">
                  <h1 class="text-4xl font-bold text-gray-300">1</h1>
                  <p class="text-gray-600">Add 1 teaspoon of French Earl Grey to your infuser and place the infuser in your cup or mug. To make a pot, the general rule is 1 teaspoon per 250 ml/8.4 fl oz.</p>
                </div>
                <div class="flex px-10 items-center gap-10 py-8 rounded-md bg-white border">
                  <h1 class="text-4xl font-bold text-gray-300">2</h1>
                  <p class="text-gray-600">
Fill the cup or pot with freshly boiled water. Avoid heating water in the microwave.</p>
                </div>
                <div class="flex px-10 items-center gap-10 py-8 rounded-md bg-white border">
                  <h1 class="text-4xl font-bold text-gray-300">3</h1>
                  <p class="text-gray-600">
Infuse for 2-3 minutes, or to desired strength.</p>
                </div>
                <div class="flex px-10 items-center gap-10 py-8 rounded-md bg-white border">
                  <h1 class="text-4xl font-bold text-gray-300">4</h1>
                  <p class="text-gray-600">
Remove the infuser. Sip and enjoy!</p>
                </div>
              </div>
              <div class="px-10 col-span-2">
                <h1 class="text-2xl font-semibold"> Brew tip</h1>
                <h1 class="text-xl"> 
The fruits and florals mean we usually don’t recommend adding milk. For a fun twist, try a squeeze of lemon or honey.</h1>
                  <div class="flex items-center p-4 rounded-lg justify-center w-full">
                     <img src="https://teasante.com/wp-content/uploads/2024/02/green-tea-vs-matcha-1-1024x678.jpg" alt="">
                  </div>
               
              </div>
            </div>
          </div>
          <div class="flex px-[15%] py-20  flex-col">
            <h1 class="text-2xl text-black font-semibold">Don't take our word for it</h1>

            <div class="grid grid-cols-3 gap-5 py-10">
              <div class="space-y-2">
                <div class="flex">
                  <UIcon name="fluent-color:star-16" />
                  <UIcon name="fluent-color:star-16" />
                  <UIcon name="fluent-color:star-16" />
                  <UIcon name="fluent-color:star-16" />
                  <UIcon name="fluent-color:star-16" />
                </div>
                <p class="font-semibold text-black">
                  Looks pretty, smells heavenly and tastes even better. This without doubt the family favourite.
                </p>
                <p class="text-xs text-gray-400">-Mark</p>
              </div>
              <div class="space-y-2">
                <div class="flex">
                  <UIcon name="fluent-color:star-16" />
                  <UIcon name="fluent-color:star-16" />
                  <UIcon name="fluent-color:star-16" />
                  <UIcon name="fluent-color:star-16" />
                  <UIcon name="fluent-color:star-16" />
                </div>
                <p class="font-semibold text-black">
                  Looks pretty, smells heavenly and tastes even better. This without doubt the family favourite.
                </p>
                <p class="text-xs text-gray-400">-Mark</p>
              </div>
              <div class="space-y-2">
                <div class="flex">
                  <UIcon name="fluent-color:star-16" />
                  <UIcon name="fluent-color:star-16" />
                  <UIcon name="fluent-color:star-16" />
                  <UIcon name="fluent-color:star-16" />
                  <UIcon name="fluent-color:star-16" />
                </div>
                <p class="font-semibold text-black">
                  Looks pretty, smells heavenly and tastes even better. This without doubt the family favourite.
                </p>
                <p class="text-xs text-gray-400">-Mark</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Accordion from '~/components/ui/accordion/Accordion.vue'
import AccordionContent from '~/components/ui/accordion/AccordionContent.vue'
import AccordionItem from '~/components/ui/accordion/AccordionItem.vue'
import AccordionTrigger from '~/components/ui/accordion/AccordionTrigger.vue'
import NumberField from '~/components/ui/number-field/NumberField.vue'
import NumberFieldContent from '~/components/ui/number-field/NumberFieldContent.vue'
import NumberFieldDecrement from '~/components/ui/number-field/NumberFieldDecrement.vue'
import NumberFieldIncrement from '~/components/ui/number-field/NumberFieldIncrement.vue'
import NumberFieldInput from '~/components/ui/number-field/NumberFieldInput.vue'

const img2 = 'https://i3.wp.com/haldavalley.com/wp-content/uploads/2025/02/Web-Page-2-05.jpg'
const img1 = 'https://i3.wp.com/haldavalley.com/wp-content/uploads/2025/02/Web-Page-2-05.jpg'
const img3 = 'https://i3.wp.com/haldavalley.com/wp-content/uploads/2025/02/Web-Page-2-05.jpg'
const format = ref('loose')
const price = ref(45)
const product = {
  name: 'Halda Valley Tea',
  description:
    'Halda Valley Tea is a premium tea brand that offers a wide range of high-quality teas. Our teas are carefully sourced from the finest tea gardens in the world, and are expertly blended to create a unique and delicious taste. Whether you are a tea connoisseur or just looking for a delicious cup of tea, Halda Valley Tea has something for everyone.',
  images: [{ id: '1', image: img1 }, { id: '2', image: img2 }, { id: '3', image: img3 },{ id: '4', image: img1 }, { id: '5', image: img2 }, { id: '6', image: img3 }],
  price: 10.99,
  category: 'Tea',
  rating: 4.5,
  reviews: [
    {
      name: 'John Doe',
      rating: 5,
      comment:
        'This tea is amazing! I love the taste and the aroma. It is definitely my new favorite tea.',
      date: '2022-01-01',
    },
    {
      name: 'Jane Doe',
      rating: 4,
      comment:
        'This tea is good, but not as good as I expected. It is still a good tea, but not as good as I expected.',
      date: '2022-01-02',
    },
  ],
}
const selectedImage = ref(product.images[0])
const scrollToImage = (id:string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
const changeImage = (src: string) => {
  // document.getElementById('mainImage').src = src;
  const mainImage = document.getElementById('mainImage')
  if (mainImage) {
    ;(mainImage as HTMLImageElement).src = src
  }
}
</script>

<style></style>
