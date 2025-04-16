<script setup lang=ts>
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {
  AudioWaveform,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  Folder,
  Forward,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  Map,
  MoreHorizontal,
  Package2,
  Menu,
  Search,
  CircleUser,

  PieChart,
  Plus,
  Settings2,
  Sparkles,
  SquareTerminal,
  Trash2,
  BoxIcon,
  Icon,
} from 'lucide-vue-next'
import { ref } from 'vue'
const route = useRoute()
const auth: any = useAuthStore()
// This is sample data.
const data = {
  user: {
    name: 'Super Admin',
    email: 'admin@mail.com',
    avatar: '',
  },
  navMain :[
  {
    title: 'Dashboard',
    url: '/admin',
    icon: 'oui:app-dashboard',
    isActive: true,
  },
  {
    title: 'Product Management',
    url: '/admin/product-management',
    icon: 'icon-park:ad-product',
    icon2: PieChart,
    isActive: true,
    items: [
      { title: 'Categories', url: '/admin/product-management/categories' , icon: 'tabler:category-2'},
      { title: 'Brands', url: '/admin/product-management/brands',icon:'tabler:brand-airtable' },
      { title: 'Products', url: '/admin/product-management/products' , icon:'streamline:shopping-bag-suitcase-1-product-business-briefcase' },
      { title: 'SKU', url: '/admin/product-management/sku' ,icon:'ic:round-edit-attributes'},
      { title: 'Media Library', url: '/admin/product-management/media-library',icon:'iconoir:media-image-folder' },
      { title: 'Reviews & Ratings', url: '/admin/product-management/reviews',icon:'ic:outline-star-half' },
    ],
  },
  {
    title: 'Orders',
    url: '/admin/order-management',
    icon: 'material-symbols:shopping-bag-speed',
     icon2: PieChart,
    isActive: false,
    items: [
      { title: 'All Orders', url: '/admin/order-management/all',icon: 'material-symbols:list-alt-rounded' },
      { title: 'Pending Orders', url: '/admin/order-management/pending' ,icon:'ic:baseline-pending-actions' },
      { title: 'Completed Orders', url: '/admin/order-management/completed' ,icon:'material-symbols:list-alt-check-rounded' },
      { title: 'Cancelled Orders', url: '/admin/order-management/cancelled',icon:'carbon:rule-cancelled' },
    ],
  },
  {
    title: 'Customers Management',
    url: '/admin/customer-management',
    icon: 'garden:customer-lists-fill-26',
     icon2: PieChart,
    isActive: false,
    items: [
      { title: 'Customers', url: '/admin/customer-management',icon: 'gridicons:multiple-users' },
      { title: 'Support Tickets', url: '/admin/customer-management/support-tickets' ,icon:'ri:customer-service-2-fill' },
      { title: 'Newsletter Subscribers', url: '/admin/customer-management/newsletter' ,icon:'mdi:email-newsletter' },
    ],
  },
  {
    title: 'Payments & Transactions',
    url: '/admin/payment-management',
    icon: 'streamline:money-cash-dollar-coin-accounting-billing-payment-cash-coin-currency-money-finance',
    isActive: false,
     icon2: PieChart,
    items: [
      { title: 'Payments', url: '/admin/payment-management/payments' ,icon:'material-symbols:payments-outline'},
      { title: 'Refunds', url: '/admin/payment-management/refunds',icon:"tdesign:undertake-transaction-filled" },
    ],
  },
  {
    title: 'Marketing & Promotions',
    url: '/admin/marketing-promotions',
    icon: 'nimbus:marketing',
    isActive: false,
     icon2: PieChart,
    items: [
      { title: 'Coupons', url: '/admin/marketing-promotions/coupons', icon:'ri:coupon-fill' },
      { title: 'Banners', url: '/admin/marketing-promotions/banners',icon:'material-symbols:planner-banner-ad-pt-rounded' },
    ],
  },
  {
    title: 'Reports & Analytics',
    url: '/admin/reports',
     icon2: PieChart,
    icon: 'material-symbols:bar-chart-4-bars-rounded',
    isActive: false,
  },
  {
    title: 'Settings',
    url: '/admin/settings',
    icon: 'ic:baseline-settings',
    isActive: false,
     icon2: PieChart,
    items: [
      { title: 'Store Settings', url: '/admin/settings/store',icon:'mdi:store-cog-outline' },
      { title: 'Users & Roles', url: '/admin/settings/users',icon:'material-symbols:manage-accounts' },
      { title: 'Security', url: '/admin/settings/security',icon:'material-symbols:security-rounded' },
    ],
  },
],

 
}
const logout = async () => {
  await auth.logout()
  navigateTo('/admin/login')
}
watchEffect(()=>{
  if(!auth.user)
  {
  navigateTo('/admin/login')
}
})

