<template>
  <div class="billing-container">
      <Collapsible v-model:open="isOpen" class="block sm:hidden bg-gray-100 p-3">
    <CollapsibleTrigger class="w-full flex justify-between items-center"> 
      <h2 class="text-xl font-semibold">Order Summary </h2>
      <div class="flex gap-2 items-center">
           <span class="text-xl font-semibold">৳ {{ cartStore.subtotal }}</span>
          
         <UIcon v-if="!isOpen" class="text-xl" name="material-symbols:keyboard-arrow-down-rounded" />
         <UIcon v-else class="text-xl" name="material-symbols:keyboard-arrow-up-rounded" />
      </div>
   
    </CollapsibleTrigger>
    <CollapsibleContent>
      <section class="shadow-lg p-4 mt-10 rounded-lg mb-4">
       
        <div class="products-list">
          <div
            v-for="(item, index) in cartStore.cart"
            :key="index"
            class="product-item"
          >
            <NuxtImg
              format="webp"
              :src="`/halda/${item.product.front_image}`"
              :alt="item.product.name"
            />
            <div class="flex gap-4 justify-between w-full">
              <div class="product-details">
                <h3>{{ item.product.name }}</h3>
                <p>Quantity: {{ item.quantity }}</p>
              </div>
              <p class="text-nowrap font-semibold">৳ {{ item.price }}</p>
            </div>
          </div>
        </div>
        <div class="total-section">
          <div class="subtotal">
            <span>Subtotal</span>
            <span>৳ {{ cartStore.total }}</span>
          </div>
          <div class="shipping">
            <span>Shipping</span>
            <span>৳ {{ shippingCost }}</span>
          </div>
           <p v-if="cartStore.total < 1000" class="text-xs flex justify-start items-center text-amber-500">Shop above 1000tk to get free delivery</p>
          <p v-else class="text-xs flex justify-start items-center text-green-500">
            <UIcon name="material-symbols:check-circle-outline" />
           Great, you are eligible for free delivery</p>
          <!-- <div class="tax">
