<template>
 <div class="container mx-auto px-4">
  <div class="flex flex-col sm:flex-row shadow-md">
    <div class="w-full sm:w-3/4 bg-white px-4 sm:px-10 py-10">
      <div class="flex flex-col sm:flex-row justify-between border-b pb-8">
        <h1 class="font-semibold text-xl sm:text-2xl mb-4 sm:mb-0">Shopping Cart</h1>
        <h2 class="font-semibold text-xl sm:text-2xl">{{ cartStore.cart.length }} Items</h2>
      </div>
      <div v-for="(item, index) in cartStore.cart" :key="index" class="flex flex-col md:flex-row items-stretch py-8 md:py-10 lg:py-8 border-t border-gray-50">
        <div class="w-full md:w-4/12 2xl:w-1/4">
          <img :src="$config.public.apiBase+'/'+item.product.front_image" :alt="item.product.name" class="w-full h-64 md:h-full object-cover object-center" />
        </div>
        <div class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center mt-4 md:mt-0">
          <p class="text-xs leading-3 text-gray-800">{{ item.product.name }}</p>
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full">
            <p class="text-base font-black leading-none text-gray-800 mb-2 sm:mb-0">{{ item.product.name }}</p>
          </div>
          <p class="text-xs leading-3 text-gray-600 pt-2">weight: {{ item.id }}</p>
          <p class="text-xs leading-3 text-gray-600 py-4">Color: {{ item.id }}</p>
          <p class="w-full sm:w-96 text-xs leading-3 text-gray-600">{{ item.product.category }}</p>
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-5">
            <div class="flex items-center mb-2 sm:mb-0">
              <p @click="cartStore.removeFromCart(item)" class="text-xs leading-3 underline text-red-500 cursor-pointer">Remove</p>
            </div>
            <p class="text-base font-black leading-none text-gray-800">${{ item.price }}</p>
          </div>
        </div>
      </div>

      <nuxt-link to="/shop" class="flex font-semibold text-indigo-600 text-sm mt-10">
        <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
          <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
        </svg>
        Continue Shopping
      </nuxt-link>
    </div>
    <div id="summary" class="w-full sm:w-1/4 px-4 sm:px-8 py-10 mt-4 sm:mt-0">
      <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
      <div class="flex justify-between mt-10 mb-5">
        <span class="font-semibold text-sm uppercase">Items {{ cartStore.cart.length }}</span>
        <span class="font-semibold text-sm">${{ cartStore.subtotal }}</span>
      </div>
      <div>
        <label class="font-medium inline-block mb-3 text-sm uppercase">
          Shipping
        </label>
        <select v-model="cartStore.shippingMethod" class="block p-2 text-gray-600 w-full text-sm">
          <option v-for="method in cartStore.shippingMethods" :key="method.id" :value="method.price">{{ method.name }} - ${{ method.price }}</option>
        </select>
      </div>
      <div class="py-10">
        <label for="promo" class="font-semibold inline-block mb-3 text-sm uppercase">
          Promo Code
        </label>
        <input v-model="cartStore.promoCode" type="text" id="promo" placeholder="Enter your code" class="p-2 text-sm w-full" />
      </div>
      <button @click="cartStore.applyPromo" class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase w-full">
        Apply
      </button>
      <div class="border-t mt-8">
        <div class="flex font-semibold justify-between py-6 text-sm uppercase">
          <span>Total cost</span>
          <span>${{ cartStore.total }}</span>
        </div>
        <button @click="cartStore.checkout" class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
          Checkout
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
const cartStore = useMyCartStore()
</script>

<style>
</style>