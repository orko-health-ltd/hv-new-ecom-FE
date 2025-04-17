<template>
  <div>
    <div class="flex gap-2 px-10 py-2 pt-8">
        <nuxt-link to="/shop" > Shop</nuxt-link>
      \
      <p>{{ route?.params.slug }} \</p>
    </div>

    <div class="flex px-10 py-3 gap-2 flex-col justify-start items-start">
      <h1 class="text-4xl text-gray-700 font-semibold">
        {{
          Array.isArray(route?.params.slug)
            ? route.params.slug[0].replace(/-/g, ' ').charAt(0).toUpperCase() +
              route.params.slug[0].replace(/-/g, ' ').slice(1)
            : route?.params.slug.replace(/-/g, ' ').charAt(0).toUpperCase() +
              route?.params.slug.replace(/-/g, ' ').slice(1)
        }}
      </h1>
      <div class="flex w-full justify-between items-center">
        <p class="w-1/2 text-sm">
          Famous yet humble, our tea is a true reflection of the land it comes
          from.Drinking tea is an act of mindfulness. It’s a moment to slow
          down, take a breath and enjoy the moment.
        </p>
        <div class="flex justify-center items-center gap-4">
          <div @click="showFilters = !showFilters" class="flex gap-1 items-center">
            <UIcon name="mage:filter" class="text-xl" />
            <p class="font-semibold" >{{showFilters ?'Hide Filters' : 'Show Filters'}}</p>
          </div>
          <div class="flex gap-1 items-center">
            <UIcon name="lets-icons:sort-list" class="text-2xl" />
            <p class="font-semibold">Sort By</p>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <!-- <products-grid :products="products" /> -->
    <div class="flex justify-between items-baseline">
      <div v-if="showFilters" class="px-10 text-gray-700 py-10">
        <div>
          <h1 class="text-xl font-semibold">Filters</h1>
        </div>
        <div class="w-64 p-4 bg-white border-r  border-gray-200">
          <div class="mb-6">
                      <h3 class="text-md font-bold mb-3">Tea Format</h3>
                      <div class="space-y-3 text-xs">
                        <label class="flex items-center">
                          <input type="checkbox" class="form-checkbox h-4 w-4 text-gray-600" />
                          <span class="ml-2">Loose Leaf</span>
                        </label>
                        <label class="flex items-center">
                          <input type="checkbox" class="form-checkbox h-4 w-4 text-gray-600" />
                          <span class="ml-2">Tea Bags</span>
                        </label>
                        <label class="flex items-center">
                          <input type="checkbox" class="form-checkbox h-4 w-4 text-gray-600" />
                          <span class="ml-2">Powder</span>
                        </label>
                        <label class="flex items-center">
                          <input type="checkbox" class="form-checkbox h-4 w-4 text-gray-600" />
                          <span class="ml-2">Ready to Drink</span>
                        </label>
                      </div>
                    </div>
          
          <div class="mb-6">
            <h3 class="text-md font-bold mb-3">Price Range</h3>
            <div class="space-y-3 text-xs">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Under $25</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">$25 - $50</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">$50 - $100</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Over $100</span>
              </label>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="text-md font-bold mb-3">Tea Type</h3>
            <div class="space-y-3 text-xs">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Black Tea</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Green Tea</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Oolong Tea</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">White Tea</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-gray-600"
                />
                <span class="ml-2">Herbal Tea</span>
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
      <div class="grid gap-5 grid-cols-4 p-10 h-auto bg-gray-100">
        <ShopProductCardNew
          class="hover:border border-gray-700"
          v-for="product in products"
          :key="product._id"
          :product="product"
        />
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
// Replace the getProducts function and onMounted with useAsyncData
const { data: responseData } = await useAsyncData('products', () =>
  $fetch<{ status: string, data: { category: any, products: Product[] } }>('/api/categories/products?category=' + route.params.slug)
)
watchEffect(() => {
  if (responseData.value) {
    products.value = responseData.value.data?.products
  }
})
</script>
