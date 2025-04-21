<template>
  <div class="border-t  border-t-gray-200 mt-1">
   
    <div class="overflow-hidden ">
      <div class="h-[300px] sm:h-[400px] md:h-[500px] w-full bg-[url('/assets/images/home/bg-discover.jpg')] flex px-20 justify-start items-center bg-cover bg-fixed top-0  overflow-x-hidden ">
        <div>
           <h1 class="text-5xl text-white font-bold">Lose yourself in our
          <br>
          world of tea
        </h1>
        <div class="flex gap-2">
         <nuxt-link to="/shop/all"><Button variant="outline">Shop all teas</Button></nuxt-link> 
        <Button>Shop top selling teas</Button>
        </div>
        </div>
       
        
      </div>
    </div>
    <!-- <products-grid :products="products" /> -->
     <ShopTeaTypes class="bg-gray-100 "/>
     <div class="flex flex-col gap-2 py-10 justify-center items-center">
      <h1 class="text-4xl font-semibold py-3">Shop by tea format</h1>
      <div class="flex gap-2 justify-center items-center">
        <div class="flex w-52 px-3 py-2 justify-center items-center gap-2 border rounded-md bg-transparent border-gray-500 hover:bg-black hover:text-white">Loose leaf <UIcon name="fluent:leaf-two-48-regular" /></div>
        <div class="flex w-52 px-3 py-2 justify-center items-center gap-2 border rounded-md bg-transparent border-gray-500 hover:bg-black hover:text-white">Tea bags <UIcon name="fluent:leaf-two-48-regular" /></div>
        <div class="flex w-52 px-3 py-2 justify-center items-center gap-2 border rounded-md bg-transparent border-gray-500 hover:bg-black hover:text-white">Refills <UIcon name="fluent:leaf-two-48-regular" /></div>
        <div class="flex w-52 px-3 py-2 justify-center items-center gap-2 border rounded-md bg-transparent border-gray-500 hover:bg-black hover:text-white">Tins<UIcon name="fluent:leaf-two-48-regular" /></div>
        <div class="flex w-52 px-3 py-2 justify-center items-center gap-2 border rounded-md bg-transparent border-gray-500 hover:bg-black hover:text-white">Selectin packs<UIcon name="fluent:leaf-two-48-regular" /></div>
       

       
      </div>
      <div class="grid grid-cols-3 gap-6 px-14 py-10">
        <div class="space-y-5">
          <img src="/assets/images/home/DWGT.jpg" alt="" class="w-full rounded-md h-[80%]">
          <h1 class="text-xl font-semibold">Best Sellers</h1>
          <p>
            Introducing our best-selling teas, including our signature
          </p>
        </div>
        <div class="space-y-5">
          <img src="/assets/images/home/DWGT.jpg" alt="" class="w-full rounded-md h-[80%]">
          <h1 class="text-xl font-semibold">Best Sellers</h1>
          <p>
            Introducing our best-selling teas, including our signature
          </p>
        </div>
        <div class="space-y-5">
          <img src="/assets/images/home/DWGT.jpg" alt="" class="w-full rounded-md h-[80%]">
          <h1 class="text-xl font-semibold">Best Sellers</h1>
          <p>
            Introducing our best-selling teas, including our signature
          </p>
        </div>
      </div>
     </div>
  </div>
</template>

<script lang="ts" setup>
interface Product {
  id: number
  name: string
  price: number
  img: string
}

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
