<template>
  <div>
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
            <form @submit.prevent="createCategory" class="grid gap-4">
              <CardContent>
                <div class="grid grid-cols-2 gap-4">
                  <div class="grid gap-2">
                    <Label for="first-name">Brand</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectLabel>North America</SelectLabel>
                        <SelectItem value="est">
                          Eastern Standard Time (EST)
                        </SelectItem>
                        <SelectItem value="cst">
                          Central Standard Time (CST)
                        </SelectItem>
                        <SelectItem value="mst">
                          Mountain Standard Time (MST)
                        </SelectItem>
                        <SelectItem value="pst">
                          Pacific Standard Time (PST)
                        </SelectItem>
                        <SelectItem value="akst">
                          Alaska Standard Time (AKST)
                        </SelectItem>
                        <SelectItem value="hst">
                          Hawaii Standard Time (HST)
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
                        <SelectLabel>North America</SelectLabel>
                        <SelectItem value="est">
                          Eastern Standard Time (EST)
                        </SelectItem>
                        <SelectItem value="cst">
                          Central Standard Time (CST)
                        </SelectItem>
                        <SelectItem value="mst">
                          Mountain Standard Time (MST)
                        </SelectItem>
                        <SelectItem value="pst">
                          Pacific Standard Time (PST)
                        </SelectItem>
                        <SelectItem value="akst">
                          Alaska Standard Time (AKST)
                        </SelectItem>
                        <SelectItem value="hst">
                          Hawaii Standard Time (HST)
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
                <div v-for="sku in skus" :key="sku.name" class="flex flex-col">
                  <div class="flex gap-2 justify-between items-center">
                    <div class="grid gap-2">
                      <Label for="last-name">SKU</Label>
                      <Input id="last-name" type="text" required />
                    </div>
                    <div class="grid gap-2">
                      <Label for="last-name">Weight</Label>
                      <Input id="last-name" type="text" required />
                    </div>
                    <div class="grid gap-2">
                      <Label for="last-name">Price</Label>
                      <Input id="last-name" type="number" required />
                    </div>
                    <div class="grid gap-2">
                      <Label for="last-name">Quantity</Label>
                      <Input id="last-name" type="text" required />
                    </div>
                    <div class="grid gap-2">
                      <Label for="last-name">Image</Label>
                      <Input id="last-name" type="file" required />
                    </div>
                  </div>
                </div>
                <div
                  class="grid justify-center items-center py-3 mx-auto gap-2"
                >
                  <Button
                    class="bg-violet-500 text-white"
                    type="button"
                    @click="addEmptySku"
                    ><PlusIcon /> Add New SKU</Button
                  >
                </div>
              </CardContent>
              <CardFooter>
                <Button class="text-white" :disabled="creating">
                  <Loader2 v-if="creating" class="w-4 h-4 mr-2 animate-spin" />
                  Create Product</Button
                >
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PlusIcon } from 'lucide-vue-next'
import Select from '~/components/ui/select/Select.vue'
import SelectContent from '~/components/ui/select/SelectContent.vue'
import SelectItem from '~/components/ui/select/SelectItem.vue'
import SelectLabel from '~/components/ui/select/SelectLabel.vue'
import SelectTrigger from '~/components/ui/select/SelectTrigger.vue'
import SelectValue from '~/components/ui/select/SelectValue.vue'
import TagsInput from '~/components/ui/tags-input/TagsInput.vue'
import TagsInputInput from '~/components/ui/tags-input/TagsInputInput.vue'
import TagsInputItem from '~/components/ui/tags-input/TagsInputItem.vue'
import TagsInputItemDelete from '~/components/ui/tags-input/TagsInputItemDelete.vue'
import TagsInputItemText from '~/components/ui/tags-input/TagsInputItemText.vue'
import Textarea from '~/components/ui/textarea/Textarea.vue'
const modelValue = ref([])
const skus = ref([
  {
    sku: '',
    weight: '',
    price: '',
    quantity: '',
    image: '',
  },
])
const addEmptySku = () => {
skus.value.push( {
    sku: '',
    weight: '',
    price: '',
    quantity: '',
    image: '',
  })
}
const product = ref({
  isActibe: true,
})
definePageMeta({
  layout: 'admin',
})
</script>

<style></style>
