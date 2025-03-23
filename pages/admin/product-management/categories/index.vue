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
interface Category {
  _id: string
  name: string
  image: string
  description: string
  is_active: boolean
}
const toast = useToast()
const showCreateForm = ref(false)
const showEditForm = ref(false)
const creating = ref(false)
const loading = ref(false)
const category = ref<Category>({
  _id: '',
  name: '',
  image: '',
  description: '',
  is_active: true,
})
const image = ref('')
const handleFileChange = (
  event: Event,
  targetObject: Record<string, any>,
  property: string
): void => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    targetObject[property] = files[0]

    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        image.value = e.target.result
      }
    }
    reader.readAsDataURL(files[0])
  }
}
const { data, refresh } = useFetch<{ data: Category[] }>(
  '/api/admin/categories'
)
const categories = computed(() => data.value?.data || [])
const createCategory = async () => {
  loading.value = true
  try {
    const formData = new FormData()

    formData.append('name', category.value.name)
    formData.append('image', category.value.image)
    formData.append('description', category.value.description)
    formData.append('is_active', category.value.is_active.toString())
    await $fetch('/api/admin/categories/create', {
      method: 'POST',
      body: formData,
    })
    category.value = {
      _id: '',
      name: '',
      description: '',
      image: '',
      is_active: true,
    }
    toast.add({
      title: 'Category Added Successfully',
      color: 'green',
      timeout: 1500,
    })

    refresh()
    setTimeout(() => {
      showCreateForm.value = false
    }, 1000)
  } catch (error) {
    console.log(error)
  }
  loading.value = true
}
const updateCategory = async () => {
  console.log('xsc')
  loading.value = true
  try {
    await $fetch('/api/admin/categories/' + category.value._id, {
      method: 'POST',
      body: category.value,
    })
    category.value = {
      _id: '',
      name: '',
      description: '',
      image: '',
      is_active: true,
    }
    toast.add({
      title: 'Category Updated Successfully',
      color: 'green',
      timeout: 1500,
    })

    refresh()
    setTimeout(() => {
      showEditForm.value = false
    }, 1000)
  } catch (error) {
    console.log(error)
  }
  loading.value = true
}
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
                <nuxt-link to="/admin/product-management/categories"
                  >All Categories</nuxt-link
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
              <Button
                size="sm"
                :disabled="showEditForm"
                @click="showCreateForm = !showCreateForm"
                class="h-7 bg-blue-500 hover:bg-blue-700 text-white gap-1"
              >
                <PlusCircle class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Category
                </span>
              </Button>
            </div>
          </div>
          <div class="mt-3" v-if="showCreateForm || showEditForm">
            <Card>
              <CardHeader>
                <CardTitle>{{
                  showEditForm ? 'Update Category' : 'Add Category'
                }}</CardTitle>
                <CardDescription>
                  {{
                    showEditForm
                      ? 'Update Category data to manage and identify products'
                      : 'Add new categories to manage your products.'
                  }}
                </CardDescription></CardHeader
              >
              <form
                @submit.prevent="
                  showEditForm ? updateCategory() : createCategory()
                "
                class="grid gap-4"
              >
                <CardContent>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="grid gap-2">
                      <Label for="first-name">Category name</Label>
                      <Input
                        id="first-name"
                        v-model="category.name"
                        required
                        placeholder="Category"
                      />
                    </div>
                    <div class="grid gap-2">
                      <Label for="description">Category Description</Label>
                      <Textarea
                        id="description"
                        v-model="category.description"
                        required
                        placeholder="Category"
                      />
                    </div>

                    <div class="grid gap-2">
                      <Label for="last-name">Image</Label>
                      <Input
                        id="last-name"
                        type="file"
                        @change="(event: Event) => handleFileChange(event, category, 'image')"
                        required
                      />
                    </div>
                    <img
                      :src="
                        image
                          ? image
                          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s'
                      "
                      alt="Product Image"
                      class="w-auto h-20"
                    />
                  </div>
                </CardContent>
                <CardFooter class="gap-3">
                  <Button type="submit" class="text-white" :disabled="creating">
                    <Loader2
                      v-if="creating"
                      class="w-4 h-4 mr-2 animate-spin"
                    />
                    {{
                      showEditForm ? 'Update Category' : 'Add Category'
                    }}</Button
                  >
                  <Button
                    type="button"
                    variant="outline"
                    @click="
                      ;(showEditForm = false),
                        (showCreateForm = false),
                        (category = {
                          _id: '',
                        name: '',
                          description: '',
                          image: '',
                          is_active: false,
                        })
                    "
                    >Cancel</Button
                  >
                </CardFooter>
              </form>
            </Card>
          </div>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>
                  Manage your categories and view their sales performance.
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
                        Description
                      </TableHead>
                      <TableHead>
                        <span class="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow
                      v-for="categoryData in categories"
                      :key="categoryData._id"
                    >
                      <TableCell class="hidden sm:table-cell">
                        <img
                          alt="Product image"
                          class="aspect-square rounded-md object-cover"
                          height="64"
                          :src="categoryData.image ? $config.public.apiBase+'/'+categoryData.image :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s'"
                          width="64"
                        />
                      </TableCell>
                      <TableCell class="font-medium">
                        {{ categoryData.name }}
                      </TableCell>
                      <TableCell>
                        <Badge
                          :variant="
                            categoryData.is_active ? null : 'destructive'
                          "
                        >
                          {{ categoryData.is_active ? 'Active' : 'Inactive' }}
                        </Badge>
                      </TableCell>
                   
                      <TableCell class="hidden md:table-cell"> {{ categoryData.description }} </TableCell>
                    
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
                            <DropdownMenuItem
                              @click="
                                ;(category = categoryData),
                                  (showEditForm = true)
                              "
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
