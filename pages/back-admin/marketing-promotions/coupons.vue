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
const showCouponForm = ref(false)
const creating = ref(false)
const createCoupon = async () => {
  creating.value = true
  try {
    // await createCouponMutation.mutateAsync({
    //     name: create
    // })
    showCouponForm.value = false
  } catch (error) {
    console.log(error)
  } finally {
    creating.value = false
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
                <nuxt-link to="/back-admin/marketing-promotions/coupons"
                  >All Coupons</nuxt-link
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
              <TabsTrigger value="expired"> Expired </TabsTrigger>
              <TabsTrigger value="scheduled" class="hidden sm:flex">
                Scheduled
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
                  <DropdownMenuItem>Expired</DropdownMenuItem>
                  <DropdownMenuItem> Scheduled </DropdownMenuItem>
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
                @click="showCouponForm = !showCouponForm"
                class="h-7 bg-blue-500 hover:bg-blue-700 text-white gap-1"
              >
                <PlusCircle class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Coupon
                </span>
              </Button>
            </div>
          </div>
          <div class="mt-3" v-if="showCouponForm">
            <Card>
              <CardHeader>
                <CardTitle>Add Coupon</CardTitle>
                <CardDescription>
                  Create new discount coupons for your customers.
                </CardDescription></CardHeader
              >
              <form @submit.prevent="createCoupon" class="grid gap-4">
                <CardContent>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="grid gap-2">
                      <Label for="name">Coupon Name</Label>
                      <Input id="name" placeholder="Summer Sale" required />
                    </div>
                    <div class="grid gap-2">
                      <Label for="code">Coupon Code</Label>
                      <Input id="code" placeholder="SUMMER2024" required />
                    </div>
                      <div class="grid gap-2">
                      <Label for="is_active">Status</Label>
                      <RadioGroup id="is_active" required>
                        <div class="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="active" />
                          <Label for="active">Active</Label>
                        </div>
                        <div class="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="inactive" />
                          <Label for="inactive">Inactive</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div class="grid gap-2">
                      <Label for="type">Discount Type</Label>
                      <RadioGroup id="type" required>
                        <div class="flex items-center space-x-2">
                          <RadioGroupItem value="percentage" id="percentage" />
                          <Label for="percentage">Percentage</Label>
                        </div>
                        <div class="flex items-center space-x-2">
                          <RadioGroupItem value="fixed" id="fixed" />
                          <Label for="fixed">Fixed Amount</Label>
                        </div>
                      </RadioGroup>
                    </div>                    <div class="grid gap-2">
                      <Label for="value">Discount Value</Label>
                      <Input id="value" type="number" min="0" required />
                    </div>
                    <div class="grid gap-2">
                      <Label for="min_order_amount">Minimum Order Amount</Label>
                      <Input id="min_order_amount" type="number" min="0" required />
                    </div>
                    <div class="grid gap-2">
                      <Label for="max_discount_amount">Maximum Discount Amount</Label>
                      <Input id="max_discount_amount" type="number" min="0" required />
                    </div>
                    <div class="grid gap-2">
                      <Label for="usage">Maximum Usage Count</Label>
                      <Input id="usage" type="number" min="0" required />
                    </div>
                    <div class="grid gap-2">
                      <Label for="start_date">Start Date</Label>
                      <Input id="start_date" type="date" required />
                    </div>
                    <div class="grid gap-2">
                      <Label for="expiry_date">Expiry Date</Label>
                      <Input id="expiry_date" type="date" required />
                    </div>
                  
                  </div>
                </CardContent>
                <CardFooter class="gap-3">
                  <Button class="text-white" :disabled="creating">
                    <Loader2
                      v-if="creating"
                      class="w-4 h-4 mr-2 animate-spin"
                    />
                    Add Coupon</Button
                  >
                  <Button
                    @click="showCouponForm = !showCouponForm"
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
            <Card>
              <CardHeader>
                <CardTitle>Coupons</CardTitle>
                <CardDescription>
                  Manage your discount coupons and track their usage.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Min Order</TableHead>
                      <TableHead>Max Discount</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead class="hidden md:table-cell">Start Date</TableHead>
                      <TableHead class="hidden md:table-cell">Expiry Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>
                        <span class="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell class="font-medium">Summer Sale</TableCell>
                      <TableCell>SUMMER2024</TableCell>
                      <TableCell>Percentage</TableCell>
                      <TableCell>20%</TableCell>
                      <TableCell>$100</TableCell>
                      <TableCell>$50</TableCell>
                      <TableCell>45/100</TableCell>
                      <TableCell class="hidden md:table-cell">2024-06-01</TableCell>
                      <TableCell class="hidden md:table-cell">2024-08-31</TableCell>
                      <TableCell>
                        <Badge variant="outline">Active</Badge>
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
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Deactivate</DropdownMenuItem>
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
                  Showing <strong>1-10</strong> of <strong>24</strong>
                  coupons
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  </div>
</template>
