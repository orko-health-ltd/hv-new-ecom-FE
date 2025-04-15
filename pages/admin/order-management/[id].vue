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
                  <nuxt-link to="/admin">Dashboard</nuxt-link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink as-child>
                  <nuxt-link to="/admin/order-management"
                    >All Orders</nuxt-link
                  >
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink as-child>
                  <nuxt-link :to="`/admin/product-management/orders/${route.params.id}`"
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
              </CardDescription></CardHeader
            >
                          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                                    <span class="font-medium">{{ new Date(order.orderDate).toLocaleDateString() }}</span>
                                  </div>
                                  <div class="flex justify-between">
                                    <span class="text-muted-foreground">Status:</span>
                                    <Badge>{{ order.status }}</Badge>
                                  </div>
                                  <div class="flex justify-between">
                                    <span class="text-muted-foreground">Payment Method:</span>
                                    <span class="font-medium">{{ order.paymentMethod }}</span>
                                  </div>
                                  <div class="flex justify-between">
                                    <span class="text-muted-foreground">Payment Status:</span>
                                    <Badge variant="outline">{{ order.paymentStatus }}</Badge>
                                  </div>
                                </div>
                              </div>

                              <div class="mt-4 rounded-lg border p-4">
                                <h3 class="mb-4 text-lg font-semibold">Customer Details</h3>
                                <div class="space-y-2">
                                  <div class="flex justify-between">
                                    <span class="text-muted-foreground">Name:</span>
                                    <span class="font-medium">{{ order.customer?.first_name }} </span>
                                  </div>
                                  <div class="flex justify-between">
                                    <span class="text-muted-foreground">Email:</span>
                                    <span class="font-medium">{{ order.customer?.email }}</span>
                                  </div>
                                  <div class="flex justify-between">
                                    <span class="text-muted-foreground">Phone:</span>
                                    <span class="font-medium">{{ order.customer?.phone }}</span>
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
                                    <span class="font-medium">{{ order.shippingAddress?.street }}</span>
                                  </div>
                                  <div class="flex justify-between">
                                    <span class="text-muted-foreground">City:</span>
                                    <span class="font-medium">{{ order.shippingAddress?.city }}</span>
                                  </div>
                                  <div class="flex justify-between">
                                    <span class="text-muted-foreground">District:</span>
                                    <span class="font-medium">{{ order.shippingAddress?.district }}</span>
                                  </div>
                                  <div class="flex justify-between">
                                    <span class="text-muted-foreground">Country:</span>
                                    <span class="font-medium">{{ order.shippingAddress?.country }}</span>
                                  </div>
                                </div>
                              </div>

                              <div class="mt-4 rounded-lg border p-4">
                                <h3 class="mb-4 text-lg font-semibold">Order Summary</h3>
                                <div class="space-y-4">
                                  <div v-for="item in order.products" class="flex items-center justify-between">
                                    <div>
                                    
                                      <h4 class="font-medium">{{ item.product?.name }} 
                                      </h4>
                                       <img class="w-14 h-14" :src="$config.public.apiBase+'/'+item.product.front_image" alt="">
                                      <p class="text-sm text-muted-foreground">Quantity: {{ item.quantity }}</p>
                                    </div>
                                    <span class="font-medium">৳{{ item.price }}</span>
                                  </div>
                                  <div class="border-t pt-4">
                                    <div class="flex justify-between">
                                      <span class="text-muted-foreground">Subtotal:</span>
                                      <span class="font-medium">৳{{ order.subTotal }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                      <span class="text-muted-foreground">Shipping:</span>
                                      <span class="font-medium">৳{{ order.shippingcost }}</span>
                                    </div>
                                    <div class="flex justify-between border-t pt-2">
                                      <span class="font-medium">Total:</span>
                                      <span class="font-medium">৳{{ order.totalAmount }}</span>
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
import { get } from '@vueuse/core'
import { CircleUser, Loader2, Search } from 'lucide-vue-next'
import Label from '~/components/ui/label/Label.vue'
import type { Order } from '~/types'
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
const order =ref(<Order>{})

const getOrder = async () => {
  try {
    const { data } = await $fetch<{ data: Order }>(`/api/admin/orders/${route.params.id}`)
    
    if (data) {
      order.value = data
     
    }
  } catch (error) {
    console.error('Error fetching order:', error)
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