<span>Tax</span>
<span>{{ cartStore.tax }}</span>
</div> -->
          <div class="total">
            <span>Total</span>
            <span>৳ {{ cartStore.subtotal }}</span>
          </div>
        </div>
      </section>
    </CollapsibleContent>
  </Collapsible>
    <Invoice v-if="success" :invoice="cartStore.invoice" />
    <div v-else class="billing-form p-5 sm:p-10 grid pt-16 gap-5 grid-cols-2 sm:grid-cols-3">
      <div class="col-span-2">
        <div class="flex flex-col justify-center items-center ">
          <img
            class="w-32 h-30 object-cover"
            src="/assets/images/logo/golden_logo.png"
            alt=""
          />
          <h1 class="text-3xl font-semibold">Billing & Payment Info</h1>
        </div>
        <!-- Customer Information -->

        <form @submit.prevent="pay">
          <section class="shadow-lg p-4 rounded-lg mb-4">
            <div class="info-form">
              <h2>Customer & Billing Information</h2>

              <div class="form-group">
                <Input
                  required
                  type="text"
                  v-model="customerInfo.firstName"
                  placeholder="First Name"
                />
                <Input
                  required
                  type="text"
                  v-model="customerInfo.lastName"
                  placeholder="Last Name"
                />
              </div>
              <div class="form-group">
                <Input
                  required
                  type="email"
                  v-model="customerInfo.email"
                  placeholder="Email"
                />
                <Input
                  required
                  type="tel"
                  v-model="customerInfo.phone"
                  placeholder="Phone"
                />
              </div>
              <div class="form-group">
                <Textarea
                  v-model="customerInfo.address"
                  placeholder="Address"
                ></Textarea>
              </div>
              <div class="form-group">
                <Select required v-model="customerInfo.country">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectLabel>Countries</SelectLabel>
                    <SelectItem
                      v-for="country in countries"
                      :value="country.value"
                      :key="country.label"
                    >
                      {{ country.label }}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select required v-model="customerInfo.city">
                  <SelectTrigger>
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectLabel>Cities</SelectLabel>
                    <SelectItem
                      v-for="division in divisions"
                      :value="division.name"
                      :key="division.id"
                    >
                      {{ division.name }}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  required
                  v-model="customerInfo.district"
                 
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectLabel>Districts</SelectLabel>
                    <SelectItem
                      v-for="district in districts"
                      :value="district.name"
                      :key="district.id"
                    >
                      {{ district.name }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div class="form-group">
                <Input
                  required
                  type="text"
                  v-model="customerInfo.contactPerson"
                  placeholder="Contact Person Name"
                />
                <Input
                  required
                  type="tel"
                  v-model="customerInfo.contactPersonPhone"
                  placeholder="Contact Person Phone"
                />
              </div>
              <div class="form-group">
                <Textarea
                  v-model="customerInfo.note"
                  placeholder="Delivery Note"
                ></Textarea>
              </div>
            </div>
          </section>

          <!-- Payment Methods -->
          <section class="shadow-lg p-4 rounded-lg mb-4">
            <h2>Payment Method</h2>
            <div class="payment-options">
              <div
                class="payment-option"
                :class="{ active: selectedPayment === 'online_payment' }"
                @click="selectedPayment = 'online_payment'"
              >
                <i class="fas fa-credit-card"></i>
                <span>Online Payment</span>
              </div>

              <div
                v-if="customerInfo.district == 'Dhaka'"
                class="payment-option"
                :class="{ active: selectedPayment === 'cod' }"
                @click="selectedPayment = 'cod'"
              >
                <i class="fab fa-paypal"></i>
                <span>Cash on delivery</span>
              </div>
            </div>
            <div class="card-details" v-if="selectedPayment === 'card'">
              <input
                type="text"
                v-model="cardInfo.number"
                placeholder="Card Number"
              />
              <input
                type="text"
                v-model="cardInfo.name"
                placeholder="Cardholder Name"
              />
              <input
                type="text"
                v-model="cardInfo.expiry"
                placeholder="MM/YY"
              />
              <input type="text" v-model="cardInfo.cvv" placeholder="CVV" />
            </div>
          </section>

          <!-- <button class="checkout-button" @click="processCheckout">Complete Purchase</button> -->
          <Button
            v-if="cartStore.cart.length > 0"
            class="checkout-button py-4 h-11 flex items-center justify-center gap-4"
            :disabled="loading"
          >
            <UIcon v-if="loading" name="svg-spinners:6-dots-rotate" /> Complete
            Purchase</Button
          >
        </form>
      </div>
      <!-- Order Summary -->
      <section class="shadow-lg hidden sm:block p-4 mt-10 rounded-lg mb-4">
        <h2>Order Summary</h2>
        <div class="products-list">
          <div
            v-for="(item, index) in cartStore.cart"
            :key="index"
            class="product-item"
          >
            <NuxtImg
              format="webp"
              :src="`/halda/${item.product.front_image}`"
              :alt="item.product.name"
            />
            <div class="flex gap-4 justify-between w-full">
              <div class="product-details">
                <h3>{{ item.product.name }}</h3>
                <p>Quantity: {{ item.quantity }}</p>
              </div>
              <p class="text-nowrap font-semibold">৳ {{ item.price }}</p>
            </div>
          </div>
        </div>
        <div class="total-section">
          <div class="subtotal">
            <span>Subtotal</span>
            <span>৳ {{ cartStore.total }}</span>
          </div>
          <div class="discounts">
            <span>Discounts</span>
            <span>৳ {{ discount }}</span>
          </div>
          <div class="shipping">
            <span>Shipping</span>
            <span class="">৳{{ shippingCost }} </span>
          </div>
          <p v-if="cartStore.total < 1000" class="text-xs flex justify-start items-center text-amber-500">Shop above 1000tk to get free delivery</p>
          <p v-else class="text-xs flex justify-start items-center text-green-500">
            <UIcon name="material-symbols:check-circle-outline" />
           Great, you are eligible for free delivery</p>
          <!-- <div class="tax">
<span>Tax</span>
<span>{{ cartStore.tax }}</span>
</div> -->
          <div class="total">
            <span>Total</span>
            <span>৳ {{ cartStore.subtotal - discount }}</span>
          </div>
        </div>
      </section>
    </div>
    <Dialog v-model:open="openOrder" class="max-w-lg">
      <DialogContent
        class="flex flex-col items-center overflow-y-scroll justify-center"
      >
        <UIcon
          name="material-symbols-light:check-circle-outline"
          class="h-16 w-16 text-green-500"
        />
        <h1 class="text-xl font-semibold">Your order is confirmed!</h1>
        <p>
          Your order
          <span class="font-bold">#{{ route.query.order_id }}</span> will be
          processed within 2-5 working days. We will notify you by email once
          your order has been shipped.
        </p>
        <Separator />
        <div class="flex gap-5 justify-between items center">
          <nuxt-link :to="`/track-order?id=${route.query.order_id}`">
            <Button class="text-white">Track your order </Button>
          </nuxt-link>
          <nuxt-link to="/shop"
            ><Button variant="outline">Return to shopping</Button></nuxt-link
          >
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { Dialog, DialogContent } from '@/components/ui/dialog'
import division from '@/divisions.json'
import type { Order } from '~/types'
const cartStore = useMyCartStore()
const paymentUrl = ref('')
const route = useRoute()
const toast = useToast()
const loading = ref(false)
const openOrder = ref(false)
const success = ref(false)
const customerInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: '',
  district: '',
  contactPerson: '',
  contactPersonPhone: '',
  note: '',
})
const divisions = division.divisions
const shippingCost = computed(() => {
 customerInfo.value.district == 'Dhaka'
    ? (cartStore.shippingMethod = 60)
    : (cartStore.shippingMethod = 120)
    if(cartStore.subtotal >=1000){
      cartStore.shippingMethod = 0
    }
  cartStore.calculateSubtotal()
  return cartStore.shippingMethod
})
const districts = computed(() => {
  let id = divisions.find((e) => e.name == customerInfo.value.city)?.id

  return division.districts.filter((e) => e.division_id == id)
})
const selectedPayment = ref('online_payment')
const isOpen = ref(false)
const cardInfo = ref({
  number: '',
  name: '',
  expiry: '',
  cvv: '',
})
const countries = ref([
  {
    label: 'Banglaadesh',
    value: 'Banglaadesh',
  },
])

