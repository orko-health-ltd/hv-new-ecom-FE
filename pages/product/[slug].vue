<template>
  <div>
    <Head>
      <Title>{{ product?.name }} - Tea Shop</Title>
      <Meta name="description" :content="product?.specification || 'Discover our premium tea collection'" />
      <Meta property="og:title" :content="product?.name + ' - Tea Shop'" />
      <Meta property="og:description" :content="product?.specification || 'Discover our premium tea collection'" />
      <Meta property="og:image" :content="product?.front_image ? $config.public.apiBase + '/' + product.front_image : ''" />
      <Meta property="og:type" content="product" />
      <Meta name="keywords" :content="'tea, ' + product?.name + ', ' + product?.format + ', premium tea'" />
    </Head>
    <div class="flex text-xs gap-2 px-10 py-2 pt-8">
      <nuxt-link to="/shop">Shop</nuxt-link>
      \
      <p>Category \ Product</p>
    </div>
    <div v-if="product" class="bg-white">
      <div class="container mx-auto px-4 py-8">
        <div class="flex items-start">
          <!-- Product Images -->
          <!-- <div class="flex w-full"> -->
          <div class="sticky top-20">
            <div class="flex w-auto flex-col gap-4 py-4 px-2 justify-center">
              <div
                class="p-2 w-20 h-20 border rounded-md bg-gray-100"
                @click="scrollToImage(product.front_image)"
               
              >
                <NuxtImg
                 :placeholder="fallbackImage"
                    :src="`/halda/${product.front_image}`"
                    :alt="product.name"
                  class="object-cover rounded-md cursor-pointer transition duration-300"
                />
              </div>
              <div
                class="p-2 w-20 h-20 border rounded-md bg-gray-100"
                @click="scrollToImage(product.back_image)"
               
              >
                <NuxtImg
                 :placeholder="fallbackImage"
              :src="`/halda/${product.back_image}`"
              :alt="product.name"
                  class="object-cover rounded-md cursor-pointer transition duration-300"
                />
              </div>
            </div>
            <div class="flex w-auto flex-col gap-4 py-4 px-2 justify-center">
              <div
                class="p-2 w-20 h-20 border rounded-md bg-gray-100"
                @click="scrollToImage(image._id)"
                v-for="image in product.product_images"
                :key="image._id"
              >
               <NuxtImg
                :placeholder="fallbackImage"
              :src="`/halda/${image.url}`"
              :alt="product.name"
                  class="object-cover rounded-md cursor-pointer transition duration-300"
                />
              </div>
            </div>
          </div>
          <div class="w-full mx-10 px-4 mb-8">
           
              
             <NuxtImg
              :placeholder="fallbackImage"
              :src="`/halda/${product.front_image}`"
              :alt="product.name"
              class="w-full h-auto rounded-lg shadow-md mb-4"
              :id="product.front_image"
            />
              <NuxtImg
               :placeholder="fallbackImage"
              :src="`/halda/${product.back_image}`"
               :alt="product.name"
              class="w-full h-auto rounded-lg shadow-md mb-4"
              :id="product.back_image"
            />
           <NuxtImg
             
              v-for="image in product.product_images"
              :key="image._id"
               :src="`/halda/${image.url}`"
                :placeholder="fallbackImage"
              :alt="product.name"
              class="w-full h-auto rounded-lg shadow-md mb-4"
              :id="image._id"
            />
          </div>
          <!-- </div> -->

          <!-- Product Details -->
          <div class="w-full sticky top-[-170px] px-4">
            <p class="text-sm">
              {{ product.format }} <UIcon name="fluent:leaf-three-16-regular" />
            </p>
            <h2 class="text-3xl font-bold mb-2">
             {{ product.name }}
            </h2>
            <!-- <p class="text-gray-600 mb-4">SKU: WH1000XM4</p> -->
            <div class="mb-4">
              <span class="text-2xl font-bold mr-2">TK : {{ price }}</span>
              <span class="text-gray-500 line-through">TK : {{ discountPrice }}</span>
            </div>
            <div class="flex text-sm items-center mb-4">
              <svg
                v-for="i in 5"
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
              {{ product.specification }}
            </p>

            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-2">Choose a format:</h3>
              <div class="flex gap-5 w-full">
                <div
                  @click="format = 'loose'"
                  class="border flex justify-center items-center px-3 py-2 rounded-md w-full text-center"
                  :class="
                    format == 'loose' ? 'border-black' : 'border-gray-300'
                  "
                >
                  <p class="flex items-center justify-center gap-2">
                    <UIcon name="fluent:leaf-three-16-regular" /> Loose leaf
                  </p>
                  <UIcon
                    v-if="format == 'loose'"
                    class="right-[-40px] relative"
                    name="material-symbols:check-circle"
                  />
                </div>
                <div
                  @click="format = 'bag'"
                  class="border flex justify-center items-center px-3 py-2 rounded-md w-full text-center"
                  :class="format == 'bag' ? 'border-black' : 'border-gray-300'"
                >
                  <p class="flex items-center justify-center gap-2">
                    <UIcon name="lineicons:teabag" /> Tea Bag
                  </p>
                  <UIcon
                    v-if="format == 'bag'"
                    class="right-[-40px] relative"
                    name="material-symbols:check-circle"
                  />
                </div>
              </div>
            </div>
            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-2">Choose a Size:</h3>
              <div class="flex gap-5 w-full">
                <div v-for="sku in products" :key="sku._id"
                  @click="getProduct(sku.slug)"
                  class="border flex flex-col justify-center items-center px-3 py-2 rounded-md w-full text-center space-y-2"
                  :class="product._id == sku._id ? 'border-black' : 'border-gray-300'"
                >
                  <UIcon
                    v-if="product._id == sku._id"
                    class="right-[-40px] relative"
                    name="material-symbols:check-circle"
                  />
              
                  <NuxtImg
              :src="`/halda/${sku.front_image}`"
               :placeholder="fallbackImage"
              :alt="sku.name"
                   class="size-20" />
                  <p class="flex text-sm items-center justify-center gap-2">
                    {{ sku.sku }}
                  </p>
                  <p class="flex font-semibold items-center">
                    <UIcon name="tabler:currency-taka" />{{ sku.price }} BDT
                  </p>
                </div>
                
              </div>
            </div>

            <div class="mb-6">
              <NumberField
                id="Quantity"
                v-model="quantity"
                class="flex items-center justify-between"
                :default-value="1"
                :min="0"
              >
                <h3 class="text-lg font-semibold mb-2">Quantity</h3>
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
            </div>

            <div class="flex space-x-4 mb-6">
              <button @click="addToCart()" v-if="!addingToCart"
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
              <UButton 
                  v-else
                  icon="material-symbols:check-circle-outline-rounded"
                  size="sm"
                  color="blue"
                  variant="soft"
                  label="Added to cart"
                  :class="{'animate-click': addingToCart }"
                  :trailing="false"
                  
                /> 
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
                <div v-for="item in product.features"><UIcon name="solar:tea-cup-bold" /> {{ item }}</div>
               
              </div>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>
                 {{ product.specification }}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Ingredients</AccordionTrigger>
                <AccordionContent>
                 <ul>
                  <li v-for="ingredient in product.ingredients">{{ ingredient }}</li>
                 </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Brewing Guide</AccordionTrigger>
                <AccordionContent>
                  <li v-for="item in product.brewing_guide">
                   {{ item }}
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

        <div
          class="flex py-10 flex-col justify-center text-gray-700 items-center px-[15%]"
        >
          <div>
            <h1 class="text-2xl font-semibold">Flavour Profile</h1>
            <p>
              Medium-bodied black tea provides a base for fruity and floral
              notes to shine.
            </p>
            <div class="grid grid-cols-4 gap-10 mt-10">
              <div>
                <UIcon name="solar:tea-cup-bold" class="text-5xl" />
                <h1 class="text-xl font-semibold py-2">Aroma and Taste</h1>
                <p>
                  Ultra fruity scent of tropical and stone fruits. Once brewed,
                  the fruits are joined by distinct yet balanced florals with
                  light bergamot.
                </p>
              </div>

              <div>
                <UIcon
                  name="fluent-emoji-high-contrast:fallen-leaf"
                  class="text-5xl"
                />
                <h1 class="text-xl font-semibold py-2">Ingredients</h1>
                <p>
                  Ultra fruity scent of tropical and stone fruits. Once brewed,
                  the fruits are joined by distinct yet balanced florals with
                  light bergamot.
                </p>
              </div>

              <div>
                <UIcon
                  name="material-symbols:location-on-outline"
                  class="text-5xl"
                />
                <h1 class="text-xl font-semibold py-2">Origin & Terroir</h1>
                <p>
                  Ultra fruity scent of tropical and stone fruits. Once brewed,
                  the fruits are joined by distinct yet balanced florals with
                  light bergamot.
                </p>
              </div>
              <div>
                <UIcon name="streamline:health-care-2" class="text-5xl" />
                <h1 class="text-xl font-semibold py-2">Health & Wellness</h1>
                <p>
                  Ultra fruity scent of tropical and stone fruits. Once brewed,
                  the fruits are joined by distinct yet balanced florals with
                  light bergamot.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full container py-20 px-[15%] bg-gray-200">
          <h1 class="text-2xl font-sans font-semibold">
            How to brew {{ product.brand.name }}
          </h1>
          <div  class="flex w-1/2 justify-between text-sm py-10">
            <p><UIcon name="mdi:spoon-sugar" /> 1 tsp per cup</p>
            <p><UIcon name="ic:sharp-access-time" /> 2-3 min</p>
            <p>
              <UIcon name="material-symbols:device-thermostat" /> 100℃ (212℉)
            </p>
          </div>
          <div class="grid grid-cols-5">
            <div class="col-span-3 space-y-3">
              <div v-for="(item,index) in product.brewing_guide"
                class="flex px-10 items-center gap-10 py-8 rounded-md bg-white border"
              >
                <h1 class="text-4xl font-bold text-gray-300">{{ index+1 }}</h1>
                <p class="text-gray-600">
                 {{ item }}.
                </p>
              </div>
            
            </div>
            <div class="px-10 col-span-2">
              <h1 class="text-2xl font-semibold">Brew tip</h1>
              <h1 class="text-xl">
                The fruits and florals mean we usually don’t recommend adding
                milk. For a fun twist, try a squeeze of lemon or honey.
              </h1>
              <div
                class="flex items-center p-4 rounded-lg justify-center w-full"
              >
                <img
                  src="https://teasante.com/wp-content/uploads/2024/02/green-tea-vs-matcha-1-1024x678.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex px-[15%] py-20 flex-col">
          <h1 class="text-2xl text-black font-semibold">
            Don't take our word for it
          </h1>

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
                Looks pretty, smells heavenly and tastes even better. This
                without doubt the family favourite.
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
                Looks pretty, smells heavenly and tastes even better. This
                without doubt the family favourite.
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
                Looks pretty, smells heavenly and tastes even better. This
                without doubt the family favourite.
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
import { getPreciseStringLengthPx } from '@unovis/ts'
import { set } from '@vueuse/core'
import Accordion from '~/components/ui/accordion/Accordion.vue'
import AccordionContent from '~/components/ui/accordion/AccordionContent.vue'
import AccordionItem from '~/components/ui/accordion/AccordionItem.vue'
import AccordionTrigger from '~/components/ui/accordion/AccordionTrigger.vue'
import NumberField from '~/components/ui/number-field/NumberField.vue'
import NumberFieldContent from '~/components/ui/number-field/NumberFieldContent.vue'
import NumberFieldDecrement from '~/components/ui/number-field/NumberFieldDecrement.vue'
import NumberFieldIncrement from '~/components/ui/number-field/NumberFieldIncrement.vue'
import NumberFieldInput from '~/components/ui/number-field/NumberFieldInput.vue'
import type { Product } from '~/types'
import IMG from '@/assets/images/no-image.jpg'
const fallbackImage = IMG
const img2 =
  'https://i3.wp.com/haldavalley.com/wp-content/uploads/2025/02/Web-Page-2-05.jpg'
