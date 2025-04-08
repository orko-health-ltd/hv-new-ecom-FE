<template>

  <div class="billing-container">
    <div class="flex flex-col justify-center items-center pt-20">
    <img class="w-32 h-30 object-cover" src="/assets/images/logo/golden_logo.png" alt="">
     <h1 class="text-3xl font-semibold">Billing & Payment Info</h1></div>
    <!-- Customer Information -->
    <section class="shadow-lg p-4 rounded-lg mb-4">
      <h2>Customer & Billing Information</h2>
      <form class="info-form">
        <div class="form-group">
          <Input type="text" v-model="customerInfo.firstName" placeholder="First Name" />
          <Input type="text" v-model="customerInfo.lastName" placeholder="Last Name" />
        </div>
        <div class="form-group">
          <Input type="email" v-model="customerInfo.email" placeholder="Email" />
          <Input type="tel" v-model="customerInfo.phone" placeholder="Phone" />
        </div>
        <div class="form-group">
          <Textarea v-model="customerInfo.address" placeholder="Address"></Textarea>
          </div>
          <div class="form-group">
           <Select v-model="customerInfo.country">
            <SelectTrigger>
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
             
                <SelectLabel>Countries</SelectLabel>
                <SelectItem v-for="country in countries" :value="country.value" :key="country.label">
                  {{ country.label }}
                </SelectItem>
              
            </SelectContent>
          </Select >
           <Select v-model="customerInfo.city" @update:model-value="handleCityUpdate()">
            <SelectTrigger>
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
             
                <SelectLabel>Cities</SelectLabel>
                <SelectItem v-for="division in divisions" :value="division.name" :key="division.id">
                  {{ division.name }}
                </SelectItem>
              
            </SelectContent>
          </Select>
           <Select v-model="customerInfo.district">
            <SelectTrigger>
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent>
             
                <SelectLabel>Districts</SelectLabel>
                <SelectItem v-for="district in districts" :value="district.name" :key="district.id">
                  {{ district.name }}
                </SelectItem>
              
            </SelectContent>
          </Select>
          </div>
          <div class="form-group">
          <Input type="text" v-model="customerInfo.contactPerson" placeholder="Contact Person Name" />
          <Input type="tel" v-model="customerInfo.contactPersonPhone" placeholder="Contact Person Phone" />
        </div>
         <div class="form-group">
          <Textarea v-model="customerInfo.note" placeholder="Delivery Note"></Textarea>
          </div>
      </form>
    </section>

    <!-- Payment Methods -->
    <section class="shadow-lg p-4 rounded-lg mb-4">
      <h2>Payment Method</h2>
      <div class="payment-options">
        <div class="payment-option" :class="{ active: selectedPayment === 'debit_card' }" @click="selectedPayment = 'debit_card'">
          <i class="fas fa-credit-card"></i>
          <span>Card</span>
        </div>
        <div class="payment-option" :class="{ active: selectedPayment === 'bank_transfer' }" @click="selectedPayment = 'bank_transfer'">
          <i class="fas fa-credit-card"></i>
          <span>Bank</span>
        </div>
        <div class="payment-option" :class="{ active: selectedPayment === 'bkash' }" @click="selectedPayment = 'bkash'">
          <i class="fab fa-paypal"></i>
          <span>Bkash</span>
        </div>
        <div class="payment-option" :class="{ active: selectedPayment === 'nagad' }" @click="selectedPayment = 'nagad'">
          <i class="fab fa-paypal"></i>
          <span>Nagad</span>
        </div>
        <div v-if="customerInfo.city == 'Dhaka'" class="payment-option" :class="{ active: selectedPayment === 'cod' }" @click="selectedPayment = 'cod'">
          <i class="fab fa-paypal"></i>
          <span>Cash on delivery</span>
        </div>
      </div>
      <div class="card-details" v-if="selectedPayment === 'card'">
        <input type="text" v-model="cardInfo.number" placeholder="Card Number" />
        <input type="text" v-model="cardInfo.name" placeholder="Cardholder Name" />
        <input type="text" v-model="cardInfo.expiry" placeholder="MM/YY" />
        <input type="text" v-model="cardInfo.cvv" placeholder="CVV" />
      </div>
    </section>

    <!-- Order Summary -->
    <section class="shadow-lg p-4 rounded-lg mb-4">
      <h2>Order Summary</h2>
      <div class="products-list">
        <div v-for="(item, index) in cartStore.cart" :key="index" class="product-item ">
          <img :src="$config.public.apiBase+'/'+item.product.front_image" :alt="item.product.name" />
          <div class="flex justify-between w-full">

        
          <div class="product-details">
            <h3>{{ item.product.name }}</h3>
            <p>Quantity: {{ item.quantity }}</p>
          
          </div>
            <p>৳ {{ item.price }}</p>  </div>
        </div>
      </div>
      <div class="total-section">
        <div class="subtotal">
          <span>Subtotal</span>
          <span>৳ {{ cartStore.total }}</span>
        </div>
        <div class="shipping">
          <span>Shipping</span>
          <span>৳ {{ cartStore.shippingMethod }}</span>
        </div>
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

    <button class="checkout-button" @click="processCheckout">Complete Purchase</button>
  </div>
</template>

<script lang="ts" setup>
import division from '@/divisions.json'
const cartStore = useMyCartStore()
const customerInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: 'Dhaka',
  country: '',
  district: '',
  contactPerson: '',
  contactPersonPhone: '',
  note: '',
  
})
const divisions = division.divisions
const districts = computed(()=>{
  let id = divisions.find(e=>e.name == customerInfo.value.city)?.id
 
  return  division.districts.filter(e=>e.division_id == id)
})
const selectedPayment = ref('card')
const cardInfo = ref({
  number: '',
  name: '',
  expiry: '',
  cvv: ''
})

const countries = ref([
  {
    label: 'Banglaadesh',
    value: 'Banglaadesh',
    
  }
])

const subtotal = computed(() => '$69.98')
const shipping = computed(() => '$5.99')
const tax = computed(() => '$7.50')
const total = computed(() => '$83.47')
const handleCityUpdate = () => {
  customerInfo.value.city == 'Dhaka' ? cartStore.shippingMethod = 0 : cartStore.shippingMethod = 120
  cartStore.calculateSubtotal()
  
}
const processCheckout = async() => {
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
    products: cartStore.cart.map(item => ({ productId: item.id, quantity: item.quantity, price: item.price })), 
    totalAmount: cartStore.subtotal,
    shippingAddress:{
      street: customerInfo.value.address,
      city: customerInfo.value.city,
      district: customerInfo.value.district,
      country: customerInfo.value.country,
    },
    note:customerInfo.value.note,
    contactPerson:{
      name: customerInfo.value.contactPerson,
      phone: customerInfo.value.contactPersonPhone,
    },
   
  }
  const data = await $fetch('/api/checkout',{
    method: 'POST',
    body: form
  })
  console.log('Processing checkout...',form)
}
</script>

<style>
.billing-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
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
  border-color: #4CAF50;
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
  background: #4CAF50;
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