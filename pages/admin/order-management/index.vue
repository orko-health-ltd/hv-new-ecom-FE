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
import type { Order } from '~/types'
import moment from 'moment'
const toast = useToast()
const showCreateForm = ref(false)
const showEditForm = ref(false)
const creating = ref(false)
const loading = ref(false)

const { data, refresh } = useFetch<{ data: Order[] }>('/api/admin/orders')
const orders = computed(() => data.value?.data || [])

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
              <TabsTrigger value="draft"> Draft </TabsTrigger>
              <TabsTrigger value="archived" class="hidden sm:flex">
                Archived
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
                  <DropdownMenuItem>Draft</DropdownMenuItem>
                  <DropdownMenuItem> Archived </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" class="h-7 gap-1">
                <File class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <!-- <Button
                size="sm"
                :disabled="showEditForm"
                @click="showCreateForm = !showCreateForm"
                class="h-7 bg-blue-500 hover:bg-blue-700 text-white gap-1"
              >
                <PlusCircle class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Category
                </span>
              </Button> -->
            </div>
          </div>
     
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
                <CardDescription>
                  Manage your orders and view the progress.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                    
                      <TableHead>Order ID</TableHead>
                      <TableHead>Order Status</TableHead>
                      <TableHead>Order Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <!-- <TableHead>Delivery Charge</TableHead> -->

                      <TableHead >
                        Payment Status
                      </TableHead>
                      <TableHead >
                       Contact Person 
                      </TableHead>
                      <TableHead>
                        <span class="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow
                      v-for="order in orders"
                      :key="order._id"
                    >
                   
                      <TableCell class="font-medium">
                        {{ order?.order_id }}
                      </TableCell>
                      <TableCell>
                        <Badge
                        class="text-white"
                          :class="{
                            'bg-yellow-500 hover:bg-yellow-600': order.status === 'pending',
                            'bg-blue-500 hover:bg-blue-600': order.status === 'processing',
                            'bg-purple-500 hover:bg-purple-600': order.status === 'shipped',
                            'bg-green-500 hover:bg-green-600': order.status === 'delivered',
                            'bg-red-500 hover:bg-red-600': order.status === 'cancelled'
                          }"
                        >
                          {{ order.status }}                        </Badge>
                      </TableCell>

                      <TableCell >
                        {{moment(order.orderDate).format('DD/MM/YYYY') }}
                      </TableCell>
                      <TableCell >
                        {{order.totalAmount}}
                      </TableCell>
                      <TableCell >
                        {{ order.paymentStatus }}
                      </TableCell>
                      <TableCell >
                        <div class="flex flex-col">
                         <h1>{{ order.contactPerson.name }}</h1>  
                       <p class="text-xs font-semibold"> {{ order.contactPerson.phone }}</p>
                        </div>
                       
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
                            <nuxt-link :to="`/admin/order-management/${order._id}`"> <DropdownMenuItem
                             
                              >View</DropdownMenuItem
                            ></nuxt-link> 
                            <DropdownMenuItem
                             
                              >Edit</DropdownMenuItem
                            >
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div class="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong>
                  products
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  </div>
</template>
