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
                  <nuxt-link to="/admin/product-management/products/create"
                    >Create Product</nuxt-link
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
              <CardTitle>Create Product</CardTitle>
              <CardDescription>
                Create product to manage your stocks.
              </CardDescription></CardHeader
            >

            <div class="grid gap-4">
              <CardContent>
                <div class="grid grid-cols-2 gap-4">
                  <div class="grid gap-2">
                    <Label for="first-name">Brand</Label>
                    <Select v-model="selectedBrandId">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a brand">
                          {{
                            selectedBrand
                              ? selectedBrand.name
                              : 'Select a brand'
                          }}</SelectValue
                        >
                      </SelectTrigger>
                      <SelectContent>
                        <SelectLabel>Brands</SelectLabel>
                        <SelectItem
                          v-for="brand in brands"
                          :key="brand.id"
                          :value="brand.id">
                          {{ brand.name }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div class="grid gap-2">
                    <Label for="first-name">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem
                          v-for="category in categories"
                          :key="category.id"
                          :value="category.id">
                          {{ category.name }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div class="grid gap-2">
                    <Label for="last-name">Image</Label>
                    <Input id="last-name" type="file" required />
                  </div>
                  <div class="grid gap-2">
                    <Label for="last-name">Cover Image</Label>
                    <Input id="last-name" type="file" required />
                  </div>
                  <div class="grid gap-2">
                    <Label for="last-name">Details</Label>
                    <Textarea placeholder="Product Details." />
                  </div>

                  <div class="grid gap-2">
                    <Label for="sku">Tags</Label>
                    <TagsInput v-model="modelValue">
                      <TagsInputItem
                        v-for="item in modelValue"
                        :key="item"
                        :value="item"
                      >
                        <TagsInputItemText />
                        <TagsInputItemDelete />
                      </TagsInputItem>

                      <TagsInputInput placeholder="Product Tags..." />
                    </TagsInput>
                  </div>
                </div>
                <Separator class="my-4 col-span-2" label="SKU Section" />
                <div class="grid grid-cols-2">
                  <Label for="sku" class="text-gray-500">Add SKU</Label>
                </div>
                <form
                  @submit.prevent="addEmptySku"
                  class="grid grid-cols-4 gap-2 justify-between items-center"
                >
                  <div class="grid gap-2">
                    <Label for="last-name">SKU Name</Label>
                    <Input
                      v-model="sku.name"
                      id="last-name"
                      type="text"
                      required/>
                  </div>
                  <div class="grid gap-2">
                    <Label for="last-name">Color</Label>
                    <Input
                      v-model="sku.color"
                      id="last-name"
                      type="text"
                      required
                    />
                  </div>
                  <div class="grid gap-2">
                    <Label for="last-name">Selling Price</Label>
                    <Input
                      v-model="sku.selling_price"
                      id="last-name"
                      type="number"
                      required
                    />
                  </div>
                  <div class="grid gap-2">
                    <Label for="last-name">Discount</Label>
                    <Input
                      v-model="sku.discount"
                      id="last-name"
                      type="text"
                      required
                    />
                  </div>
                  <div class="grid gap-2">
                    <Label for="last-name">Is Active</Label>
                    <Switch @update:checked="sku.is_active = !sku.is_active" 
                      :checked="sku.is_active" />
                  </div>
                  <div class="grid gap-2">
                    <Label for="last-name">Is Featured</Label>
                    <Switch
                      :checked="sku.is_featured"
                      @update:checked="sku.is_featured = !sku.is_featured" />
                  </div>
                  <div class="grid gap-2">
                    <Label for="last-name">Is Combo</Label>
                    <Switch
                      :checked="sku.is_combo"
                      @update:checked="sku.is_combo = !sku.is_combo"
                    />
                  </div>
                  <div class="grid gap-2">
                    <Label for="last-name">Packing Type</Label>
                    <URadioGroup
                      :options="[
                        { value: 'sachet', label: 'Sachet' },
                        { value: 'pouch', label: 'Pouch' },
                      ]"
                      v-model="sku.packaging_type"
                    />
                  </div>
                  <div class="grid gap-2">
                    <Label for="last-name">Image</Label>

                    <Input
                      id="last-name"
                      type="file"
                      @change="(event) => handleFileChange(event, sku, 'image')"
                      required
                    />
                  </div>
                  <img
                    :src="
                      sku.image
                        ? sku.image
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s'
                    "
                    alt="SKU Image"
                    class="w-auto h-20"
                  />
                  <Button class="bg-violet-500 mt-7 text-white" type="submit"
                    ><PlusIcon /> Add SKU</Button
                  >
                </form>
                <div
                  class="border space-y-2 p-2 rounded-xl"
                  v-if="skus.length > 0">
                  <div
                    class="grid grid-cols-10 pt-4 justify-between items-center"
                  >
                    <Label for="last-name">Name</Label>
                    <Label for="last-name">Color</Label>
                    <Label for="last-name">Selling Price</Label>
                    <Label for="last-name">Discount</Label>
                    <Label for="last-name">Is Active</Label>
                    <Label for="last-name">Is Featured</Label>
                    <Label for="last-name">Is Combo</Label>
                    <Label for="last-name">Packing Type</Label>
                    <Label for="last-name">Image</Label>
                    <Label for="last-name">Action</Label>
                  </div>
                  <Separator />
                  <div
                    v-for="(skuData, index) in skus"
                    :key="skuData.name"
                    class="flex flex-col"
                  >
                    <div
                      class="grid grid-cols-10 pt-4 justify-between items-center">
                      <p>{{ skuData.name }}</p>
                      <p>{{ skuData.color }}</p>
                      <p>{{ skuData.selling_price }}</p>
                      <p>{{ skuData.discount }}</p>
                      <Switch :checked="skuData.is_active" />
                      <Switch :checked="skuData.is_featured" />
                      <Switch :checked="skuData.is_combo" />
                      <p>{{ skuData.packaging_type }}</p>
                      <img
                        v-if="skuData.image"
                        :src="skuData.image"
                        alt="SKU Image"
                        class="w-auto h-20"/>
                      <Button
                        class="bg-red-500 text-white"
                        type="button"
                        @click="skus.splice(index, 1)"><Trash2 /> Remove</Button
                      >
                    </div>
                  </div>
                </div>
                <div
                  class="grid justify-center items-center py-3 mx-auto gap-2"
                ></div>
              </CardContent>
              <CardFooter>
                <Button class="text-white" :disabled="creating">
                  <Loader2 v-if="creating" class="w-4 h-4 mr-2 animate-spin" />
                  Create Product</Button
                >
              </CardFooter>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
<script lang="ts" setup>
import {
  PlusIcon,
  Trash,
  Trash2,
  Search,
  Loader2,
  CircleUser,
} from 'lucide-vue-next'
import Label from '~/components/ui/label/Label.vue'

interface Brand {
  name: string
  id: number
  slug: string
}

interface Category {
  name: string
  id: number
}

interface Sku {
  name: string
  color: string
  selling_price: number
  discount: number
  is_active: boolean
  is_featured: boolean
  is_combo: boolean
  image: string
  packaging_type: string
}

interface Product {
  brand: Brand | Record<string, never>
}
const selectedBrandId = ref(null)
const modelValue = ref<string[]>([])
const creating = ref(false)
const brands = ref<Brand[]>([
  {
    name: 'Sokal Sondha Cha',
    id: 1,
    slug: 'ssc',
  },
  {
    name: 'Bikal Bondhu Cha',
    id: 2,
    slug: 'bbc',
  },
  {
    name: 'Dragon Well Green Tea',
    id: 3,
    slug: 'dwgt',
  },
  {
    name: 'Silver Needle White Tea',
    id: 4,
    slug: 'sewt',
  },
  {
    name: 'Red Lebel Olong Tea',
    id: 5,
    slug: 'rbot',
  },
  {
    name: 'Gift Box',
    id: 6,
    slug: 'bg',
  },
  {
    name: 'Halda Valley Black Tea',
    id: 7,
    slug: 'hvbt',
  },
])

const categories = ref<Category[]>([
  {
    name: 'Black Tea',
    id: 1,
  },
  {
    name: 'Special Tea',
    id: 2,
  },
  {
    name: 'Green Tea',
    id: 3,
  },
])

const sku = ref<Sku>({
  name: '',
  color: '',
  selling_price: 0,
  discount: 0,
  is_active: false,
  is_featured: false,
  is_combo: false,
  image: '',
  packaging_type: 'pouch',
})

const skus = ref<Sku[]>([])

const product = ref<Product>({
  brand: {},
})
const selectedBrand = computed(() => {
  return brands.value.find((brand) => brand.id === selectedBrandId.value)
})
const handleFileChange = (
  event: Event,
  targetObject: Record<string, any>,
  property: string
): void => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        targetObject[property] = e.target.result
      }
    }
    reader.readAsDataURL(file)
  }
}

const addEmptySku = (): void => {
  if (selectedBrand.value) {
    sku.value.name = selectedBrand.value.name + '-' + sku.value.name
    skus.value.push({ ...sku.value })
    sku.value = {
      name: '',
      color: '',
      selling_price: 0,
      discount: 0,
      is_active: false,
      is_featured: false,
      is_combo: false,
      image: '',
      packaging_type: 'pouch',
    }
  }
}

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})
</script>
<style></style>