const img1 =
  'https://i3.wp.com/haldavalley.com/wp-content/uploads/2025/02/Web-Page-2-05.jpg'
const img3 =
  'https://i3.wp.com/haldavalley.com/wp-content/uploads/2025/02/Web-Page-2-05.jpg'
const format = ref('loose')
const quantity = ref(1)
const route = useRoute()
const product = ref<Product>()
const products = ref<Product[]>([])
const price = ref(0)
const discountPrice = ref(0)
const addingToCart = ref(false)
const cart = useMyCartStore()

const toast = useToast()
const getProduct = async (slug: string | string[]) => {
  const { data: responseData } = await $fetch<{ data: Product }>('/api/products/' + slug)
  console.log('hello',responseData)
  product.value = responseData
  if (product.value?.discount && product.value?.discount > 0 && product.value?.price) {
    if (product.value.discount_unit === 'percent') {
      price.value = product.value.price - (product.value.price * product.value.discount) / 100
    }
    else {
      price.value = product.value.price - product.value.discount
    }
  }
  else {
    price.value = product?.value?.price ? product?.value?.price : 0
  }
  discountPrice.value = product?.value?.price ? product?.value?.price : 0

  if(product.value.brand_id) {
    getSkuProducts()
  }
  }
const selectedImage = ref('')
const addToCart = () => {
  if (product.value) {
      addingToCart.value = true
      cart.addToCart(product.value, quantity.value)
    console.log(quantity.value)
    toast.add({ title: 'Product added to cart', color: 'green',timeout: 1500 })
      setTimeout(() => {
        addingToCart.value = false
      }, 3000)
    }
}
const scrollToImage = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
const changeImage = (src: string) => {
  // document.getElementById('mainImage').src = src;
  const mainImage = document.getElementById('mainImage')
  if (mainImage) {
    ;(mainImage as HTMLImageElement).src = src
  }
}
const getSkuProducts = async () => {
  const { data: responseData } = await $fetch<{ data: Product[] }>(
    '/api/products/brand/' + product.value?.brand_id
  )

  products.value = responseData || []
}
onMounted(() => {
  getProduct(route.params?.slug)
 
})
</script>

<style></style>
