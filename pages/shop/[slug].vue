<template>
  <div>
    <div class="flex gap-2 px-10 py-2 pt-8">
      <nuxt-link to="/"> Home</nuxt-link>
   \   <nuxt-link to="/shop"> Shop</nuxt-link>
      \
      <nuxt-link :to="`/shop/${route?.params.slug}`">
        {{ route?.params.slug }}</nuxt-link
      >
    </div>

    <div
      class="flex px-4 sm:px-10 py-3 gap-2 flex-col justify-start items-start"
    >
      <h1 class="text-4xl text-gray-700 font-semibold">
        {{
          Array.isArray(route?.params.slug)
            ? route.params.slug[0].replace(/-/g, ' ').charAt(0).toUpperCase() +
              route.params.slug[0].replace(/-/g, ' ').slice(1)
            : route?.params.slug.replace(/-/g, ' ').charAt(0).toUpperCase() +
              route?.params.slug.replace(/-/g, ' ').slice(1)
        }}
      </h1>
      <div
        class="flex sm:flex-row flex-col w-full justify-between items-center"
      >
        <p class="w-full lg:w-1/2 text-sm">
          Famous yet humble, our tea is a true reflection of the land it comes
          from.Drinking tea is an act of mindfulness. It’s a moment to slow
          down, take a breath and enjoy the moment.
        </p>
        <div class="flex justify-end w-full items-center gap-1">
          <Button
            variant="ghost"
            @click="showFilters = !showFilters"
            class="flex !px-2 gap-1 items-center"
          >
            <UIcon name="mage:filter" class="text-xl" />
            <p class="font-semibold">Filter</p>
            <!-- <p class="font-semibold" >{{showFilters ?'Hide Filters' : 'Show Filters'}}</p> -->
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger as-child class="flex gap-1 items-center">
              <Button variant="ghost" class="!px-2">
                <UIcon name="lets-icons:sort-list" class="text-2xl" />
                <p class="font-semibold">Sort By</p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-56">
              <DropdownMenuLabel>Sort products by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup v-model="sortByValue">
                <!-- <DropdownMenuRadioItem value="typedown">
                  Tea Types (A-Z)
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="typeup">
                  Tea Types (Z-A)
                </DropdownMenuRadioItem> -->
                <DropdownMenuRadioItem value="pricedown">
                  Price (Low to High)
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="priceup">
                  Price (High to Low)
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="namedown">
                  Name (A-Z)
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="nameup">
                  Name (Z-A)
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
    <hr />
    <!-- <products-grid :products="products" /> -->
    <div class="flex sm:flex-row flex-col justify-between items-baseline">
      <div
        v-if="showFilters"
        class="px-5 w-screen sm:w-auto sm:px-10 text-gray-700 py-10"
      >
        <div>
          <h1 class="text-xl font-semibold">Filters</h1>
        </div>
        <Accordion type="single" class="w-full sm:hidden block" :default-value="defaultValue" collapsible>
          <AccordionItem
            v-for="item in accordionItems"
            :key="item.value"
            :value="item.value"
          >
            <AccordionTrigger>{{ item.title }}</AccordionTrigger>
            <AccordionContent>
             <div class="space-y-3 text-xs" v-if="item.value === 'teaTypes'">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="filters.teaTypes.black"
                    class="form-checkbox h-4 w-4 text-gray-600"
                  />
                  <span class="ml-2">Black Tea</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="filters.teaTypes.green"
                    class="form-checkbox h-4 w-4 text-gray-600"
                  />
                  <span class="ml-2">Green Tea</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="filters.teaTypes.oolong"
                    class="form-checkbox h-4 w-4 text-gray-600"
                  />
                  <span class="ml-2">Oolong Tea</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="filters.teaTypes.white"
                    class="form-checkbox h-4 w-4 text-gray-600"
                  />
                  <span class="ml-2">White Tea</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="filters.teaTypes.giftBox"
                    class="form-checkbox h-4 w-4 text-gray-600"
                  />
                  <span class="ml-2">Gift Box</span>
                </label>
              </div>
            <div     class="space-y-3 text-xs" v-else-if="item.value === 'teaFormats'"
              >
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="filters.teaFormats.looseLeaf"
                    class="form-checkbox h-4 w-4 text-gray-600"
                  />
                  <span class="ml-2">Loose Leaf</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="filters.teaFormats.teaBags"
                    class="form-checkbox h-4 w-4 text-gray-600"
                  />
                  <span class="ml-2">Tea Bags</span>
                </label>
                <!-- <label class="flex items-center">
                          <input type="checkbox" class="form-checkbox h-4 w-4 text-gray-600" />
                          <span class="ml-2">Powder</span>
                        </label>
                        <label class="flex items-center">
                          <input type="checkbox" class="form-checkbox h-4 w-4 text-gray-600" />
                          <span class="ml-2">Ready to Drink</span>
                        </label> -->
              </div>
            <div class="space-y-3 text-xs" v-else-if="item.value === 'priceRange'"
              >
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="filters.priceRange.under250"
                    class="form-checkbox h-4 w-4 text-gray-600"
                  />

                  <span class="ml-2">Under ৳250</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="filters.priceRange.over250"
                    class="form-checkbox h-4 w-4 text-gray-600"
                  />
                  <span class="ml-2">৳250 - ৳500</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="filters.priceRange.over500"
                    class="form-checkbox h-4 w-4 text-gray-600"
                  />
                  <span class="ml-2">৳500 - ৳1000</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="filters.priceRange.over1000"
                    class="form-checkbox h-4 w-4 text-gray-600"
                  />
                  <span class="ml-2">Over ৳1000</span>
                </label>
              </div>
            <div class="space-y-3 text-xs" v-else-if="item.value === 'origin'">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">China</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">India</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Japan</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Sri Lanka</span>
              </label>
            </div>

            <div class="space-y-4 text-xs" v-else-if="item.value === 'healthBenefits'">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Antioxidants</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Immune Support</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Digestive Health</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Stress Relief</span>
              </label>
            </div> 
            <div class="space-y-3 text-xs" v-else-if="item.value === 'timeOfDay'">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Morning</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Afternoon</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Evening</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Bedtime</span>
              </label>
            </div>
            <div class="space-y-3 text-xs" v-else-if="item.value === 'flavour'">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Floral</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Fruity</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Spicy</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Earthy</span>
              </label>
            </div> 
            <div class="space-y-3 text-xs" v-else-if="item.value === 'ingredients'">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Chamomile</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Lavender</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Peppermint</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Ginger</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Rooibos</span>
              </label>
            </div> 
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div
          class="w-full hidden sm:block sm:w-64 p-4 bg-white border-r border-gray-200"
        >
          <div class="mb-6">
            <h3 class="text-md font-bold mb-3">Tea Type</h3>
            <div class="space-y-3 text-xs">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="filters.teaTypes.black"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Black Tea</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="filters.teaTypes.green"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Green Tea</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="filters.teaTypes.oolong"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Oolong Tea</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="filters.teaTypes.white"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">White Tea</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="filters.teaTypes.giftBox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Gift Box</span>
              </label>
            </div>
          </div>
          <div class="mb-6">
            <h3 class="text-md font-bold mb-3">Tea Format</h3>
            <div class="space-y-3 text-xs">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="filters.teaFormats.looseLeaf"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Loose Leaf</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="filters.teaFormats.teaBags"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Tea Bags</span>
              </label>
              <!-- <label class="flex items-center">
                          <input type="checkbox" class="form-checkbox h-4 w-4 text-gray-600" />
                          <span class="ml-2">Powder</span>
                        </label>
                        <label class="flex items-center">
                          <input type="checkbox" class="form-checkbox h-4 w-4 text-gray-600" />
                          <span class="ml-2">Ready to Drink</span>
                        </label> -->
            </div>
          </div>

          <div class="mb-6">
            <h3 class="text-md font-bold mb-3">Price Range</h3>
            <div class="space-y-3 text-xs">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="filters.priceRange.under250"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />

                <span class="ml-2">Under ৳250</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="filters.priceRange.over250"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">৳250 - ৳500</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="filters.priceRange.over500"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">৳500 - ৳1000</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="filters.priceRange.over1000"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Over ৳1000</span>
              </label>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="text-md font-bold mb-3">Origin</h3>
            <div class="space-y-3 text-xs">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">China</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">India</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Japan</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Sri Lanka</span>
              </label>
            </div>
          </div>
          <div class="mb-6">
            <h3 class="text-md font-bold mb-3">Health Benefits</h3>
            <div class="space-y-4 text-xs">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Antioxidants</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Immune Support</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Digestive Health</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Stress Relief</span>
              </label>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="text-md font-bold mb-3">Time of Day</h3>
            <div class="space-y-3 text-xs">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Morning</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Afternoon</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Evening</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Bedtime</span>
              </label>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="text-md font-bold mb-3">Flavour</h3>
            <div class="space-y-3 text-xs">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Floral</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Fruity</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Spicy</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Earthy</span>
              </label>
            </div>
          </div>
          <div class="mb-6">
            <h3 class="text-md font-bold mb-3">Ingredients</h3>
            <div class="space-y-3 text-xs">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Chamomile</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Lavender</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Peppermint</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Ginger</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Rooibos</span>
              </label>
            </div>
          </div>

          <button
            class="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
      <div
        class="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-10 w-full h-auto bg-gray-100"
      >
        <ShopProductCardNew
          v-if="filteredProducts.length > 0"
          class="hover:border border-gray-700"
          v-for="product in filteredProducts"
          :key="product._id"
          :product="product"
        />
        <div v-else class="col-span-4">
          <div
            class="flex container my-auto justify-center mx-auto items-center"
          >
            <h1 class="w-full text-center text-gray-500 font-semibold text-xl">
              No Products Found
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Category, Product } from '~/types'

