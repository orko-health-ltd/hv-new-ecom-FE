<template>
  <div>
 <div class="flex gap-2 px-10 py-2 pt-8">
  <p>Shop</p> \ <p>{{route?.params.slug}} \</p>
 </div>
 
 
 <div class="flex px-10 py-3 gap-2 flex-col justify-start items-start ">
  <h1 class="text-4xl font-semibold">{{ Array.isArray(route?.params.slug) ? route.params.slug[0].replace(/-/g, ' ').charAt(0).toUpperCase() + route.params.slug[0].replace(/-/g, ' ').slice(1) : route?.params.slug.replace(/-/g, ' ').charAt(0).toUpperCase() + route?.params.slug.replace(/-/g, ' ').slice(1) }}</h1>
  <div class="flex w-full justify-between items-center">

  <p class="w-1/2 text-sm">
   Famous yet humble, our tea is a true reflection of the land it comes from.Drinking tea is an act of mindfulness. It’s a moment to slow down, take a breath and enjoy the moment.
  </p>
  <div class="flex justify-center items-center gap-4">
  <div class="flex gap-1 items-center">
    <UIcon name="mage:filter" class="text-xl" />
    <p class="font-semibold"> Show Filters </p>
  </div>
  <div class="flex gap-1 items-center">
    <UIcon name="lets-icons:sort-list" class="text-2xl" />
    <p class="font-semibold"> Sort By </p>
  </div>
 </div>
 </div>
 
 </div>
 <hr>
    <!-- <products-grid :products="products" /> -->
    <div class="grid gap-5 grid-cols-4 p-10">
      <ShopProductCardNew class="hover:border border-gray-700" v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Product {
  id: number
  name: string
  price: number
  img: string
  category: string
}

const route = useRoute()

const products = ref<Product[]>([])

// Replace the getProducts function and onMounted with useAsyncData
const { data: productData } = await useAsyncData('products', () => 
  $fetch<Product[]>('/api/products')
)

watchEffect(() => {
  if (productData.value) {
    products.value = productData.value
  }
})
</script>
