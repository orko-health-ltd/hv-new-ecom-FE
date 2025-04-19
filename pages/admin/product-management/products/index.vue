<script setup lang="ts">
import { Badge } from '@/components/ui/badge'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  CircleUser,
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Search,
} from 'lucide-vue-next'
import type { Product } from '~/types'
const searchString = ref('')
const showMod = ref(false)
// Pagination
const itemsPerPage = ref(10)
const currentPage = ref(1)
const totalPages = computed(() =>
  Math.ceil(products.value.length / itemsPerPage.value)
)

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return products.value.slice(start, end)
})

const products = ref<Product[]>([])
const goToPage = (page: number) => {
  currentPage.value = page
}
const emit = defineEmits<{ close: [boolean] }>()
const getProducts = async () => {
  const data = await $fetch<Product[]>('/api/admin/products')
  if (data) {
    products.value = data
  }
}
const deleteProduct = async (id: string) => {
  showMod.value = false
  const { error } = await useFetch('/api/admin/products/' + id, {
    method: 'DELETE',
  })
  if (error.value) {
    console.log(error.value)
  }
  getProducts()
}
const filterProducts = useDebounceFn(() => {
  if (searchString.value.length === 0) {
    getProducts()
    return
  }
  products.value = products.value.filter((product) => {
    return product.name.toLowerCase().includes(searchString.value.toLowerCase())
  })
})
onMounted(() => {
  getProducts()
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
                <nuxt-link to="/admin">Dashboard</nuxt-link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as-child>
                <nuxt-link to="/admin/product-management/products"
                  >Products</nuxt-link
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
            v-model="searchString"
            @input="filterProducts"
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
              <nuxt-link to="/admin/product-management/products/create">
                <Button size="sm" class="h-7 text-white gap-1">
                  <PlusCircle class="h-3.5 w-3.5" />
                  <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                  </span>
                </Button></nuxt-link
              >
            </div>
          </div>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  Manage your products and view their sales performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead class="hidden w-[100px] sm:table-cell">
                        <span class="sr-only">img</span>
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead class="hidden md:table-cell">
                        Price
                      </TableHead>
                      <TableHead class="hidden md:table-cell">
                        Current Stock
                      </TableHead>
                      <TableHead class="hidden md:table-cell">
                        Created at
                      </TableHead>
                      <TableHead>
                        <span class="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow
                      v-for="product in paginatedProducts"
                      :key="product._id"
                    >
                      <TableCell class="hidden sm:table-cell">
                        <AdminTableImage :image="product.front_image" />
                      </TableCell>
                      <TableCell class="font-medium">
                        {{ product.name }}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline"> Draft </Badge>
                      </TableCell>
                      <TableCell class="hidden md:table-cell">
                        {{ product.price }}
                      </TableCell>
                      <TableCell class="hidden md:table-cell">
                        {{ product.stock }}
                      </TableCell>
                      <TableCell class="hidden md:table-cell">
                        2023-07-12 10:42 AM
                      </TableCell>
                      <TableCell
                        ><AlertDialog>
                          <DropdownMenu :modal="showMod">
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

                              <nuxt-link
                                :to="`/admin/product-management/products/${product._id}`"
                                ><DropdownMenuItem
                                  >View
                                </DropdownMenuItem></nuxt-link
                              >
                              <nuxt-link
                                :to="`/admin/product-management/products/edit/${product._id}`"
                                ><DropdownMenuItem
                                  >Edit
                                </DropdownMenuItem></nuxt-link
                              >
                              <DropdownMenuItem>
                                <AlertDialogTrigger>Delete</AlertDialogTrigger>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle
                                >Are you absolutely sure?</AlertDialogTitle
                              >
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                class="bg-red-500 text-white"
                                @click="deleteProduct(product._id)"
                                variant="destructive"
                                >Delete</AlertDialogAction
                              >
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div class="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of
                  <strong>{{ products.length }}</strong>
                  products
                </div>
                <Pagination
                  v-slot="{ page }"
                  :items-per-page="10"
                  :total="products.length"
                  :sibling-count="1"
                  show-edges
                  :default-page="1"
                >
                  <PaginationList
                    v-slot="{ items }"
                    class="flex items-center gap-1"
                  >
                    <PaginationFirst />
                    <PaginationPrev />

                    <template v-for="(item, index) in items">
                      <PaginationListItem
                        v-if="item.type === 'page'"
                        :key="index"
                        :value="item.value"
                        as-child
                      >
                        <Button
                          class="w-9 h-9 p-0"
                          @click="goToPage(item.value)"
                          :variant="item.value === page ? 'default' : 'outline'"
                        >
                          {{ item.value }}
                        </Button>
                      </PaginationListItem>
                      <PaginationEllipsis
                        v-else
                        :key="item.type"
                        :index="index"
                      />
                    </template>

                    <PaginationNext />
                    <PaginationLast />
                  </PaginationList>
                </Pagination>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  </div>
</template>
