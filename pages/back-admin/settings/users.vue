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
interface User {
  _id: string
  name: string
  email: string
  password:string
  confirm_password: string
  role: string
  role_name: string
}
const user = ref<User>({
  _id: '',
  name: '',
  email: '',
  password: '',
  confirm_password: '',
  role_name: '',
  role: '',
})
const toast = useToast()
const showCategoryForm = ref(false)
const creating = ref(false)
const createCategory = async () => {
  creating.value = true
  try {
    if (!user.value.name || !user.value.email || !user.value.password || !user.value.confirm_password) {
      toast.add({
        title: 'Please fill all fields',
        color: 'red',
        timeout: 1500,
      })
      return
    }
    if (user.value.password !== user.value.confirm_password) {
      toast.add({
        title: 'Passwords do not match',
        color: 'red',
        timeout: 1500,
      })
      return
    }
    const { data, error } = await useFetch('/api/back-admin/users/create', {
      method: 'POST',
      body: user.value,
    })
    if (error.value) {
      console.error('Error creating user:', error.value)
      toast.add({
        title: 'Error creating user',
        color: 'red',
        timeout: 1500,
      })
      return
    }
    toast.add({
        title: 'User Created Successfully',
        color: 'green',
        timeout: 1500,
      })
      refresh()
    showCategoryForm.value = false
  } catch (error) {
    console.log(error)
  } finally {
    creating.value = false
  }
}
// const users = ref<User[]>([])
const { data, refresh } = useFetch<{ user: User[] }>('/api/back-admin/users')
const users = computed(() => data.value?.user || [])

// const getUsers = async () => {
//   try {
//     const { data, error } = await useFetch<{ user: User[] }>('/api/back-admin/users')

//     if (error.value) {
//       console.error('Error fetching users:', error.value)
//       return
//     }

//     users.value = data.value?.user || []
//   } catch (err) {
//     console.error('Unexpected error:', err)
//   }
// }

// onMounted(()=>{
//   getUsers()
// })
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
                <nuxt-link to="/back-admin/product-management/categories"
                  >All Users</nuxt-link
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
                @click="showCategoryForm = !showCategoryForm"
                class="h-7 bg-blue-500 hover:bg-blue-700 text-white gap-1"
              >
                <PlusCircle class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add User
                </span>
              </Button>
            </div>
          </div>
          <div class="mt-3" v-if="showCategoryForm">
            <Card>
              <CardHeader>
                <CardTitle>Add User</CardTitle>
                <CardDescription>
                  Add new categories to manage your products.
                </CardDescription></CardHeader
              >
              <form @submit.prevent="createCategory" class="grid gap-4">
                <CardContent>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="grid gap-2">
                      <Label for="first-name">User name</Label>
                      <Input id="first-name" v-model="user.name" placeholder="Name" required />
                    </div>
                    <div class="grid gap-2">
                      <Label for="first-name">User Email</Label>
                      <Input id="first-name" v-model="user.email" type="email" placeholder="Email" required />
                    </div>
                    <div class="grid gap-2">
                      <Label for="first-name"> Password</Label>
                      <Input id="first-name" v-model="user.password" type="password" placeholder="Password" required />
                    </div>
                    <div class="grid gap-2">
                      <Label for="first-name">Confirm Password</Label>
                      <Input id="first-name" v-model="user.confirm_password" type="password" placeholder="Confirm Password" required />
                    </div>
                   
                  </div>
                </CardContent>
                <CardFooter class="gap-3">
                  <Button class="text-white" :disabled="creating">
                    <Loader2
                      v-if="creating"
                      class="w-4 h-4 mr-2 animate-spin"
                    />
                    Add User</Button
                  >
                  <Button
                    @click="showCategoryForm = !showCategoryForm"
                    class="text-white"
                    type="button"
                    variant="destructive"
                  >
                    Cancel</Button
                  >
                </CardFooter>
              </form>
            </Card>
          </div>
          <TabsContent value="all">
            <!-- {{data}} -->
            <Card>
              <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>
                  Manage your users and view their details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                    
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <!-- <TableHead>Status</TableHead> -->
                      <TableHead >
                        Role
                      </TableHead>
                    
                     
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow v-for="user in users" :key="user._id">
                     
                      <TableCell class="font-medium">
                        {{ user.name }}
                      </TableCell>
                      <TableCell>
                        {{ user.email }}
                      </TableCell>
                      <!-- <TableCell class="hidden md:table-cell">
                        {{ user.is_active ? 'Active' : 'Inactive' }}
                      </TableCell> -->
                      <TableCell class="hidden md:table-cell">
                        {{ user.role_name }}
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
