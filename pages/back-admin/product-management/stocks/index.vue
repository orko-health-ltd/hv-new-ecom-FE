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
interface Stock {
  _id: string
  name: string
  stock: number
  stock_info: {
    date: string
    quantity: string
    type: string
    reason: string
  }
  front_image: string
  is_active: boolean
}
interface StockData {
  _id: string
  date: string
  quantity: string
  type: string
  reason: string
  product_name: string
  product_id: string
}
const toast = useToast()
const showCreateForm = ref(false)
const showEditForm = ref(false)
const creating = ref(false)
const loading = ref(false)
const stocks = ref<Stock[]>([])
const stock = ref({
  product_id: '',
  quantity: 0,
  type: 'in',
  reason: 'Regular Stocking',
  date: moment().format('YYYY-MM-DDTHH:mm'),
})
const stockLog = ref<StockData[]>([])
const deleting = ref('')
const getStocks = async () => {
  try {
    const response = await $fetch<{
      data: { stock_list: Stock[]; stock_log: StockData[] }
      status: string
    }>('/api/back-admin/stocks')
    stocks.value = response.data.stock_list
    stockLog.value = response.data.stock_log
  } catch (error) {
    console.log(error)
  }
}
const createStock = async () => {
  loading.value = true
  try {
    const data = await $fetch<{ status: string; message: string }>(
      '/api/back-admin/stocks/create',
      {
        method: 'POST',
        body: stock.value,
      }
    )
    if (data.status === 'success') {
      toast.add({
        title: 'Stock Added Successfully',
        color: 'green',
        timeout: 1500,
      })
      getStocks()
      showCreateForm.value = false
      stock.value = {
        product_id: '',
        quantity: 0,
        type: 'in',
        reason: 'Regualar Stocking',
        date: moment().format('YYYY-MM-DDTHH:mm'),
      }
    } else {
      toast.add({
        title: 'Stock operation failed ,' + data.message,
        color: 'red',
        timeout: 1500,
      })
    }
    loading.value = false
  } catch (error) {
    console.error(error)
  }
}
const deleteStock = async (id: string) => {
  deleting.value = id
  const { data } = await $fetch<{ data: string }>(
    '/api/back-admin/stocks/' + id,
    {
      method: 'DELETE',
    }
  )
  console.log(data)
  let response = JSON.parse(data)
  if (response.status === 'success') {
    toast.add({
      title: 'Stock Deleted Successfully',
      color: 'green',
      timeout: 1500,
    })
  } else {
    toast.add({
      title: 'Stock operation failed. ' + response.message,
      color: 'red',
      timeout: 1500,
    })
  }

  deleting.value = ''
  getStocks()
}
onMounted(() => {
  getStocks()
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
                <nuxt-link to="/back-admin/product-management/stock"
                  >Stocks</nuxt-link
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
        <Tabs default-value="product">
          <div class="flex items-center">
            <TabsList>
              <TabsTrigger value="product"> Product Wise Stock </TabsTrigger>
              <TabsTrigger value="stock"> Stock Log </TabsTrigger>
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
              <Button
                size="sm"
                :disabled="showEditForm"
                @click="showCreateForm = !showCreateForm"
                class="h-7 bg-blue-500 hover:bg-blue-700 text-white gap-1"
              >
                <PlusCircle class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Stock
                </span>
              </Button>
            </div>
          </div>
          <div class="mt-3" v-if="showCreateForm">
            <Card>
              <CardHeader>
                <CardTitle>Add Stock</CardTitle>
                <CardDescription>
                  Add new stocks to manage your products.
                </CardDescription></CardHeader
              >
              <form @submit.prevent="createStock()" class="grid gap-4">
                <CardContent>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="grid gap-2">
                      <Label for="first-name">Product name</Label>
                      <Select v-model="stock.product_id">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Product " />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectLabel>Product</SelectLabel>
                          <SelectItem
                            v-for="product in stocks"
                            :value="product._id"
                          >
                            {{ product.name }}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div class="grid gap-2">
                      <Label for="first-name">Quantity</Label>
                      <Input v-model="stock.quantity" type="number" />
                    </div>
                    <div class="grid gap-2">
                      <Label for="first-name">Stocking type</Label>
                      <Select v-model="stock.type">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Stocking Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectLabel>Type</SelectLabel>
                          <SelectItem value="in"> IN</SelectItem>
                          <SelectItem value="out"> OUT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div class="grid gap-2">
                      <Label for="first-name">Date</Label>
                      <Input v-model="stock.date" type="datetime-local" />
                    </div>
                    <div class="grid gap-2 col-span-2">
                      <Label for="first-name">Reason</Label>
                      <Input v-model="stock.reason" type="text" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter class="gap-3">
                  <Button type="submit" class="text-white" :disabled="creating">
                    <Loader2
                      v-if="creating"
                      class="w-4 h-4 mr-2 animate-spin"
                    />
                    Add</Button
                  >
                  <Button
                    type="button"
                    variant="outline"
                    @click="showCreateForm = false"
                    >Cancel</Button
                  >
                </CardFooter>
              </form>
            </Card>
          </div>
          <TabsContent value="product">
            <Card>
              <CardHeader>
                <CardTitle>Stocks </CardTitle>
                <CardDescription>
                  Manage your Stocks and view their sales performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead class="hidden w-[100px] sm:table-cell">
                        <span class="sr-only">img</span>
                      </TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Current Stock</TableHead>
                      <TableHead> Last Stock Update </TableHead>

                      <TableHead>
                        <span class="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow v-for="stockData in stocks" :key="stockData._id">
                      <TableCell>
                        <AdminTableImage :image="stockData.front_image" />
                      </TableCell>
                      <TableCell class="font-medium">
                        {{ stockData.name }}
                      </TableCell>
                      <TableCell>
                        {{ stockData.stock || 0 }}
                      </TableCell>

                      <TableCell>
                        <div
                          v-if="stockData.stock_info"
                          class="flex flex-col gap-2 rounded-lg bg-gray-200 p-3"
                        >
                          <div>
                            <Badge class="text-center w-28" variant="secondary"
                              >Quantity :
                              {{ stockData.stock_info.quantity }}</Badge
                            >
                            <Badge
                              class="text-center w-28"
                              :variant="
                                stockData.stock_info.type == 'out'
                                  ? 'destructive'
                                  : 'default'
                              "
                              >Stock : {{ stockData.stock_info.type }}</Badge
                            >
                          </div>

                          {{
                            moment(stockData.stock_info.date).format(
                              'DD/MM/YYYY : hh:mm:a'
                            )
                          }}
                          <p>{{ stockData.stock_info.reason }}</p>
                        </div>
                        <p v-else>N/A</p>
                      </TableCell>
                      <TableCell>
                        <Button
                          class="bg-violet-500 text-white text-xs px-2 py-1"
                          @click="
                            ;(stock.product_id = stockData._id),
                              (showCreateForm = true)
                          "
                          >Update Stock</Button
                        >
                        <!-- <DropdownMenu>
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
                            <DropdownMenuItem >Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu> -->
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
          <TabsContent value="stock">
            <Card>
              <CardHeader>
                <CardTitle>Stocks </CardTitle>
                <CardDescription>
                  Manage your SKUs and view their sales performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead> Product </TableHead>
                      <TableHead> Type </TableHead>
                      <TableHead> Reason </TableHead>

                      <TableHead>
                        <span class="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow
                      v-for="stockData in stockLog"
                      :key="stockData._id"
                    >
                      <TableCell>
                        {{
                          moment(stockData.date).format('DD/MM/YYYY : hh:mm:a')
                        }}
                      </TableCell>
                      <TableCell class="font-medium">
                        {{ stockData.quantity }}
                      </TableCell>
                      <TableCell>
                        {{ stockData.product_name }}
                      </TableCell>

                      <TableCell>
                        <Badge
                          class="text-center text-white w-28"
                          :variant="
                            stockData.type == 'out' ? 'destructive' : 'default'
                          "
                          >Stock : {{ stockData.type }}</Badge
                        >
                      </TableCell>
                      <TableCell>
                        {{ stockData.reason }}
                      </TableCell>
                      <TableCell>
                        <UIcon
                          v-if="deleting == stockData._id"
                          name="line-md:loading-twotone-loop"
                        />
                        <DropdownMenu v-else>
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
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem
                              @click="
                                ;(deleting = stockData._id),
                                  deleteStock(stockData._id)
                              "
                              >Delete</DropdownMenuItem
                            >
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