const route = useRoute()
const category = ref(<Category>{})
const products = ref<Product[]>([])
const showFilters = ref(false)
const filtered = ref(false)
const sortByValue = ref('')
const filters = ref({
  teaFormats: {
    looseLeaf: false,
    teaBags: false,
  },
  teaTypes: {
    black: false,
    green: false,
    white: false,
    oolong: false,
    giftBox: false,
    // herbal: false,
  },
  priceRange: {
    under250: false,
    over250: false,
    over500: false,
    over1000: false,
  },
})
const defaultValue = 'teaTypes'

const accordionItems = [
  {
    value: 'teaTypes',
    title: 'Tea Type',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    value: 'teaFormats',
    title: 'Tea Format',
    content:
      "Yes. It's unstyled by default, giving you freedom over the look and feel.",
  },
  {
    value: 'priceRange',
    title: 'Price Range',
    content: 'Yes! You can use the transition prop to configure the animation.',
  },
  {
    value: 'origin',
    title: 'Origin',
    content: 'Yes! You can use the transition prop to configure the animation.',
  },
  {
    value: 'timeOfDay',
    title: 'Time Of Day',
    content: 'Yes! You can use the transition prop to configure the animation.',
  },
  {
    value: 'healthBenefits',
    title: 'Health Benefits',
    content: 'Yes! You can use the transition prop to configure the animation.',
  },
  {
    value: 'ingredients',
    title: 'Ingredients',
    content: 'Yes! You can use the transition prop to configure the animation.',
  },
  {
    value: 'flavour',
    title: 'Flavour',
    content: 'Yes! You can use the transition prop to configure the animation.',
  },
]
// Replace the getProducts function and onMounted with useAsyncData
const getProducts = async () => {
  if (route.params.slug === 'all') {
    products.value = await $fetch<Product[]>('/api/products')
  } else {
    const response = await $fetch<{
      status: string
      data: { category: any; products: Product[] }
    }>('/api/categories/products?category=' + route.params.slug)
    products.value = response.data?.products
  }
}
const filteredProducts = computed(() => {
  let prod = <Product[]>[]
  if (
    Object.values(filters.value).every((category) =>
      Object.values(category).every((value) => value === false)
    )
  ) {
    prod = products.value
  }
  prod = products.value
  // Apply tea format filters
  if (filters.value.teaFormats.looseLeaf || filters.value.teaFormats.teaBags) {
    prod = prod.filter(
      (product) =>
        (filters.value.teaFormats.looseLeaf && product.format.match(/Loose/)) ||
        (filters.value.teaFormats.teaBags && product.format === 'Tea Bag')
    )
  }

  // Apply tea type filters
  if (
    filters.value.teaTypes.black ||
    filters.value.teaTypes.green ||
    filters.value.teaTypes.white ||
    filters.value.teaTypes.oolong ||
    filters.value.teaTypes.giftBox
  ) {
    prod = prod.filter(
      (product) =>
        (filters.value.teaTypes.black && product.category === 'Black Tea') ||
        (filters.value.teaTypes.green && product.category === 'Green Tea') ||
        (filters.value.teaTypes.white && product.category === 'White Tea') ||
        (filters.value.teaTypes.oolong && product.category === 'RROT') ||
        (filters.value.teaTypes.giftBox && product.category === 'Gift Box')
    )
  }

  // Apply price range filters
  if (
    filters.value.priceRange.under250 ||
    filters.value.priceRange.over250 ||
    filters.value.priceRange.over500 ||
    filters.value.priceRange.over1000
  ) {
    prod = prod.filter(
      (product) =>
        (filters.value.priceRange.under250 && product.price < 250) ||
        (filters.value.priceRange.over250 &&
          product.price >= 250 &&
          product.price < 500) ||
        (filters.value.priceRange.over500 &&
          product.price >= 500 &&
          product.price < 1000) ||
        (filters.value.priceRange.over1000 && product.price >= 1000)
    )
  }
  if (sortByValue.value === 'pricedown') {
    prod = prod.sort((a, b) => a.price - b.price)
  } else if (sortByValue.value === 'priceup') {
    prod = prod.sort((a, b) => b.price - a.price)
  } else if (sortByValue.value === 'namedown') {
    prod = prod.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortByValue.value === 'nameup') {
    prod = prod.sort((a, b) => b.name.localeCompare(a.name))
  } else if (sortByValue.value === 'typedown') {
    prod = prod.sort((a, b) => {
      const order: Record<string, number> = {
        'Black Tea': 1,
        'Green Tea': 2,
        'White Tea': 3,
        RROT: 4,
        'Gift Box': 5,
      }
      return (order[a.category] ?? 6) - (order[b.category] ?? 6)
    })
  } else if (sortByValue.value === 'typeup') {
    prod = prod.sort((a, b) => {
      const order: Record<string, number> = {
        'Black Tea': 5,
        'Green Tea': 4,
        'White Tea': 3,
        RROT: 2,
        'Gift Box': 1,
      }
      return (order[b.category] ?? 6) - (order[a.category] ?? 6)
    })
  }
  return [...new Set(prod)]
})
onMounted(() => {
  getProducts()
})
</script>
