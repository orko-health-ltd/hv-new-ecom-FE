<script setup lang="ts">
import {
  CircleUser,
  File,
  ListFilter,
  Loader2,
  MoreHorizontal,
  PlusCircle,
  Search,
} from 'lucide-vue-next'
import moment from 'moment'
import type { Coupon } from '~/types'
const couponData = ref({
  _id: <string>'',
  name: <string>'',
  code: <string>'',
  type: <string>'percentage',
  value: <number>0,
  min_order_amount: <number>0,
  max_discount_amount: <number>0,
  usage: <number>0,
  start_date: '',
  expiry_date: '',
  is_active: <boolean>true

} as Coupon)
const editing = ref(false)
const items = ref([
  {
    label: 'Active',
   
    value: true
  },
  {
    label: 'In-active',
    
    value: false
  }
  
])
const types = ref([
  {
    label: 'Percentage',
   
    value: 'percentage'
  },
  {
    label: 'Amount',
    
    value: 'amount'
  }
  
])
const toast = useToast()
const showCouponForm = ref(false)
const creating = ref(false)
const createCoupon = async () => {
  creating.value = true
  console.log(couponData.value)
  try {
   const { data: responseData } = await $fetch<{ data: Coupon }>('/api/back-admin/coupons/create', {
      method: 'POST',
      body: couponData.value
    })
    console.log(responseData)
    toast.add({
      title: 'Coupon created successfully',
      description: 'Coupon created successfully',
      icon: 'success'
    })
    couponData.value = {
      _id: <string>'',
      name: <string>'',
      code: <string>'',
      type: <string>'',
      value: <number>0,
      min_order_amount: <number>0,
      max_discount_amount: <number>0,
      usage: <number>0,
      start_date: '',
      expiry_date: '',
      is_active: <boolean>true
    }
    getCoupons()
    showCouponForm.value = false
  } catch (error: any) {
    console.log(error)
    toast.add({
      title: 'Error creating coupon',
      color: 'red',
      icon: 'error'
    })
  } finally {
    creating.value = false
  }
}
const updateCoupon = async () => {
  creating.value = true
  console.log(couponData.value)
  try {
   const { data: responseData } = await $fetch<{ data: Coupon }>(`/api/back-admin/coupons/${couponData.value._id}`, {
      method: 'POST',
      body: couponData.value
    })
    console.log(responseData)
    toast.add({
      title: 'Coupon updated successfully',
      // description: 'Coupon created successfully',
      icon: 'success'
    })
    couponData.value = {
      _id: <string>'',
      name: <string>'',
      code: <string>'',
      type: <string>'',
      value: <number>0,
      min_order_amount: <number>0,
      max_discount_amount: <number>0,
      usage: <number>0,
      start_date: '',
      expiry_date: '',
      is_active: <boolean>true
    }
    getCoupons()
    showCouponForm.value = false
  } catch (error: any) {
    console.log(error)
    toast.add({
      title: 'Error updating coupon',
      color: 'red',
      icon: 'error'
    })
  } finally {
    creating.value = false
  }
}
const coupons = ref<Coupon[]>([])
const editCoupon = (coupon:Coupon) => {
  editing.value = true
  couponData.value = coupon
  couponData.value.start_date = moment(coupon.start_date).format('YYYY-MM-DD')
  couponData.value.expiry_date = moment(coupon.expiry_date).format('YYYY-MM-DD')
  showCouponForm.value = true
}

const getCoupons = async () => {
  const { data } = await $fetch<{ data: Coupon[] }>('/api/back-admin/coupons')
  coupons.value = data
}
const deleteCoupon = async (id: string) => {
  try {
    await $fetch(`/api/back-admin/coupons/delete`, {
      method: 'post',
      body: {
        coupon_id: id
      }
    })
    toast.add({
      title: 'Coupon deleted successfully',
      description: 'Coupon deleted successfully',
      icon: 'success'
    })
    getCoupons()
  } catch (error) {
    console.log(error)
    toast.add({
      title: 'Error deleting coupon',
      color: 'red',
      icon: 'error'
    })
  }
}
onMounted(() => {
  getCoupons()
})
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})
</script>

