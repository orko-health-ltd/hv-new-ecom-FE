<template>
  <div>
    <div class="overflow-hidden">

   
      <div class="h-[300px] sm:h-[400px] md:h-[500px] w-full bg-[url('/assets/images/home/bg-discover.jpg')] bg-cover bg-fixed top-0  overflow-x-hidden animate-breathout">

     
      </div>
    </div>
    <products-grid :products="products" />
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

const getProducts = async () => {
  const { data } = await useFetch<Product[]>('/api/products')
  products.value = data.value || []
}
onMounted(() => {
  getProducts()
})
</script>



<style>

</style>