// const handleCityUpdate = () => {
//   customerInfo.value.district == 'Dhaka'
//     ? (cartStore.shippingMethod = 60)
//     : (cartStore.shippingMethod = 120)
//     if(cartStore.subtotal >=1000){
//       cartStore.shippingMethod = 0
//     }
//   cartStore.calculateSubtotal()
// }
const processCheckout = async () => {
  // Implement checkout logic here
  let form = {
    customerInfo: {
      first_name: customerInfo.value.firstName,
      last_name: customerInfo.value.lastName,
      email: customerInfo.value.email,
      phone: customerInfo.value.phone,
      address: customerInfo.value.address,
    },
    paymentMethod: selectedPayment.value,
    subTotal: cartStore.total,
    shippingcost: cartStore.shippingMethod,
    products: cartStore.cart.map((item) => ({
      product_id: item.id,
      product_name : item.product.name,
      quantity: item.quantity,
      price: item.price,
    })),
    discount : discount.value,
    totalAmount: cartStore.subtotal - discount.value,
    shippingAddress: {
      street: customerInfo.value.address,
      city: customerInfo.value.city,
      district: customerInfo.value.district,
      country: customerInfo.value.country,
    },
    note: customerInfo.value.note,
    contactPerson: {
      name: customerInfo.value.contactPerson,
      phone: customerInfo.value.contactPersonPhone,
    },
  }
  const { order, status } = await $fetch<{ order: Order; status: string }>(
    '/api/checkout',
    {
      method: 'POST',
      body: form,
    }
  )
  console.log(order, status)
  if (status == 'success') {
    setTimeout(() => {
      route.query.order_id = order.order_id
      toast.add({
        title: 'Order Placed Successfully.',
        color: 'green',
        timeout: 1500,
      })
      cartStore.invoice.id = order.order_id
      openOrder.value = true
      success.value = true
      loading.value = false
      cartStore.clearCart()
    }, 3000)
  }
}
// const postData = ref('')

