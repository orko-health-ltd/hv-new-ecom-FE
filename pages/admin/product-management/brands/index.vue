<script setup lang="ts">
import {
  CircleUser,
  File,
  ListFilter,
  Loader2,
  MoreHorizontal,
  PlusCircle,
  Search
} from 'lucide-vue-next'
interface Brand {
  _id:string,
  name: string,
  short_name: string,
  // image: string,
  is_active:boolean
}
const toast = useToast()
const showCreateForm = ref(false)
const showEditForm = ref(false)
const creating = ref(false)
const loading = ref(false)
const brand = ref<Brand>({
  _id:'',
  name: '',
  short_name: '',
  // image:'',
  is_active: true,  
})
const { data, refresh } = useFetch<{ data: Brand[] }>('/api/admin/brands')
const brands = computed(() => data.value?.data || [])
const setShortName = () => {
  console.log(brand.value.name)
  brand.value.short_name = brand.value.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('')
}
const createBrand = async () => {
  loading.value = true
  try {
    await $fetch('/api/admin/brands/create', {
      method: 'POST',
      body: brand.value,
    })
    brand.value = {
      _id:'',
      name: '',
      // image: '',
      short_name: '',
      is_active: true,
    }
    toast.add({ title: 'Brand Added Successfully', color: 'green', timeout: 1500 })
    
    refresh()
    setTimeout(() => {
      showCreateForm.value = false
    }, 1000)
  } catch (error) {
    console.log(error)
  }
   loading.value = true 
}
const updateBrand = async () => {
 setShortName()
  loading.value = true
  try {
    await $fetch('/api/admin/brands/'+brand.value._id, {
      method: 'POST',
      body: brand.value,
    })
    brand.value = {
      _id:'',
      name: '',
      // image: '',
      short_name: '',
      is_active: true,
    }
    toast.add({ title: 'Brand Updated Successfully', color: 'green', timeout: 1500 })
    
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
  middleware: ['auth']
})
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-muted/40">
 
    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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
                <nuxt-link to="/admin/product-management/brands">All Brands</nuxt-link>
              </BreadcrumbLink>
            </BreadcrumbItem>
           
          </BreadcrumbList>
        </Breadcrumb>
        <div class="relative ml-auto flex-1 md:grow-0">
          <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
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
              <TabsTrigger value="all">
                All
              </TabsTrigger>
              <TabsTrigger value="active">
                Active
              </TabsTrigger>
              <TabsTrigger value="draft">
                Draft
              </TabsTrigger>
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
                  <DropdownMenuItem checked>
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem>Draft</DropdownMenuItem>
                  <DropdownMenuItem>
                    Archived
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" class="h-7 gap-1">
                <File class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <Button size="sm" :disabled="showEditForm" @click="showCreateForm = !showCreateForm" class="h-7 bg-blue-500 hover:bg-blue-700 text-white gap-1">
                <PlusCircle class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Brand
                </span>
              </Button>
            </div>
          </div>
           <div class="mt-3" v-if="showCreateForm || showEditForm">
            <Card>
                <CardHeader>
                   <CardTitle>{{showEditForm ? 'Update Brand' : 'Add Brands'}}</CardTitle>
                <CardDescription>
                {{ showEditForm ? 'Update Brand data to manage and identify products':'Add new brands to manage your products.' }} 
                </CardDescription></CardHeader>
                <form @submit.prevent="showEditForm ? updateBrand() : createBrand()" class="grid gap-4">
                <CardContent>

                     <div class="grid grid-cols-3 gap-4">
          <div class="grid gap-2">
            <Label for="first-name">Brand name</Label>
            <Input id="first-name" v-model="brand.name" @change="setShortName()" required placeholder="Brand"  />
          </div>
          <div class="grid gap-2">
            <Label for="last-name">Short Name</Label>
            <Input id="last-name" v-model="brand.short_name" disabled placeholder="Short Name"  />
          </div>
            <div class="grid ps-10 gap-2">
               <Label for="airplane-mode">Is Active</Label>
               <Switch id="airplane-mode"  v-model="brand.is_active"
                @update:model-value="brand.is_active = !brand.is_active" />
                {{ brand.is_active }}
             
            </div>
          <!-- <div class="grid gap-2">
            <Label for="last-name">Brand Image</Label>
            <Input id="last-name" v-model="brand.image" type="file"  />
          </div> -->
        </div>
                </CardContent>
                <CardFooter class="gap-3">
                    <Button type="submit" class="text-white" :disabled="creating"> <Loader2 v-if="creating" class="w-4  h-4 mr-2 animate-spin" />
                      {{ showEditForm ? 'Update Brand' : 'Add Brand' }}</Button>
                      <Button type="button" variant="outline" @click="showEditForm = false, showCreateForm = false, brand={_id: '', name: '', short_name: '', is_active: false}">Cancel</Button>
                </CardFooter>
                </form>
            </Card>
        </div>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Brands</CardTitle>
                <CardDescription>
                  Manage your brands and view their sales performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                     
                      <TableHead>Name</TableHead>
                      <TableHead>Short Name</TableHead>
                      <TableHead>Status</TableHead>
                     
                      <TableHead>
                        <span class="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                  
                    <TableRow v-for="brandData in brands" :key="brandData._id">
                    
                      <TableCell class="font-medium">
                        {{  brandData.name }}
                      </TableCell>
                      <TableCell class="font-medium">
                        {{  brandData.short_name }}
                      </TableCell>
                      <TableCell>
                        <Badge :variant="brandData.is_active?null:'destructive'">
                         {{ brandData.is_active?'Active':'Inactive' }}
                        </Badge>
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
                            <DropdownMenuItem @click="brand = brandData, showEditForm = true">Edit</DropdownMenuItem>
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