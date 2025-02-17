<template>
  <div>
     <header class="flex w-full h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex w-full items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <header class="sticky w-full top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav class="hidden w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <a
          href="#"
          class="flex items-center w-full gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 class="h-6 w-6" />
          <span class="sr-only">Acme Inc</span>
        </a>
        <a
          href="#"
          class="text-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </a>
        <a
          href="#"
          class="text-muted-foreground transition-colors hover:text-foreground"
        >
          Orders
        </a>
        <a
          href="#"
          class="text-muted-foreground transition-colors hover:text-foreground"
        >
          Products
        </a>
        <a
          href="#"
          class="text-muted-foreground transition-colors hover:text-foreground"
        >
          Customers
        </a>
        <a
          href="#"
          class="text-muted-foreground transition-colors hover:text-foreground"
        >
          Analytics
        </a>
      </nav>
     
      <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form class="ml-auto flex-1 sm:flex-initial">
          <div class="relative">
            <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
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
      </div>
    </header>
        </div>
      </header>
  </div>
</template>

<script lang="ts" setup>
import {CircleUser,Package2,Menu , Search, DollarSign} from 'lucide-vue-next'
</script>

<style>

</style>