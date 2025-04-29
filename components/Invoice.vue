<template>
  <div class="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
    <!-- Header -->
    <div class="text-center  mb-8">
      <img src="/assets/images/logo/Halda-Valley-Logo-03.png" alt="Company Logo" class="mx-auto  w-48" />
   
      <h1 class="text-2xl font-bold text-gray-800">Order Confirmation</h1>
      <p class="text-sm text-gray-500">Thank you for your purchase!</p>
    
    </div>

    <!-- Order Info -->
    <div class="mb-6 flex justify-between items-baseline">
     
      <div class="flex flex-col justify-between text-sm text-gray-600">
        <span class="font-bold text-gray-400 underline underline-offset-2">Issued To:</span>
        <p class="font-medium  text-gray-800">Name : {{ store.invoice.name }}</p>
        <span class="font-medium text-gray-800">Phone : {{store.invoice.phone }}</span>
        <span class="font-medium text-gray-800">Email : {{ store.invoice.email }}</span>
        <span class="font-medium text-gray-800">Address :{{ store.invoice.address }}</span>
        <span class="font-medium text-gray-800">Shipping Address :{{ store.invoice.shippingAddress }}</span>

      </div>
       <div class="flex flex-col justify-between text-sm text-gray-600 mb-2">
        <span class="font-bold text-gray-400 underline underline-offset-2">Order Details</span>
        <span class="font-medium text-gray-800">Order No : {{ store.invoice.id }}</span>
     
        <span class="font-medium text-gray-800">Order Date:{{ moment(store.invoice.created_at).format('DD-MM-YYYY') }}</span>
        <span class="font-medium text-gray-800">Payment Method :{{ store.invoice.paymentMethod }}</span>
      </div>
    </div>

    <!-- Products -->
       <h1>Description</h1>
    <div class="mb-6 border-t border-gray-200 pt-4">
    
      <div v-for="item in store.invoice.items" :key="item.product_id" class="flex justify-between mb-3">
        <div>
          <p class="font-medium text-gray-700">{{ item.name }}</p>
          <p class="text-xs text-gray-400">Qty: {{ item.quantity }}</p>
        </div>
        <p class="font-medium text-gray-700">৳ {{ (item.price * item.quantity).toFixed(2) }}</p>
      </div>
    </div>

    <!-- Totals -->
    <div class="border-t border-gray-200 pt-4">
      <div class="flex justify-between mb-2">
        <span class="text-sm text-gray-600">Subtotal</span>
        <span class="text-sm font-medium text-gray-800">৳ {{ store.invoice.subtotal.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between mb-2">
        <span class="text-sm text-gray-600">Shipping Charge </span>
        <span class="text-sm font-medium text-gray-800">৳ {{ store.invoice.shippingCost.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between text-lg font-bold text-gray-800 mt-4">
        <span>Total</span>
        <span>৳ {{ store.invoice.total.toFixed(2) }}</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="text-center text-xs text-gray-400 mt-8">
      If you have any questions, contact us at <a href="mailto:esales@haldavalley.com" class="underline">esales@haldavalley.com</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'
const store = useMyCartStore()
const order = {
  id: 'ORD-10023',
  date: new Date(),
  customer: 'John Doe',
  customer_phone: '123-456-7890',
  customer_email: 'john.doe@example.com',
  customer_address: '123 Main St, Anytown, USA',
  items: [
    { id: 1, name: 'Wireless Earbuds', quantity: 1, price: 99.99 },
    { id: 2, name: 'Smart Watch', quantity: 2, price: 149.99 },
    { id: 3, name: 'Smart Watch', quantity: 2, price: 149.99 },
    { id: 4, name: 'Smart Watch', quantity: 2, price: 149.99 },
  ],
}

const subtotal = computed(() => {
  return order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
})

const tax = computed(() => {
  return subtotal.value * 0.05
})

const total = computed(() => {
  return subtotal.value + tax.value
})

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date)
}
</script>
