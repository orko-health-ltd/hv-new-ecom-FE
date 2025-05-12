<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import {
  CalendarIcon,
  CircleUser,
  File,
  ListFilter,
  MoreHorizontal,
  Search,
} from 'lucide-vue-next'
import moment from 'moment'
import type { DateRange, DateValue } from 'reka-ui'
// import { cn } from '@/utils'

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from '@internationalized/date'
interface Message {
  _id:string
  name: string
  email: string
  message: string
  phone: string
  date: string
}
const toast = useToast()
const showCreateForm = ref(false)
const showEditForm = ref(false)
const creating = ref(false)
const loading = ref(false)
const searchString = ref('')
const messages = ref<Message[]>([])
const filteredData = ref<Message[]>([])

const df = new DateFormatter('en-US', {
  dateStyle: 'medium',
})

const value = ref({
  start: new CalendarDate(
    moment().year(),
    moment().month() + 1,
    moment().date()
  ),
  end: new CalendarDate(moment().year(), moment().month() + 1, moment().date()),
}) as Ref<DateRange>
const filterOrders = useDebounceFn((type?: string) => {
  if (type == 'date') {
    filteredData.value = messages.value.filter((message) => {
      const messageDateFormated = moment(message.date).format('YYYY-M-D')
      const messageDate = moment(messageDateFormated)
      const startDate = moment(
        value.value?.start?.year +
          '-' +
          value.value?.start?.month +
          '-' +
          value.value?.start?.day
      )
      const endDate = moment(
        value.value?.end?.year +
          '-' +
          value.value?.end?.month +
          '-' +
          value.value?.end?.day
      )

      return messageDate.isBetween(startDate, endDate, 'day', '[]')
    })
  }
  if (searchString.value.length > 3)
    filteredData.value = messages.value.filter((message) => {
      return message.name
        .toLowerCase()
        .includes(searchString.value.toLowerCase())
    })
}, 1000)
const getMessages = async (type?: string) => {
  const { data } = await $fetch<{ data: Message[] }>(
    `/api/contact-message${type ? `?type=${type}` : ''}`
  )
  messages.value = data || []
  filteredData.value = messages.value
}
// Pagination
const itemsPerPage = ref(10)
const currentPage = ref(1)
const totalPages = computed(() =>
  Math.ceil(filteredData.value.length / itemsPerPage.value)
)

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredData.value.slice(start, end)
})

const goToPage = (page: number) => {
  currentPage.value = page
}

const getPageNumbers = computed(() => {
  const pages = []
  for (let i = 1; i <= totalPages.value; i++) {
    if (
      i === 1 ||
      i === totalPages.value ||
      (i >= currentPage.value - 2 && i <= currentPage.value + 2)
    ) {
      pages.push(i)
    } else if (i === currentPage.value - 3 || i === currentPage.value + 3) {
      pages.push('...')
    }
  }
  return pages
})

onMounted(() => {
  getMessages('')
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
                <nuxt-link to="/back-admin">Dashboard</nuxt-link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as-child>
                <nuxt-link to="/back-admin/customer-management/support-tickets"
                  >Support tickets</nuxt-link
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
            @input="filterOrders"
            type="search"
            placeholder="Search Order ID..."
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
    

            <div class="ml-auto flex items-center gap-2">
              <Popover>
                <PopoverTrigger as-child>
                  <Button variant="outline">
                    <CalendarIcon class="mr-2 h-4 w-4" />
                    <template v-if="value.start">
                      <template v-if="value.end">
                        {{
                          df.format(value.start.toDate(getLocalTimeZone()))
                        }}
                        - {{ df.format(value.end.toDate(getLocalTimeZone())) }}
                      </template>

                      <template v-else>
                        {{ df.format(value.start.toDate(getLocalTimeZone())) }}
                      </template>
                    </template>
                    <template v-else> Pick a date </template>
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                  <RangeCalendar
                    v-model="value"
                    initial-focus
                    :number-of-months="2"
                    @update:start-value="
                      (startDate) => {
                        value.start = startDate
                        filterOrders('date')
                      }
                    "
                    @update:end-value="(endDate:DateValue) => { value.end = endDate; filterOrders('date'); }"
                  />
                </PopoverContent>
              </Popover>
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
              <!-- <Button
                size="sm"
                :disabled="showEditForm"
                @click="showCreateForm = !showCreateForm"
                class="h-7 bg-blue-500 hover:bg-blue-700 text-white gap-1"
              >
                <PlusCircle class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Category
                </span>
              </Button> -->
            </div>
         

        
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <CardDescription>
                 View contact messages sent from website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Message</TableHead>
                      <!-- <TableHead>Delivery Charge</TableHead> -->

                      <TableHead>Date </TableHead>
                    
                      <TableHead>
                        <span class="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow v-for="message in paginatedData" :key="message._id">
                      <TableCell class="font-medium">
                        {{ message?.name }}
                      </TableCell>
                      <TableCell class="font-medium">
                        {{ message?.email }}
                      </TableCell>
                      <TableCell class="font-medium">
                        {{ message?.phone }}
                      </TableCell>
                      <TableCell class="font-medium">
                        {{ message?.message }}
                      </TableCell>
                     

                      <TableCell>
                        {{ moment(message.date).format('DD/MM/YYYY') }}
                      </TableCell>
                     

                    
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter class="flex justify-between">
                <div class="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of
                  <strong>{{ filteredData.length }}</strong>
                  products
                </div>
                <Pagination
                  v-slot="{ page }"
                  :items-per-page="10"
                  :total="filteredData.length"
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
         
      </main>
    </div>
  </div>
</template>