<template>
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
                <nuxt-link to="/back-admin/marketing-promotions/coupons"
                  >All Coupons</nuxt-link
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
      <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs default-value="all">
          <div class="flex items-center">
            <TabsList>
              <TabsTrigger value="all"> All </TabsTrigger>
              <TabsTrigger value="active"> Active </TabsTrigger>
              <TabsTrigger value="expired"> Expired </TabsTrigger>
              <TabsTrigger value="scheduled" class="hidden sm:flex">
                Scheduled
              </TabsTrigger>
            </TabsList>
            <div class="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="outline" size="sm" class="h-7 gap-1">
                    <ListFilter class="h-3.5 w-3.5" />
                    <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem checked> Active </DropdownMenuItem>
                  <DropdownMenuItem>Expired</DropdownMenuItem>
                  <DropdownMenuItem> Scheduled </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" class="h-7 gap-1">
                <File class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <Button
                size="sm"
                @click="showCouponForm = !showCouponForm"
                class="h-7 bg-blue-500 hover:bg-blue-700 text-white gap-1"
              >
                <PlusCircle class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                 {{editing ? 'Edit Coupon' : 'Add Coupon'}}
                </span>
              </Button>
            </div>
          </div>
          <div class="mt-3" v-if="showCouponForm">
            <Card>
              <CardHeader>
                <CardTitle>  {{editing ? 'Edit Coupon' : 'Add Coupon'}}</CardTitle>
                <CardDescription>
                 {{ editing ? 'Edit coupon details' :  'Create new discount coupons for your customers.' }} 
                </CardDescription></CardHeader
              >
              <form @submit.prevent="editing ? updateCoupon() : createCoupon()" class="grid gap-4">
                <CardContent>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="grid gap-2">
                      <Label for="name">Coupon Name</Label>
                      <Input id="name" v-model="couponData.name" placeholder="Summer Sale" required />
                    </div>
                    <div class="grid gap-2">
                      <Label for="code">Coupon Code</Label>
                      <Input id="code" v-model="couponData.code" placeholder="SUMMER2024" required />
                    </div>
                      <div class="grid gap-2">
                      <!-- <Label for="is_active">Status</Label> -->
                    <URadioGroup v-model="couponData.is_active" legend="Choose coupon status" :options="items" />
                    </div>
                    <div class="grid gap-2">
                      <!-- <Label for="type">Discount Type</Label> -->
                      <URadioGroup v-model="couponData.type" legend="Choose discount type" :options="types" />
                    </div>                    <div class="grid gap-2">
                      <Label for="value">Discount Value</Label>
                      <Input id="value" v-model="couponData.value" type="number" min="0" required />
                    </div>
                    <div class="grid gap-2">
                      <Label for="min_order_amount">Minimum Order Amount</Label>
                      <Input id="min_order_amount" v-model="couponData.min_order_amount" type="number" min="0" required />
                    </div>
                    <div class="grid gap-2">
                      <Label for="max_discount_amount">Maximum Discount Amount</Label>
                      <Input id="max_discount_amount" v-model="couponData.max_discount_amount" type="number" min="0" required />
                    </div>
                    <div class="grid gap-2">
                      <Label for="usage">Maximum Usage Count</Label>
                      <Input id="usage" v-model="couponData.usage" type="number" min="0" required />
                    </div>
                    <div class="grid gap-2">
                      <Label for="start_date">Start Date</Label>
                      <Input id="start_date" v-model="couponData.start_date" type="date" required />
                    </div>
                    <div class="grid gap-2">
                      <Label for="expiry_date">Expiry Date</Label>
                      <Input id="expiry_date" v-model="couponData.expiry_date" type="date" required />
                    </div>
                  
                  </div>
                </CardContent>
                <CardFooter class="gap-3">
                  <Button class="text-white" :disabled="creating">
                    <Loader2
                      v-if="creating"
                      class="w-4 h-4 mr-2 animate-spin"
                    />
                   {{  editing ? 'Update Coupon' : 'Add Coupon'}}</Button
                  >
                  <Button
                    @click="showCouponForm = !showCouponForm , editing = false"
                    class="text-white"
                    type="button"
                    variant="destructive"
                  >
                    Cancel</Button
                  >
                </CardFooter>
              </form>
            </Card>
          </div>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Coupons</CardTitle>
                <CardDescription>
                  Manage your discount coupons and track their usage.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Min Order</TableHead>
                      <TableHead>Max Discount</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead class="hidden md:table-cell">Start Date</TableHead>
                      <TableHead class="hidden md:table-cell">Expiry Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>
                        <span class="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow v-for="coupon in coupons" :key="coupon._id">
                      <TableCell class="font-medium">{{coupon.name}}</TableCell>
                      <TableCell class="font-bold">{{coupon.code}}</TableCell>
                      <TableCell>{{ coupon.type }}</TableCell>
                      <TableCell >৳ {{ coupon.value }}</TableCell>
                      <TableCell>৳ {{ coupon.min_order_amount }}</TableCell>
                      <TableCell>৳ {{ coupon.max_discount_amount }}</TableCell>
                      <TableCell>{{ coupon.usage }}</TableCell>
                      <TableCell class="hidden md:table-cell">{{moment(coupon.start_date).format('D/M/Y')}}</TableCell>
                      <TableCell class="hidden md:table-cell">{{moment( coupon.expiry_date).format('D/M/Y') }}</TableCell>
                      <TableCell>
                        <Badge v-if="coupon.is_active" variant="default" class="text-white">Active</Badge>
                        <Badge v-else variant="destructive" class="text-nowrap">In-active</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger as-child>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal class="h-4 w-4" />
                              <span class="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem @click="editCoupon(coupon)">Edit</DropdownMenuItem>
                            <DropdownMenuItem @click="couponData = coupon ,couponData.is_active =  !couponData.is_active ,updateCoupon()">{{coupon.is_active ?  'Deactivate' : 'Activate'}}</DropdownMenuItem>
                            <DropdownMenuItem @click="deleteCoupon(coupon._id)">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div class="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>24</strong>
                  coupons
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  </div>
</template>
