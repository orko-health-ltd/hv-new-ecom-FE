<template>
  <ClientOnly>
    <div class="flex min-h-screen w-full flex-col bg-muted/40">
      <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header
          class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
        >
          <SidebarTrigger class="-ml-1" />
          <Breadcrumb class="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink as-child>
                  <nuxt-link to="/back-admin">Dashboard</nuxt-link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink as-child>
                  <nuxt-link to="/back-admin/order-management/all"
                    >All Orders</nuxt-link
                  >
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink as-child>
                  <nuxt-link
                    :to="`/back-admin/product-management/orders/${route.params.id}`"
                    >View Order</nuxt-link
                  >
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div class="relative ml-auto flex-1 md:grow-0">
            <Search
              class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            />
            <Input
              type="search"
              placeholder="Search..."
              class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="secondary" size="icon" class="rounded-full">
                <CircleUser class="h-5 w-5" />
                <span class="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <div class="mt-3">
          <Card>
            <CardHeader>
              <CardTitle>View Order</CardTitle>
              <CardDescription>
                Edit product to manage your stocks.
              </CardDescription>

              <div class="flex justify-end items-center gap-2">
                <Button
                  @click="
                    ;(order.status = 'pending'), (stepIndex = 1), updateStatus()
                  "
                  :disabled="order.status == 'pending'"
                  class="bg-yellow-500 text-white hover:bg-yellow-600"
                  >Pending
                  <UIcon
                    v-if="order.status == 'pending'"
                    name="i-heroicons-check"
                  />
                </Button>
                <Button
                  @click="
                    ;(order.status = 'processing'),
                      (stepIndex = 2),
                      updateStatus()
                  "
                  :disabled="order.status == 'processing'"
                  class="bg-violet-500 text-white hover:bg-violet-600"
                >
                  Processing
                  <UIcon
                    v-if="order.status == 'processing'"
                    name="i-heroicons-check"
                  />
                </Button>
                <Button
                  @click="
                    ;(order.status = 'shipped'), (stepIndex = 3), updateStatus()
                  "
                  :disabled="order.status == 'shipped'"
                  class="bg-blue-500 text-white hover:bg-blue-600"
                  >Shipped

                  <UIcon
                    v-if="order.status == 'shipped'"
                    name="i-heroicons-check"
                  />
                </Button>
                <Button
                  @click="
                    ;(order.status = 'delivered'),
                      (stepIndex = 4),
                      updateStatus()
                  "
                  :disabled="order.status == 'delivered'"
                  class="bg-green-500 text-white hover:bg-green-600"
                  >Delivered
                  <UIcon
                    v-if="order.status == 'delivered'"
                    name="i-heroicons-check"
                  />
                </Button>
                <Button
                  @click=";(order.status = 'cancelled'), updateStatus()"
                  :disabled="order.status == 'cancelled'"
                  class="bg-red-500 text-white hover:bg-red-600"
                  >Canceled
                  <UIcon
                    v-if="order.status == 'cancelled'"
                    name="i-heroicons-check"
                  />
                </Button>
              </div>
            </CardHeader>
            <div class="p-4 pl-[8rem]">
              <Stepper v-model="stepIndex">
                <StepperItem
                  v-for="item in steps"
                  :key="item.step"
                  class="basis-1/4"
                  :step="item.step"
                >
                  <StepperTrigger disabled>
                    <StepperIndicator>
                      <component :is="item.icon" class="w-4 h-4 text-white" />
                    </StepperIndicator>
                    <div class="flex flex-col">
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
                    class="w-full h-px"
                  />
                </StepperItem>
              </Stepper>
            </div>
            <div class="grid grid-cols-1 gap-4 px-5 md:grid-cols-2">
              <div>
                <div class="rounded-lg border p-4">
                  <h3 class="mb-4 text-lg font-semibold">Order Information</h3>

                  <div v-if="order" class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Order ID:</span>
                      <span class="font-medium">{{ order.order_id }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Order Date:</span>
                      <span class="font-medium">{{
                        new Date(order.orderDate).toLocaleDateString()
                      }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Status:</span>
                      <Badge
                        class="text-white"
                        :class="
                          order.status == 'pending'
                            ? 'bg-amber-500'
                            : order.status == 'processing'
                            ? 'bg-violet-500'
                            : order.status == 'shipped'
                            ? 'bg-blue-500'
                            : 'bg-green-500'
                        "
                        >{{ order.status }}</Badge
                      >
                    </div>
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Payment Method:</span>
                      <span class="font-medium">{{ order.paymentMethod }}</span>
                    </div>
                    <!-- <div class="flex justify-between">
                                    <span class="text-muted-foreground">Payment Status:</span>
                                   <Badge class="text-white" :class="order.paymentStatus == 'pending' ? 'bg-amber-500':order.paymentStatus == 'refunded' ? 'bg-violet-500':order.paymentStatus == 'failed' ? 'bg-red-500':'bg-green-500'">{{ order.paymentStatus  }}</Badge>
                             
                                  </div> -->
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Payment Status:</span>
                      <div class="flex items-center gap-2">
                        <Badge
                          class="text-white"
                          :class="
                            order.paymentStatus == 'pending'
                              ? 'bg-amber-500'
                              : order.paymentStatus == 'refunded'
                              ? 'bg-violet-500'
                              : order.paymentStatus == 'failed'
                              ? 'bg-red-500'
                              : 'bg-green-500'
                          "
                          >{{ order.paymentStatus }}</Badge
                        >
                        <Button
                          class="text-white"
                          v-if="
                            (order.paymentMethod === 'cod' ||  order.paymentMethod === 'partial') &&
                            order.paymentStatus === 'pending' &&
                            order.status != 'cancelled'
                          "
                          size="sm"
                          @click="updatePaymentStatus(order._id)"
                          >Mark as Paid</Button
                        >
                      </div>
                    </div>
                    <div v-if="order" class="flex justify-between">
                      <span class="text-muted-foreground">Amount Paid:</span>
                      <span class="font-medium">{{ order.paymentStatus === 'pending' ? order.partialPayment : order.total}}</span>
                    </div>
                    <div v-if="order" class="flex justify-between">
                      <span class="text-muted-foreground">Amount Due:</span>
                      <span class="font-medium">{{ order.total- (order.paymentStatus === 'pending' ? order.partialPayment : order.total )}}</span>
                    </div>
                  </div>
                </div>

                <div class="mt-4 rounded-lg border p-4">
                  <h3 class="mb-4 text-lg font-semibold">Customer Details</h3>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Name:</span>
                      <span class="font-medium"
                        >{{ order.customer?.first_name }}
                      </span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Email:</span>
                      <span class="font-medium">{{
                        order.customer?.email
                      }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Phone:</span>
                      <span class="font-medium">{{
                        order.customer?.phone
                      }}</span>
                    </div>
                  </div>
                  <Separator class="my-4" />
                  <h3 class="mb-4 text-lg font-semibold">
                    Contact Person Details
                  </h3>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Name:</span>
                      <span class="font-medium"
                        >{{ order.contactPerson?.name }}
                      </span>
                    </div>

                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Phone:</span>
                      <span class="font-medium">{{
                        order.contactPerson?.phone
                      }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Delivery Note:</span>
                      <span class="font-medium">{{ order.note }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div class="rounded-lg border p-4">
                  <h3 class="mb-4 text-lg font-semibold">Shipping Address</h3>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Street:</span>
                      <span class="font-medium">{{
                        order.shippingAddress?.street
                      }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">City:</span>
                      <span class="font-medium">{{
                        order.shippingAddress?.city
                      }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">District:</span>
                      <span class="font-medium">{{
                        order.shippingAddress?.district
                      }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Country:</span>
                      <span class="font-medium">{{
                        order.shippingAddress?.country
                      }}</span>
                    </div>
                  </div>
                </div>

                <div class="mt-4 rounded-lg border p-4">
                  <h3 class="mb-4 text-lg font-semibold">Order Summary</h3>
                  <div class="space-y-4">
                    <div
                      v-for="item in order.products"
                      class="flex items-center justify-between"
                    >
                      <div>
                        <h4 class="font-medium">{{ item.product?.name }}</h4>
                        <img
                          class="w-14 h-14"
                          :src="
                            $config.public.apiBase +
                            '/' +
                            item.product?.front_image
                          "
                          alt=""
                        />
                        <p class="text-sm text-muted-foreground">
                          Quantity: {{ item.quantity }}
                        </p>
                      </div>
                      <span class="font-medium">৳{{ item.price }}</span>
                    </div>
                    <div class="border-t pt-4">
                      <div class="flex justify-between">
                        <span class="text-muted-foreground">Subtotal:</span>
                        <span class="font-medium">৳{{ order.subTotal }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-muted-foreground">Discount:</span>
                        <span class="font-medium">৳{{ order.discount }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-muted-foreground">Shipping:</span>
                        <span class="font-medium"
                          >৳{{ order.shippingcost }}</span
                        >
                      </div>
                      <div class="flex justify-between border-t pt-2">
                        <span class="font-medium">Total:</span>
                        <span class="font-medium">৳{{ order.total }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
<script lang="ts" setup>
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper'
import { CircleUser, Search } from 'lucide-vue-next'
import type { Order } from '~/types'

import { BookUser, Check, CreditCard, Truck } from 'lucide-vue-next'

interface Brand {
  name: string
  _id: string
  is_active: boolean
}
interface Sku {
  name: string
  _id: string
  is_active: boolean
}

interface Category {
  name: string
  _id: string
  is_active: boolean
}

interface Product {
  _id: string
  name: string
  color: string
  price: number
  specification: string
  discount: number
  discount_unit: string
  is_active: boolean
  is_featured: boolean
  is_combo: boolean
  product_images: Array<never>
  brand_id: string
  sku_id: string
  category_id: string
  format: string
  features: string[]
  description: string
  ingredients: string[]
  brewing_guide: string[]
  front_image: string
  back_image: string
}

const toast = useToast()
const route = useRoute()
const updating = ref(false)
const brands = ref<Brand[]>([])
const skus = ref<Sku[]>([])
const categories = ref<Category[]>([])
const images = ref<Array<string>>([])
const front_image = ref<string>('')
const back_image = ref<string>('')
const formats = ['Loose Leaf', 'Tea Bag']
const deleting = ref('')

const order = ref(<Order>{})
const stepIndex = ref(1)
const steps = [
  {
    step: 1,
    title: 'Pending',
    description: 'Order Placed and waiting for approval',
    icon: BookUser,
  },
  {
    step: 2,
    title: 'Processing',
    description: 'Order is being processed',
    icon: Truck,
  },
  {
    step: 3,
    title: 'Shipped',
    description: 'Order is on the way',
    icon: CreditCard,
  },
  {
    step: 4,
    title: 'Delivered',
    description: 'Order has been delivered',
    icon: Check,
  },
]
const getOrder = async () => {
  try {
    const { data } = await $fetch<{ data: Order }>(
      `/api/back-admin/orders/${route.params.id}`
    )

    if (data) {
      order.value = data
      stepIndex.value =
        data.status == 'pending'
          ? 1
          : data.status == 'processing'
          ? 2
          : data.status == 'shipped'
          ? 3
          : 4
    }
  } catch (error) {
    console.error('Error fetching order:', error)
  }
}
const updatePaymentStatus = async (id: string) => {
 
  let formdata = {
    paymentStatus: 'paid',
    ssl_ipn: JSON.stringify({
      amount: order.value.total,
      bank_tran_id: '',
      base_fair: '0.00',
      card_brand: 'Cash',
      card_issuer: 'Cash',
      card_issuer_country: 'Bangladesh',
      card_issuer_country_code: 'BD',
      card_no: '',
      card_sub_brand: 'Classic',
      card_type: 'Cash',
      currency: 'BDT',
      currency_amount: order.value.total,
      currency_rate: '1.0000',
      currency_type: 'BDT',
      error: '',
      risk_level: '0',
      risk_title: 'Safe',
      status: 'VALID',
      store_amount: order.value.total,
      store_id: '',
      tran_date: Date.now(),
      tran_id: order.value.order_id,
      val_id: '',

      value_a: '',
      value_b: '',
    }),
  }
  try {
    const { data } = await $fetch<{ data: Order }>(
      `/api/back-admin/orders/${route.params.id}`,
      {
        method: 'POST',
        body: formdata,
      }
    )
    if (data) {
      order.value = data
      toast.add({
        title: 'Order payment status updated successfully.',
        color: 'green',
        timeout: 1500,
      })
    } else {
      toast.add({ title: 'Error updating order.', color: 'red', timeout: 1500 })
    }
  } catch (error) {}
}
const updateStatus = async () => {
  try {
    const { data } = await $fetch<{ data: Order }>(
      `/api/back-admin/orders/${route.params.id}`,
      {
        method: 'POST',
        body: {
          status: order.value.status,
          stocking: order.value.status == 'shipped' ? true : false,
        },
      }
    )
    if (data) {
      toast.add({
        title: 'Order status updated successfully.',
        color: 'green',
        timeout: 1500,
      })
    } else {
      toast.add({ title: 'Error updating order.', color: 'red', timeout: 1500 })
    }
  } catch (error) {
    console.error('Error updating order status:', error)
  }
}

onMounted(() => {
  getOrder()
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})
</script>
<style scoped>
.group[data-state='completed'] .group-data-\[state\=completed\]\:bg-accent {
  background-color: teal;
}
</style>