</script>

<template>
  <SidebarProvider >
    <Sidebar  collapsible="icon" class="!bg-white kodu">
      <SidebarHeader >
        <SidebarMenu>
          <SidebarMenuItem class="flex justify-center items-center">
           <nuxt-link to="/" class="w-[200px] flex justify-center items-center">
      <img
        class="w-auto h-auto max-h-20"
        src="/assets/images/logo/golden_logo.png"
        alt=""
      />
      
    </nuxt-link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            <Collapsible
              v-for="item in data.navMain"
              :key="item.title"
              as-child
              :default-open="item.isActive"
              class="group/collapsible"
            >
              <SidebarMenuItem v-if="item.items"  :class="
                  route.path.startsWith(item.url)
                    ? 'text-[#b4a345]'
                    : 'text-black'
                ">
                <CollapsibleTrigger class="hover:bg-primary-200" as-child>
                  <SidebarMenuButton :tooltip="item.title">
                    <UIcon  :name="item.icon" class="w-5 shrink-0 h-5" />
                    
                    <span>{{ item.title }}</span>
                    <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem
                      v-for="subItem in item.items"
                      :key="subItem.title"
                    >
                      <SidebarMenuSubButton as-child class="hover:bg-primary-300">
                        <nuxt-link :to="subItem.url" :class="
                  route.path.startsWith(subItem.url)
                    ? 'text-[#b4a345]'
                    : 'text-black'
                ">
                          <UIcon :name="subItem.icon"  class="w-5 shrink-0 h-5" />
                          <span>{{ subItem.title }}</span>
                        </nuxt-link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
              <SidebarMenuItem v-else>
               
                <SidebarMenuButton as-child class="hover:bg-primary-200">
                        <nuxt-link :to="item.url" :class="
                  route.path == item.url 
                    ? 'text-[#b4a345]'
                    : 'text-black'
                ">
                          <UIcon :name="item.icon" class="w-5 shrink-0 h-5" />
                          <span>{{ item.title }}</span>
                        </nuxt-link>
                     </SidebarMenuButton>
                </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
       
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton
                  size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar class="h-8 w-8 rounded-lg">
                    <AvatarImage :src="auth.user.avatar??''" :alt="auth.user.name" />
                    <AvatarFallback class="rounded-lg">
                     SA
                    </AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">{{ auth.user.name }}</span>
                    <span class="truncate text-xs">{{ auth.user.email }}</span>
                  </div>
                  <ChevronsUpDown class="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom" align="end" :side-offset="4">
                <DropdownMenuLabel class="p-0 font-normal">
                  <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar class="h-8 w-8 rounded-lg">
                      <AvatarImage :src="auth.user.avatar??''" :alt="auth.user.name" />
                      <AvatarFallback class="rounded-lg">
                        SA
                      </AvatarFallback>
                    </Avatar>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">{{ auth.user.name }}</span>
                      <span class="truncate text-xs">{{ auth.user.email }}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="logout()">
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
     
      <UNotifications />
      <slot />
    </SidebarInset>
  </SidebarProvider>
</template>
<style>
/* .active-route */
</style>