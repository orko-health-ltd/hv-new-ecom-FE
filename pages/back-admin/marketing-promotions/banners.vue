<script setup lang="ts">
import IMG from '@/assets/images/no-image.jpg'
import {
  CircleUser,
  File,
  ListFilter,
  Loader2,
  MoreHorizontal,
  PlusCircle,
  PlusIcon,
  Search,
  Trash2Icon,
} from 'lucide-vue-next'
import type { Banner } from '~/types'
const fallbackImage = IMG
const toast = useToast()
const showCreateForm = ref(false)
const showEditForm = ref(false)
const creating = ref(false)
const loading = ref(false)
const banner = ref<Banner>({
  _id: '',
  title: '',
  image: '',
  description: '',
  color: '#ffffff',
  is_active: true,
  is_popup: false,
  links: [
    {
      title: '',
      link: '',
    },
  ],
})
const imageData = ref(<File | null>null)
const image = ref('')
const showMod = ref(false)
const handleFileChange = (
  event: Event,
  targetObject: Record<string, any>,
  property: string
): void => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    targetObject[property] = files[0]
    imageData.value = files[0]
  
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        image.value = e.target.result
      }
    }
    reader.readAsDataURL(files[0])
  }
}
const { data, refresh } = useFetch<{ data: Banner[] }>(
  '/api/back-admin/banners'
)
const banners = computed(() => data.value?.data || [])
const createBanner = async () => {
  creating.value = true
  try {
    const formData = new FormData()

    formData.append('title', banner.value.title)
    formData.append('color', banner.value.color)
    formData.append('image', banner.value.image)
    formData.append('description', banner.value.description)
    formData.append('is_active', banner.value.is_active.toString())
    formData.append('links', JSON.stringify(banner.value.links))
    await $fetch('/api/back-admin/banners/create', {
      method: 'POST',
      body: formData,
    })
    banner.value = {
      _id: '',
      title: '',
      description: '',
      image: '',
      color: '#ffffff',
      is_active: true,
      is_popup: false,
      links: [
        {
          title: '',
          link: '',
        },
      ],
    }
    toast.add({
      title: 'Banner Added Successfully',
      color: 'green',
      timeout: 1500,
    })

    refresh()
    setTimeout(() => {
      creating.value = true
      showCreateForm.value = false
    }, 1000)
  } catch (error) {
    toast.add({
      title: 'Something went wrong. Pleas try again later.',
      color: 'red',
      timeout: 1500,
    })
    creating.value = false
  
  }
  creating.value = false
}
const updateStatus = async (banner: Banner) => {
  try {
    const response = await $fetch('/api/back-admin/banners/update-banner', {
      method: 'POST',
      body: {
        banner_id: banner._id,
        is_active: banner.is_active,
      },
    })
    toast.add({
      title: 'Status Updated Successfully',
      color: 'green',
      timeout: 1500,
    })
    refresh()
  } catch (error) {
    console.log(error)
  }
}
const updateBanner = async () => {
  creating.value = true
  try {
    const formData = new FormData()

    formData.append('title', banner.value.title)
    formData.append('color', banner.value.color)
    if (imageData.value) formData.append('image', imageData.value)
    formData.append('description', banner.value.description)
    formData.append('links', JSON.stringify(banner.value.links))
    await $fetch('/api/back-admin/banners/' + banner.value._id, {
      method: 'POST',
      body: formData,
    })
    banner.value = {
      _id: '',
      title: '',
      description: '',
      image: '',
      is_active: true,
      is_popup: false,
      color: '#ffffff',
      links: [
        {
          title: '',
          link: '',
        },
      ],
    }
    toast.add({
      title: 'Banner Updated Successfully',
      color: 'green',
      timeout: 1500,
    })

    refresh()
    setTimeout(() => {
      creating.value = false
      showEditForm.value = false
    }, 1000)
  } catch (error) {
    console.log(error)
  }
  creating.value = false
}
const deleteBanner = async (bannerId: string) => {
  showMod.value = false
  try {
    const response = await $fetch('/api/back-admin/banners/delete-banner', {
      method: 'POST',
      body: {
        banner_id: bannerId,
      },
    })
    toast.add({
      title: 'Banner Deleted Successfully',
      color: 'green',
      timeout: 1500,
    })
    refresh()
  } catch (error) {
    console.log(error)
  }
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
                <nuxt-link to="/back-admin">Dashboard</nuxt-link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as-child>
                <nuxt-link to="/back-admin/marketing-promotions/banners"
                  >All Banners</nuxt-link
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
                  Add Banner
                </span>
              </Button>
            </div>
          </div>
          <div class="mt-3" v-if="showCreateForm || showEditForm">
            <Card>
              <CardHeader>
                <CardTitle>{{
                  showEditForm ? 'Update Banner' : 'Add Banner'
                }}</CardTitle>
                <CardDescription>
                  {{
                    showEditForm
                      ? 'Update Banner data to manage and identify products'
                      : 'Add new banners to manage your products.'
                  }}
                </CardDescription></CardHeader
              >
              <form
                @submit.prevent="showEditForm ? updateBanner() : createBanner()"
                class="grid gap-4"
              >
                <CardContent>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col items-start gap-2">
                      <Label for="first-name">Banner Title</Label>
                      <Input
                        id="first-name"
                        v-model="banner.title"
                        required
                        placeholder="Banner"
                      />
                      <div class="flex gap-10">
                         <Label for="first-name">Is Popup</Label>
                        <Switch
                        @click="banner.is_popup = !banner.is_popup"
                        class="h-5 w-11"
                        :checked="banner.is_popup"
                      />
                      </div>
                     
                    </div>

                    <div class="flex gap-5">
                      <div class="grid gap-2">
                        <Label for="last-name">Image</Label>
                        <Input
                          id="last-name"
                          type="file"
                          @change="(event: Event) => handleFileChange(event, banner, 'image')"
                          :required="!showEditForm"
                        />
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
                      <div class="flex flex-col items-start gap-2">
                        <Label for="first-name">Text Color</Label>
                        <Input
                          type="color"
                          id="first-name"
                          v-model="banner.color"
                          required
                          class="w-20 h-20"
                          placeholder="Banner"
                        />
                      </div>
                    </div>
                    <div class="flex flex-col gap-2 items-start">
                      <Label for="description">Banner Description</Label>
                      <Textarea
                        id="description"
                        v-model="banner.description"
                        required
                        placeholder="Banner"
                      />
                    </div>
                    <div class="grid gap-2">
                      <Label for="description">Banner Buttons</Label>
                      <div
                        class="flex gap-4"
                        v-for="(button, index) in banner.links"
                      >
                        <Input
                          v-model="button.title"
                          placeholder="Button title"
                        />
                        <Input
                          v-model="button.link"
                          placeholder="Button link"
                        />
                        <Button
                          variant="outline"
                          type="button"
                          @click="banner.links.splice(index, 1)"
                          size="icon"
                          class="px-2"
                        >
                          <Trash2Icon class="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        type="button"
                        @click="banner.links.push({ link: '', title: '' })"
                        size="icon"
                      >
                        <PlusIcon class="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter class="gap-3">
                  <Button type="submit" class="text-white" :disabled="creating">
                    <Loader2
                      v-if="creating"
                      class="w-4 h-4 mr-2 animate-spin"
                    />
                    {{ showEditForm ? 'Update Banner' : 'Add Banner' }}</Button
                  >
                  <Button
                    type="button"
                    variant="outline"
                    @click="
                      ;(showEditForm = false),
                        (showCreateForm = false),
                        (banner = {
                          _id: '',
                          title: '',
                          description: '',
                          image: '',
                          is_active: false,
                          is_popup: false,
                          color: '#ffffff',
                          links: [
                            {
                              title: '',
                              link: '',
                            },
                          ],
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
                <CardTitle>Banners</CardTitle>
                <CardDescription>
                  Manage your banners and view their sales performance.
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
                      <TableHead>Popup</TableHead>

                      <TableHead class="hidden md:table-cell">
                        Description
                      </TableHead>
                      <TableHead class="hidden md:table-cell">
                        Buttons
                      </TableHead>
                      <TableHead> Actions </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow
                      v-for="bannerData in banners"
                      :key="bannerData._id"
                    >
                      <TableCell class="hidden sm:table-cell">
                        <img
                          :src="$config.public.apiBase + '/' + bannerData.image"
                          :placeholder="fallbackImage"
                          alt=""
                        />

                        <!-- <NuxtImg  format="webp"
                   
                    :src="`/halda/${bannerData.image}`"
                    :alt="bannerData.title"
                  class="object-cover rounded-md cursor-pointer transition duration-300"
                /> -->
                      </TableCell>
                      <TableCell class="font-medium">
                        {{ bannerData.title }}
                      </TableCell>
                      <TableCell>
                        <Badge
                          :variant="bannerData.is_active ? null : 'destructive'"
                        >
                          {{ bannerData.is_active ? 'Active' : 'Inactive' }}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <UIcon v-if="bannerData.is_popup" name="material-symbols:check-circle-outline" class="text-xl text-green-500" />
                        <UIcon v-else name="ep:warning" class="text-xl text-yellow-500" />
                      </TableCell>

                      <TableCell class="hidden md:table-cell">
                        {{ bannerData.description }}
                      </TableCell>
                      <TableCell class="hidden md:table-cell">
                        <ul>
                          <li v-for="link in bannerData.links">
                            <nuxt-link :to="'/shop/' + link.link">
                              <Button class="text-white">{{
                                link.title
                              }}</Button>
                            </nuxt-link>
                          </li>
                        </ul>
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
                              <DropdownMenuItem
                                @click="
                                  ;(banner = bannerData), (showEditForm = true)
                                "
                                >Edit</DropdownMenuItem
                              >
                              <DropdownMenuItem
                                @click="updateStatus(bannerData)"
                                >{{
                                  bannerData.is_active
                                    ? 'Make Inactive'
                                    : 'Make Active'
                                }}</DropdownMenuItem
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
                                @click="deleteBanner(bannerData._id)"
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
