<template>
  <div class="track-order-container">
    <img src="/assets/images/logo/Halda-Valley-Logo-03.png" class="cover container" alt="">
    <div class="order-input-section">
      <h2>Track Your Order</h2>
      <div class="input-group">
        <input 
          v-model="orderId" 
          type="text" 
          placeholder="Enter your Order ID ORD-XXXXXX......"
          class="order-input"
        />
        <button 
          @click="handleTrackOrder" 
          class="track-button"
          :disabled="!orderId"
        >
          <span v-if="loading">Tracking...</span>
          <span v-else>Track Order</span>
        </button>
      </div>
    </div>

    <div v-if="orderDetails" class="order-details">
     
      <h3>Order Details</h3>
      <div class="details-grid">
        <div class="detail-item">
          <span class="label">Order ID:</span>
          <span class="value">{{ orderDetails.order_id }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Payment Status:</span>
          <span class="value status-badge uppercase" >{{ orderDetails.status }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Order Date:</span>
          <span class="value">{{ moment(orderDetails.orderDate).format('DD-MM-YYYY') }}</span>
        </div>
        <!-- <div class="detail-item">
          <span class="label">Estimated Delivery:</span>
          <span class="value">{{ orderDetails.estimatedDelivery }}</span>
        </div> -->
      </div>

    <div class="p-4 ">
              <Stepper  v-model="stepIndex">
    <StepperItem
      v-for="item in steps"
      :key="item.step"
      class="basis-1/4"
      :step="item.step"
    >
      <StepperTrigger disabled>
        <StepperIndicator >
          <component :is="item.icon" class="w-4 h-4 text-white" />
        </StepperIndicator>
        <div class="flex  flex-col">
          <StepperTitle>
            {{ item.title }}
          </StepperTitle>
          <StepperDescription>
            {{ item.description }}
          </StepperDescription>
        </div>
      </StepperTrigger>
      <StepperSeparator
        v-if="item.step !== steps[steps.length - 1].step"
        class="w-full h-[3px] "
      />
    </StepperItem>
  </Stepper>
</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import moment from 'moment';
import { ref } from 'vue';

import { BookUser, Check, CreditCard, Truck } from 'lucide-vue-next'
const orderId = ref('');
const loading = ref(false);
const orderDetails = ref();
const route = useRoute()
const stepIndex = ref(1)
const steps = [{
  step: 1,
  title: 'Pending',
  description: 'Order Placed and waiting for approval',
  icon: BookUser,
}, {
  step: 2,
  title: 'Processing',
  description: 'Order is being processed',
  icon: Truck,
}, {
  step: 3,
  title: 'Shipped',
  description: 'Order is on the way',
  icon: CreditCard,
}, {
  step: 4,
  title: 'Delivered',
  description: 'Order has been delivered', 
  icon: Check,
}]
const handleTrackOrder = async () => {
  if (!orderId.value) return;
  
  loading.value = true;
  try {
    const { data } = await $fetch<{ data: any }>(`/api/order/${orderId.value}`);
   if (data) {  orderDetails.value = data;
    
     
     stepIndex.value = data.status == 'pending' ? 1 : data.status == 'processing' ? 2 : data.status == 'shipped' ? 3 : 4
    }
  } catch (error) {
    console.error('Error tracking order:', error);
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  if (route.query.id)
  {
    orderId.value = route.query.id as string
  handleTrackOrder()
}

})
</script>

<style scoped>
.track-order-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.order-input-section {
  text-align: center;
  margin-bottom: 3rem;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.input-group {
  display: flex;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
}

.order-input {
  flex: 1;
  padding: 0.8rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.order-input:focus {
  border-color: #4299e1;
  outline: none;
}

.track-button {
  padding: 0.8rem 1.5rem;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.track-button:hover {
  background: #3182ce;
}

.track-button:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
}

.order-details {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #e2e8f0;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.detail-item {
  padding: 1rem;
  background: #f7fafc;
  border-radius: 8px;
}

.label {
  color: #718096;
  font-size: 0.875rem;
  display: block;
  margin-bottom: 0.5rem;
}

.value {
  color: #2d3748;
  font-weight: 600;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
}

.status-badge.processing {
  background: #ebf8ff;
  color: #2b6cb0;
}

.status-badge.shipped {
  background: #f0fff4;
  color: #2f855a;
}

.status-badge.delivered {
  background: #f0fff4;
  color: #2f855a;
}

.tracking-timeline {
  margin-top: 3rem;
  position: relative;
}

.timeline-step {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem 0;
  position: relative;
}

.timeline-step:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 15px;
  top: 50px;
  bottom: 0;
  width: 2px;
  background: #e2e8f0;
}

.step-icon {
  width: 32px;
  height: 32px;
  background: #e2e8f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.timeline-step.completed .step-icon {
  background: #48bb78;
  color: white;
}

.step-content {
  flex: 1;
}

.step-content h4 {
  color: #2d3748;
  margin: 0 0 0.5rem;
}

.step-content p {
  color: #718096;
  margin: 0;
  font-size: 0.875rem;
}

.step-date {
  display: block;
  color: #a0aec0;
  font-size: 0.75rem;
  margin-top: 0.5rem;
}
</style>