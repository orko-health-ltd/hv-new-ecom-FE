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
                    >Products</nuxt-link
                  >
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink as-child>
                  <nuxt-link :to="`/admin/product-management/products/${route.params.id}`"
                    >View Product</nuxt-link
                  >
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
       
        </header>
        <div class="mt-3">




          <Card class="bg-white rounded-lg shadow-md">
            <CardHeader class="border-b border-gray-200 p-6">
              <CardTitle class="text-2xl font-bold text-gray-800">View Product</CardTitle>
              <CardDescription class="text-gray-600">
                View product to manage your stocks.
              </CardDescription></CardHeader
            >
            






            <div class="grid gap-6">
              <CardContent class="p-6">
                <div class="grid grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <Label for="first-name" class="text-sm font-medium text-gray-700">Brand</Label>
                   <h1 class="text-lg font-semibold text-gray-900">{{product.brand_info?.name}}</h1>
                  </div>




                  <div class="space-y-2">
                    <Label for="first-name" class="text-sm font-medium text-gray-700">Category</Label>
                     <h1 class="text-lg font-semibold text-gray-900">{{product.category_info?.name}}</h1>
                  </div>



                  <div class="space-y-2">
                    <Label for="first-name" class="text-sm font-medium text-gray-700">SKU</Label>
                      <h1 class="text-lg font-semibold text-gray-900">{{product.sku_info?.name}}</h1>
                  </div>



                  <div class="space-y-2">
                    <Label for="first-name" class="text-sm font-medium text-gray-700">Format</Label>
                     <h1 class="text-lg font-semibold text-gray-900">{{product.format}}</h1>
                  </div>



                  <div class="space-y-2">
                    <Label for="last-name" class="text-sm font-medium text-gray-700">Name</Label>
                    <h1 class="text-lg font-semibold text-gray-900">{{product.name}}</h1>
                  </div>
                  <div class="space-y-2">
                    <Label for="last-name" class="text-sm font-medium text-gray-700">Current Stock</Label>
                    <h1 class="text-lg font-semibold text-gray-900">{{product.stock}}</h1>
                  </div>



                  <div class="col-span-2 space-y-2">
                    <Label for="last-name" class="text-sm font-medium text-gray-700">Specification</Label>
                    <p class="text-gray-700"
                      > {{product.specification}}
                    </p>
                  </div>



                  <div class="space-y-2">
                    <Label for="last-name" class="text-sm font-medium text-gray-700">Price</Label>
                   <h1 class="text-lg font-semibold text-gray-900">{{product.price}}</h1>
                  </div>



                  <div class="space-y-2">
                    <Label for="last-name" class="text-sm font-medium text-gray-700">Discount</Label>
                   <h1 class="text-lg font-semibold text-gray-900">{{product.discount}}</h1>
                  </div>



                  <div class="space-y-2">
                    <Label for="last-name" class="text-sm font-medium text-gray-700">Discount Unit</Label>
                    <h1 class="text-lg font-semibold text-gray-900">{{product.discount_unit}}</h1>
                  </div>


                  <div class="space-y-2 flex flex-col">
                    <Label for="last-name" class="text-sm font-medium text-gray-700">Is Active</Label>
                    <Switch disabled
                      @update:checked="product.is_active = !product.is_active"
                      :checked="product.is_active"
                      class="mt-1"
                    />
                  </div>


                  <div class="space-y-2 flex flex-col">
                    <Label for="last-name" class="text-sm font-medium text-gray-700">Is Featured</Label>
                    <Switch disabled
                      :checked="product.is_featured"
                      @update:checked="
                        product.is_featured = !product.is_featured
                      "
                      class="mt-1"
                    />
                  </div>


                  <div class="space-y-2 flex flex-col">
                    <Label for="last-name" class="text-sm font-medium text-gray-700">Is Combo</Label>
                    <Switch disabled
                      :checked="product.is_combo"
                      @update:checked="product.is_combo = !product.is_combo"
                      class="mt-1"
                    />
                  </div>



                  <div class="space-y-2">
                    <Label for="sku" class="text-sm font-medium text-gray-700">Features</Label>
                    <ul class="list-disc pl-5 text-gray-700">
                      <li  v-for="item in product.features"
                        :key="item"
                        :value="item">{{item}}</li>
                    </ul>

                  </div>



                  <div class="space-y-2">
                    <Label for="sku" class="text-sm font-medium text-gray-700">Ingredients</Label>
                    <ul class="list-disc pl-5 text-gray-700">
                      <li v-for="item in product.ingredients"
                        :key="item">
                      {{item}}
                      </li>
                    </ul>

                  </div>



                  <div class="col-span-2 space-y-2">
                    <Label for="sku" class="text-sm font-medium text-gray-700">Brewing Guides</Label>
                    <ul class="list-decimal pl-5 text-gray-700">
                      <li v-for="item in product.brewing_guide"
                        :key="item">{{item}}</li>
                    </ul>

                  </div>



                  <div class="space-y-2">
                    <Label for="last-name" class="text-sm font-medium text-gray-700">Front Image</Label>
                   <NuxtImg  format="webp" :src="`/halda/${product.front_image}`" class="rounded-lg shadow-sm" />
                  </div>
                


                  <div class="space-y-2">
                    <Label for="last-name" class="text-sm font-medium text-gray-700">Back Image</Label>
                     <NuxtImg

 format="webp"


                      :src="`/halda/${product.back_image}`"
                      :alt="product.name"
                      class="w-auto h-20 rounded-lg shadow-sm"
                    />
                  </div>
                


                  <div class="col-span-2 space-y-2">
                    <Label for="last-name" class="text-sm font-medium text-gray-700">Thumbnail Images</Label>
                  

                  <div class="grid items-center justify-center grid-cols-6 gap-4">
                     <div v-for="image in (product.product_images as Array<{url: string,_id:string}>)" class="relative w-20 h-20" :class="deleting == image._id ? 'opacity-50 animate-pulse' : ''">
                   

                    <AdminTableImage class="rounded-lg shadow-sm" :image="image.url" :key="image.url" />
                   


                           </div>  </div>
                </div>
                </div>
              </CardContent>


              <CardFooter class="border-t flex space-y-3 flex-col border-gray-200 p-6">
                <h1 class="text-2xl font-bold">Stock Log</h1>
                <Separator />
               <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead >
                      Date
                    </TableHead> <TableHead >
                      Quantity
                    </TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Reason</TableHead>
                   
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="stock in product.stock_info" :key="stock._id">
                    <TableCell class="font-medium">
                      {{ moment(stock.date).format('MMM DD, YYYY : hh:mm a') }}
                    </TableCell>
                     <TableCell>{{ stock.quantity }}</TableCell>
                    <TableCell>{{ stock.type }}</TableCell>
                    <TableCell>{{ stock.reason }}</TableCell>
                   
                   
                  </TableRow>
                </TableBody>
              </Table>
              </CardFooter>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </ClientOnly> 
</template>
<script lang="ts" setup>
import { Loader2 } from 'lucide-vue-next'
import Label from '~/components/ui/label/Label.vue'
import type { Product } from '~/types'
import moment from 'moment'
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
const product = ref<Product>({} as Product)
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
