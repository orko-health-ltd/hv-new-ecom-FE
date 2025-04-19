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
                    <Label for="first-name">Format</Label>
                    <Select v-model="product.format">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectLabel>Format</SelectLabel>
                        <SelectItem
                          v-for="format in formats"
                          :key="format"
                          :value="format"
                        >
                          {{ format }}
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
                    <Label for="sku">Features</Label>
                    <TagsInput v-model="product.features">
                      <TagsInputItem
                        v-for="item in product.features"
                        :key="item"
                        :value="item"
                      >
                        <TagsInputItemText />
                        <TagsInputItemDelete />
                      </TagsInputItem>
                      
                      <TagsInputInput placeholder="Product Tags..." />
                    </TagsInput>
                  </div>
                  <div class="grid gap-2">
                    <Label for="sku">Ingredients</Label>
                    <TagsInput v-model="product.ingredients">
                      <TagsInputItem
                        v-for="item in product.ingredients"
                        :key="item"
                        :value="item"
                      >
                        <TagsInputItemText />
                        <TagsInputItemDelete />
                      </TagsInputItem>
                      
                      <TagsInputInput placeholder="Product Tags..." />
                    </TagsInput>
                  </div>
                  <div class="col-span-2 gap-2">
                    <Label for="sku">Brewing Guides</Label>
                    <TagsInput v-model="product.brewing_guide" class="h-[90px] items-start">
                      <TagsInputItem
                        v-for="item in product.brewing_guide"
                        :key="item"
                        :value="item"
                      >
                        <TagsInputItemText />
                        <TagsInputItemDelete />
                      </TagsInputItem>
                      
                      <TagsInputInput placeholder="Brewing Guides..." />
                    </TagsInput>
                  </div>
                  <div class="grid gap-2">
                    <Label for="last-name">Front Image</Label>
                    <Input
                      id="last-name"
                      type="file"
                      @change="(event: Event) => handleFileChange(event, product, 'front_image')"
                    />
                  </div>
                 <NuxtImg
              :src="`/halda/${product.front_image}`"
              :alt="product.name"
                    class="w-auto h-20"
                  />
                  <div class="grid gap-2">
                    <Label for="last-name">Back Image</Label>
                    <Input
                      id="last-name"
                      type="file"
                      @change="(event: Event) => handleFileChange(event, product, 'back_image')"
                    />
                  </div>
                  <img
                    :src="
                      back_image
                        ? back_image
                        : $config.public.apiBase+'/'+product.back_image
                    "
                    alt="Product Image"
                    class="w-auto h-20"
                  />
                  <div class="grid gap-2">
                    <Label for="last-name">Thumbnail Images</Label>
                    <Input
                      id="last-name" multiple
                      type="file"
                      @change="(event: Event) => uploadImage(event)"
                    />
                  </div>
                  <div class="grid items-center justify-center grid-cols-4 gap-2">
                     <div v-for="image in (product.product_images as Array<{url: string,_id:string}>)" class="relative w-20 h-20" :class="deleting == image._id ? 'opacity-50 animate-pulse' : ''">
                    <button @click="deleteImage(image)" type="button" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                        x
                      </button>
                    <AdminTableImage  :image="image.url" :key="image.url" />
                   
                      
                      <!-- <img
                        :src="
                          image
                            ? image
                            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s'
                        "
                        alt="Product Image"
                        class="w-auto h-20"
                      /> -->
                    </div>                  </div>
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
  format: '',
  features: [],
  description: '',
  ingredients: [],
  brewing_guide: [],
  front_image: '',
  back_image: ''
})

const getProduct = async () => {
  try {
    const { data } = await $fetch<{ data: Product }>(`/api/admin/products/${route.params.id}`)
    console.log(data)
    if (data) {
      product.value = data
      console.log(product.value)
    }
  } catch (error) {
    console.error('Error fetching product:', error)
  }
}
const getSkus = async () => {
  try {
    const { data } = await $fetch<{ data: Sku[] }>(
      '/api/admin/sku'
    )
    await nextTick()
    if (data.length) {
      skus.value = data
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
    const { data } = await $fetch<{ data: Brand[] }>(
      '/api/admin/brands'
    )

    if (data.length) {
      brands.value = data
    } else {
      console.log('No Brands found')
     
    }
  } catch (error) {
    console.error('Error fetching Brands:', error)
  }
}

const getCategories = async () => {
  try {
    const { data } = await $fetch<{ data: Sku[] }>(
      '/api/admin/categories'
    )

    if (data.length) {
      categories.value = data
    } else {
      console.log('No Categories found')
    
    }
  } catch (error) {
    console.error('Error fetching Categories:', error)
  }
}

const updateProduct = async () => {
  try {
    updating.value = true;
    const formData = new FormData();
    console.log(images.value.length)
    Object.entries(product.value).forEach(([key, value]) => {
      // if (Array.isArray(value)) {
      //   value.forEach((file, index) => {
      //     formData.append(`${key}[${index}]`, file);
      //   });
      // } else if (value !== null && value !== undefined) {
      //   formData.append(key, value.toString());
      // }
      if (key == 'front_image' || key == 'back_image') {
                if (value instanceof File || value instanceof Blob) {
                  formData.append(key, value);
                }
              }
      //   else if (key == 'product_images' && Array.isArray(value) && images.value.length > 0) {
      //   value.forEach((file, index) => {
      //     formData.append(`${key}[${index}]`, file);
      //   });
      // }
     
      else if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      }
      else if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    const {data,error} = await useFetch(`/api/admin/products/edit`, {
      method: "POST",
      body: formData,
    });
    // console.log(response)
    if (error.value)
    {
      toast.add({ title: "Error updating product", color: "red", timeout: 1500 });
      updating.value = false;
      return 0
    }
   
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
  console.log(files, property)
  if (property == 'product_images' &&files && files.length > 0) {
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
  else if(property == 'front_image' && files && files.length > 0) {
    targetObject[property] = files[0]
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        front_image.value = e.target.result
      }
    }
    reader.readAsDataURL(files[0])
     }
  else if(property == 'back_image' && files && files.length > 0) {
    targetObject[property] = files[0]
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        back_image.value = e.target.result
      }
    }
    reader.readAsDataURL(files[0])
  }
     console.log(typeof(targetObject[property]),product.value)
}
const uploadImage = async (
  event: Event,
) => {
  const formData = new FormData();
  const target = event.target as HTMLInputElement
  const files = target.files

  if (files && files.length > 0) {
    Array.from(files).forEach((file: File, index: number) => {
      formData.append(`product_images[${index}]`, file);
      formData.append(`product_id`, product.value._id);
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

    try {
      const response = await fetch(`/api/admin/products/addImage`, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Failed to upload images');
      }
      getProduct()
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  }
} 
const deleteImage = async (image: { _id: string }) => {
  deleting.value = image._id;
   try {
     const formData = new FormData();
     console.log(image._id,product.value._id)
     formData.append('image_id', image._id);
    formData.append('product_id', product.value._id);
    const response = await useFetch(`/api/admin/products/imageDelete`, {
      method: 'POST',
      body: {
        image_id: image._id,
        product_id: product.value._id
      
      }
    });
    // if (!response.ok) {
    //   throw new Error('Failed to delete image');
    // }
    // else
     getProduct()
     setTimeout(() => {
      deleting.value = '';
    }, 5000);
    // deleting.value = '';
  } catch (error) {
    console.error('Error deleting image:', error);
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
