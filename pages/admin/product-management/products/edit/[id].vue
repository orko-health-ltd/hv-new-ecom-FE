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
                  <nuxt-link to="/admin/product-management/products"
                    >All Products</nuxt-link
                  >
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink as-child>
                  <nuxt-link to="/admin/product-management/products/edit"
                    >Edit Product</nuxt-link
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
              <CardTitle>Edit Product</CardTitle>
              <CardDescription>
                Edit product to manage your stocks.
              </CardDescription></CardHeader
            >
            
            <form @submit.prevent="updateProduct()" class="grid gap-4">
              <CardContent>
                <div class="grid grid-cols-2 gap-4">
                  <div class="grid gap-2">
                    <Label for="first-name">Brand</Label>
                    <Select v-model="product.brand_id">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectLabel>Brands</SelectLabel>
                        <SelectItem
                          v-for="brand in brands"
                          :key="brand._id"
                          :value="brand._id"
                        >
                          {{ brand.name }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div class="grid gap-2">
                    <Label for="first-name">Category</Label>
                    <Select v-model="product.category_id">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem
                          v-for="category in categories"
                          :key="category._id"
                          :value="category._id"
                        >
                          {{ category.name }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div class="grid gap-2">
                    <Label for="first-name">SKU</Label>
                    <Select v-model="product.sku_id">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a SKU" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectLabel>SKU</SelectLabel>
                        <SelectItem
                          v-for="sku in skus"
                          :key="sku._id"
                          :value="sku._id"
                        >
                          {{ sku.name }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div class="grid gap-2">
                    <Label for="last-name">Name</Label>
                    <Input
                      v-model="productName"
                      id="last-name"
                      type="text"
                      required
                      disabled
                    />
                  </div>
                  <div class="grid gap-2">
                    <Label for="last-name">Specification</Label>
                    <Textarea
                      v-model="product.specification"
                      placeholder="Product Details."
                    />
                  </div>
                  <div class="grid gap-2">
                    <Label for="last-name">Color</Label>
                    <Input
                      v-model="product.color"
                      id="last-name"
                      type="text"
                      required
                    />
                  </div>
                  <div class="grid gap-2">
                    <Label for="last-name">Price</Label>
                    <Input
                      v-model="product.price"
                      id="last-name"
                      type="number"
                      required
                    />
                  </div>
                  <div class="grid gap-2">
                    <Label for="last-name">Discount</Label>
                    <Input
                      v-model="product.discount"
                      id="last-name"
                      type="number"
                      required
                    />
                  </div>
                  <div class="grid gap-2">
                    <Label for="last-name">Discount Unit</Label>
                    <Select v-model="product.discount_unit">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Discount Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectLabel>Unit</SelectLabel>
                        <SelectItem value="percentage"> Percentage </SelectItem>
                        <SelectItem value="amount"> Amount </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div class="grid gap-2">
                    <Label for="last-name">Is Active</Label>
                    <Switch
                      @update:checked="product.is_active = !product.is_active"
                      :checked="product.is_active"
                    />
                  </div>
                  <div class="grid gap-2">
                    <Label for="last-name">Is Featured</Label>
                    <Switch
                      :checked="product.is_featured"
                      @update:checked="
                        product.is_featured = !product.is_featured
                      "
                    />
                  </div>
                  <div class="grid gap-2">
                    <Label for="last-name">Is Combo</Label>
                    <Switch
                      :checked="product.is_combo"
                      @update:checked="product.is_combo = !product.is_combo"
                    />
                  </div>
                  <div class="grid gap-2">
                    <Label for="last-name">Image</Label>
                    <Input
                      id="last-name" multiple
                      type="file"
                      @change="(event: Event) => handleFileChange(event, product, 'product_images')"
                    />
                  </div>
                  <!-- {{ product.product_images }} -->
                     <AdminTableImage v-for="image in (product.product_images as Array<{url: string}>)" :image="image.url" :key="image.url" />
                  <img v-for="image in images"
                    :src="
                      image
                        ? $config.public.apiBase+'/'+image
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s'
                    "

                    alt="Product Image"
                    class="w-auto h-20"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button class="text-white" :disabled="updating">
                  <Loader2 v-if="updating" class="w-4 h-4 mr-2 animate-spin" />
                  Update Product</Button
                >
              </CardFooter>
            </form>
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
}

const toast = useToast()
const route = useRoute()
const updating = ref(false)
const brands = ref<Brand[]>([])
const skus = ref<Sku[]>([])
const categories = ref<Category[]>([])
const images = ref<Array<string>>([])
const product = ref<Product>({
  _id: '',
  name: '',
  color: '',
  price: 0,
  specification: '',
  discount: 0,
  discount_unit: 'percentage',
  is_active: false,
  is_featured: false,
  is_combo: false,
  product_images: [],
  brand_id: '',
  sku_id: '',
  category_id: '',
 
})
const getProduct = async () => {
  try {
    const { data } = await useFetch<{ data: Product }>(`/api/admin/products/${route.params.id}`)
    console.log(data)
    if (data.value?.data) {
      product.value = data.value.data
      console.log(product.value)
      // if (data.value.data.product_images) {
      //   console.log(data.value.data.product_images)
      //   images.value = data.value.data.product_images
      // }
    }
  } catch (error) {
    console.error('Error fetching product:', error)
  }
}
const getSkus = async () => {
  try {
    const { data, refresh } = await useFetch<{ data: Sku[] }>(
      '/api/admin/sku',
      { immediate: true,
        watch: false,
      }
    )
    await nextTick()
    if (data.value?.data?.length) {
      skus.value = data.value.data
    }
  } catch (error) {
    console.error('Error fetching SKUs:', error)
  }
}

const productName = computed(() => {
  const brandName =
    brands.value.find((brand) => brand._id === product.value.brand_id)?.name ||
    ''
  const skuName =
    skus.value.find((sku) => sku._id === product.value.sku_id)?.name || ''
  const name = `${brandName} ${skuName}`.trim()
  product.value.name = name
  return name
})

const getBrands = async () => {
  try {
    const { data, refresh } = await useFetch<{ data: Sku[] }>(
      '/api/admin/brands',
      {
        immediate: true,
        watch: false,
      }
    )

    if (data.value?.data?.length) {
      brands.value = data.value.data
    } else {
      console.log('No Brands found')
      await refresh()
    }
  } catch (error) {
    console.error('Error fetching Brands:', error)
  }
}

const getCategories = async () => {
  try {
    const { data, refresh } = await useFetch<{ data: Sku[] }>(
      '/api/admin/categories',
      {
        immediate: true,
        watch: false,
      }
    )

    if (data.value?.data?.length) {
      categories.value = data.value.data
    } else {
      console.log('No Categories found')
      await refresh()
    }
  } catch (error) {
    console.error('Error fetching Categories:', error)
  }
}

const updateProduct = async () => {
  try {
    updating.value = true;
    const formData = new FormData();

    Object.entries(product.value).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((file, index) => {
          formData.append(`${key}[${index}]`, file);
        });
      } else if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    const { data, error } = await useFetch(`/api/admin/products/edit`, {
      method: "POST",
      body: formData,
    });
    getProduct();
    toast.add({ title: "Product updated successfully", color: "green", timeout: 1500 });
    // navigateTo("/admin/product-management/products");
  } catch (error) {
    console.error("Error updating product:", error);
    toast.add({ title: "Error updating product", color: "red", timeout: 1500 });
  }
  updating.value = false;
};

const handleFileChange = (
  event: Event,
  targetObject: Record<string, any>,
  property: string
): void => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    targetObject[property] = Array.from(files)

    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          if (!Array.isArray(images.value)) {
            images.value = []
          }
          images.value.push(e.target.result)
        }
      }
      reader.readAsDataURL(file)
    })
  }
}

onMounted(() => {
  getProduct()
  getSkus()
  getBrands()
  getCategories()
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})
</script>