const pay = async () => {
  if (cartStore.cart.length == 0) {
    toast.add({ title: 'Cart is empty.', color: 'red', timeout: 1500 })
    return
  }
  loading.value = true
  cartStore.invoice.name =
    customerInfo.value.firstName + ' ' + customerInfo.value.lastName
  cartStore.invoice.email = customerInfo.value.email
  cartStore.invoice.phone = customerInfo.value.phone
  cartStore.invoice.address = customerInfo.value.address
  cartStore.invoice.city = customerInfo.value.city
  cartStore.invoice.district = customerInfo.value.district
  cartStore.invoice.country = customerInfo.value.country
  cartStore.invoice.contactPerson = customerInfo.value.contactPerson
  cartStore.invoice.contactPersonPhone = customerInfo.value.contactPersonPhone
  cartStore.invoice.note = customerInfo.value.note
  cartStore.invoice.paymentMethod = selectedPayment.value
  cartStore.invoice.paymentStatus = 'pending'
  cartStore.invoice.shippingCost = cartStore.shippingMethod
  ;(cartStore.invoice.shippingAddress =
    customerInfo.value.address +
    ' , ' +
    customerInfo.value.city +
    ' , ' +
    customerInfo.value.district +
    ' , ' +
    customerInfo.value.country),
    (cartStore.invoice.total = cartStore.subtotal - discount.value )
    cartStore.invoice.discount = discount.value
  cartStore.invoice.subtotal = cartStore.total
  cartStore.invoice.created_at = new Date().toISOString()
  cartStore.invoice.items = cartStore.cart.map((item) => ({
    product_id: item.id,
    name: item.product.name,
    quantity: item.quantity,
    price: item.price,
  }))

  if (selectedPayment.value == 'cod') {
    processCheckout()
    return
  }

  let form = {
    customerInfo: {
      first_name: customerInfo.value.firstName,
      last_name: customerInfo.value.lastName,
      email: customerInfo.value.email,
      phone: customerInfo.value.phone,
      address: customerInfo.value.address,
    },
    paymentMethod: selectedPayment.value,
    subTotal: cartStore.total,
    shippingcost: cartStore.shippingMethod,
    products: cartStore.cart.map((item) => ({
      product_id: item.id,
      product_name : item.product.name,
      quantity: item.quantity,
      price: item.price,
    })),
    totalAmount: cartStore.subtotal - discount.value,
    shippingAddress: {
      street: customerInfo.value.address,
      city: customerInfo.value.city,
      district: customerInfo.value.district,
      country: customerInfo.value.country,
    },
    note: customerInfo.value.note,
    contactPerson: {
      name: customerInfo.value.contactPerson,
      phone: customerInfo.value.contactPersonPhone,
    },
  }
  try{
    
  const response = await $fetch<{ status: string; payment_url?: string }>(
    '/api/payment/initiate',
    {
      method: 'POST',
      body: {
        amount: cartStore.subtotal - discount.value,
        discount : discount.value,
        customer_name:
          customerInfo.value.firstName + ' ' + customerInfo.value.lastName,
        customer_email: customerInfo.value.email,
        customer_phone: customerInfo.value.phone,
        customer_address: customerInfo.value.address,
        customer_city: customerInfo.value.city,
        customer_country: customerInfo.value.country,
        customer_state: customerInfo.value.district,
        num_of_items: cartStore.cart.length,
        cart: cartStore.cart,
        product_name: cartStore.cart.map((item) => item.product.name).join(','),
        product_category: 'Tea',
        product_profile: 'general',
        order_data: form,
      },
    }
  )

  if (response.status === 'success' && response.payment_url) {
    paymentUrl.value = response.payment_url
    window.location.href = paymentUrl.value // openPayment.value = true
  }
    loading.value = false
  }
  catch (error)
  {
    toast.add({ title: 'Payment failed.', color: 'red', timeout: 1500 })
  loading.value = false
}

}
const discount = computed(() => {
  let price = 0
  cartStore.cart.forEach((item) => {
    if (item.product.discount) {
      if (item.product?.discount && item.product?.discount > 0 && item.product?.price) {
    if (item.product.discount_unit === 'percentage') {
      
      price += ((item.product.price * item.product.discount) / 100) * item.quantity
    }
    else {
      price +=  (item.product.discount) * item.quantity
    }
  }
  else {
    price +=  0
  }
    }
  })
  return price
})
onMounted(async () => {
  if (route.query.success == 'true' && route.query.order_id) {
    {
      const response = await $fetch<{ data: any; status: string; error: any }>(
        '/api/order/' + route.query.order_id
      )

      if (response.status == 'success') {
        cartStore.invoice.id = route.query.order_id as string
        cartStore.invoice.paymentStatus = 'paid'
        cartStore.clearCart()
        console.log(cartStore.cart)
        toast.add({
          title: 'Order Placed Successfully.',
          color: 'green',
          timeout: 1500,
        })
        success.value = true
        openOrder.value = true
      }
    }
  }
})
definePageMeta({
  ssr: false,
})
</script>

<style>
.billing-container {
  max-width: 1200px;
  margin: 0 auto;
  /* padding: 2rem; */
}

.billing-title {
  text-align: center;
  margin-bottom: 2rem;
}

.form-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

input {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
}

.payment-options {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.payment-option {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.payment-option.active {
  border-color: #4caf50;
  background: #f0f9f0;
}

.card-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.products-list {
  margin-bottom: 1.5rem;
}

.product-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.product-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.total-section > div {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
}

.total {
  font-weight: bold;
  font-size: 1.2rem;
  border-top: 2px solid #eee;
  margin-top: 1rem;
  padding-top: 1rem;
}

.checkout-button {
  width: 100%;
  padding: 1rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.checkout-button:hover {
  background: #45a049;
}
</style>
