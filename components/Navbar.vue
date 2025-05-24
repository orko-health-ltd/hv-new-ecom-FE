<template>
  <div class="bg-[#01251a] py-5 space-y-2 z-20 top-0 w-full fixed">
    <div
      class="flex md:items-start lg:items-center justify-between items-center w-full px-3"
    >
      <nuxt-link to="/" class="w-[200px]">
        <img
          class="w-[144px] h-[48px]"
          src="/assets/images/logo/hv-logo-white.png"
          alt=""
        />
      </nuxt-link>
      <div class="flex w-full justify-end items-center">
        <div class="w-full hidden md:block">
          <ul
            class="flex text-white justify-start items-center text-xs lg:text-sm gap-2 lg:gap-3 xl:gap-4 w-full"
          >
            <nuxt-link class="px-1.5 py-2.5" to="/">Home</nuxt-link>
            <NavigationMenu>
              <NavigationMenuList class="bg-none">
                <nuxt-link class="py-2.5" to="/shop/">
                  <NavigationMenuItem class="bg-none">
                    <NavigationMenuTrigger
                      class="bg-transparent hover:!bg-[#336958] hover:!text-white"
                      >Tea</NavigationMenuTrigger
                    >
                    <NavigationMenuContent>
                      <div class="w-[500px] grid grid-cols-2 gap-6 p-5">
                        <div
                          class="flex flex-col border-e-[1px] border-e-gray-400 gap-2"
                        >
                          <nuxt-link to="/shop/all">Shop All Teas</nuxt-link>
                          <nuxt-link to="/shop/best-selling"
                            >Best Sellers</nuxt-link
                          >
                        </div>
                        <div>
                          <h1 class="uppercase font-bold">Shop By Tea</h1>
                          <ul class="flex flex-col gap-1 my-2">
                            <nuxt-link
                              :to="`/shop/${category.slug}`"
                              v-for="category in categories"
                              :key="category._id"
                              >{{ category.name }}</nuxt-link
                            >
                          </ul>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem></nuxt-link
                >
              </NavigationMenuList>
            </NavigationMenu>

            <nuxt-link class="px-1.5 py-2.5" to="/shop/gift-box"
              >Gift</nuxt-link
            >

            <!-- <li>
            <UDropdown
              :items="teas"
              mode="hover"
              class="border-none text-xs lg:text-sm ring-0 hover:bg-none"
              :popper="{ placement: 'bottom-start' }"
            >
              <UButton
                color="white"
                label="Our Tea"
                class="bg-transparent text-xs lg:text-sm ring-0 hover:!bg-transparent border-none"
                :class="
                  route.path.startsWith('/product-category')
                    ? 'text-[#b4a345]'
                    : 'text-white'
                "
                trailing-icon="i-heroicons-chevron-down-20-solid"
              />
            </UDropdown>
          </li> -->
            <!-- <nuxt-link class="px-1.5 py-2.5" to="/springflush">Springflush</nuxt-link> -->
            <a class="px-1.5 py-2.5" href="https://tealounge.haldavalley.com/"
              >Tea Lounge</a
            >
            <!-- <li>
            <UDropdown
              :items="medias"
              mode="hover"
              class="border-none ring-0 hover:bg-none"
              :popper="{ placement: 'bottom-start' }"
            >
              <UButton
                color="white"
                label="Media"
                class="bg-transparent text-xs lg:text-sm ring-0 hover:!bg-transparent border-none"
                :class="
                  route.path.startsWith('/media')
                    ? 'text-[#b4a345]'
                    : 'text-white'
                "
                trailing-icon="i-heroicons-chevron-down-20-solid"
              />
            </UDropdown>
          </li> -->
            <li>
              <UDropdown
                :items="abouts"
                mode="hover"
                class="border-none ring-0 hover:bg-none"
                :popper="{ placement: 'bottom-start' }"
              >
                <UButton
                  color="white"
                  label=" About Us"
                  class="bg-transparent text-xs lg:text-sm ring-0 hover:!bg-transparent border-none"
                  :class="
                    route.path.startsWith('/about-us')
                      ? 'text-[#b4a345]'
                      : 'text-white'
                  "
                  trailing-icon="i-heroicons-chevron-down-20-solid"
                />
              </UDropdown>
            </li>
            <nuxt-link class="px-1.5 py-2.5" to="/track-order"
              >Track Order</nuxt-link
            >
            <!-- <nuxt-link class="px-1.5 py-2.5" to="/back-admin" >Admin Dashboard</nuxt-link    > -->
          </ul>
        </div>
        <div
          class="flex gap-1 justify-end items-center"
          :class="searchOpen ? 'w-full' : 'w-auto sm:min-w-72'"
        >
          <Combobox class="w-full pe-2 hidden lg:block" by="label">
            <ComboboxAnchor class="w-full">
              <div class="relative w-full items-center">
                <ComboboxInput
                  class="pl-9 bg-white"
                  @focus="searchOpen = true"
                  @blur="searchOpen = false"
                  :display-value="(val) => val?.name ?? ''"
                  placeholder="Search Products..."
                />
                <span
                  class="absolute start-0 inset-y-0 flex items-center justify-center px-3"
                >
                  <Search class="size-4 text-muted-foreground" />
                </span>
              </div>
            </ComboboxAnchor>

            <ComboboxList class="min-w-[250px] w-full hello">
              <ComboboxEmpty> No products found. </ComboboxEmpty>

              <!-- <ComboboxGroup> -->
              <ComboboxItem
                v-for="product in products"
                :key="product._id"
                :value="product.name"
                class="!p-0"
              >
                <nuxt-link
                  :to="`/product/${product.slug}`"
                  class="flex items-center gap-2 px-4 py-3"
                >
                  <NuxtImg
                    :src="'/halda/' + product.front_image"
                    class="w-10 h-10 object-cover rounded-full"
                  />
                  <p>{{ product.name }}</p>
                </nuxt-link>

                <!-- <ComboboxItemIndicator>
            <Check :class="cn('ml-auto h-4 w-4')" />
          </ComboboxItemIndicator> -->
              </ComboboxItem>
              <!-- </ComboboxGroup> -->
            </ComboboxList>
          </Combobox>
          <nuxt-link>
            <UIcon name="line-md:account" class="text-white pb-2 text-2xl" />
          </nuxt-link>

          <nuxt-link to="/wishlist">
            <UChip
              :text="cart.wishlist.length"
              size="2xl"
              color="yellow"
              :show="cart.wishlist.length > 0"
              class="mx-2"
            >
              <UIcon name="solar:heart-outline" class="text-white text-2xl" />
            </UChip>
          </nuxt-link>

          <div @click="isCartOpen = !isCartOpen">
            <UChip
              :text="cart.totalItems"
              size="2xl"
              :show="cart.totalItems > 0"
              color="yellow"
              class="mx-2"
            >
              <UIcon name="mdi:cart" class="text-white text-2xl" />
            </UChip>
          </div>
          <UButton
            class="block md:hidden text-white"
            icon="pajamas:hamburger"
            size="xl"
            :padded="false"
            variant="link"
            @click="isOpen = true"
          />
        </div>
      </div>

      <USlideover
        v-model="isOpen"
        :ui="{
          transition: {
            enter: 'transform transition ease-in-out duration-1000',
            leave: 'transform transition ease-in-out duration-1000',
          },
        }"
      >
        <UCard
          class="flex bg-primary-950 rounded-none text-white flex-col flex-1"
          :ui="{
            body: { base: 'flex-1' },
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          }"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold leading-6 dark:text-white">
                Menu
              </h3>
              <UButton
                color="white"
                variant="solid"
                icon="i-heroicons-x-mark-20-solid"
                class="-my-1"
                @click="isOpen = false"
              />
            </div>
          </template>

          <!-- <Placeholder class="h-full" /> -->
          <ul
            class="flex flex-col text-white justify-start items-start text-sm w-full"
          >
            <nuxt-link class="px-2.5 w-full py-1.5 hover:text-white" to="/"
              >Home</nuxt-link
            >
            <!-- <nuxt-link class="px-2.5 w-full py-1.5" to="/shop/">Tea</nuxt-link> -->
            <UAccordion
              color="white"
              class="w-full"
              :class="
                route.path.startsWith('/shop') ? 'text-[#b4a345]' : 'text-white'
              "
              :items="[
                {
                  label: 'Tea',
                  content: 'This is the content inside the accordion.',
                },
              ]"
            >
              <template #item="{ item }">
                <UVerticalNavigation
                  :links="teas[0]"
                  :ui="{
                    inactive: 'text-white',
                  }"
                />
              </template>
            </UAccordion>

            <UAccordion
              color="white"
              class="w-full"
              :class="
                route.path.startsWith('/about-us')
                  ? 'text-[#b4a345]'
                  : 'text-white'
              "
              :items="[
                {
                  label: 'About Us',
                  content: 'This is the content inside the accordion.',
                },
              ]"
            >
              <template #item="{ item }">
                <UVerticalNavigation
                  :links="abouts[0]"
                  :ui="{
                    inactive: 'text-white',
                  }"
                />
              </template>
            </UAccordion>
            <nuxt-link
              class="px-2.5 w-full py-1.5 hover:text-white"
              to="/shop/gift-box"
              >Gift</nuxt-link
            >
            <!-- <UAccordion   :class="
                  route.path.startsWith('/product-category')
                    ? 'text-[#b4a345]'
                    : 'text-white'
                "
            color="white"
            :items="[
              {
                label: 'Our Tea',
                content: 'This is the content inside the accordion.',
              },
            ]"
          >
            <template #item="{ item }">
              <UVerticalNavigation
                :links="teas[0]"
                :ui="{
                  inactive: 'text-white',
                }"
              />
            </template>
          </UAccordion> -->

            <!-- <nuxt-link class="px-2.5 py-1.5" to="/springflush"
            >Springflush</nuxt-link
          > -->
            <a class="px-2.5 py-1.5" href="https://tealounge.haldavalley.com/"
              >Tea Lounge</a
            >

            <!-- <UAccordion
            color="white" :class="
                route.path.startsWith('/media')
                  ? 'text-[#b4a345]'
                  : 'text-white'
              "
            :items="[
              {
                label: 'Media',
                content: 'This is the content inside the accordion.',
              },
            ]"
          >
            <template #item="{ item }">
              <UVerticalNavigation
                :links="medias[0]"
                :ui="{
                  inactive: 'text-white',
                }"
              />
            </template>
          </UAccordion> -->

            <nuxt-link class="px-2.5 py-1.5" to="/track-order"
              >Track Order</nuxt-link
            >
            <!-- <nuxt-link class="px-2.5 py-1.5" to="/career">Careers</nuxt-link> -->
          </ul>
        </UCard>
      </USlideover>
      <USlideover v-model="isCartOpen" prevent-close>
        <UCard
          class="flex flex-col flex-1"
          :ui="{
            body: { base: 'flex-1' },
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          }"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-base font-semibold leading-6 text-gray-100 dark:text-white"
              >
                Shopping Cart
              </h3>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                class="-my-1"
                @click="isCartOpen = false"
              />
            </div>
          </template>
          <div
            class="relative z-10"
            aria-labelledby="slide-over-title"
            role="dialog"
            aria-modal="true"
          >
            <!--
    Background backdrop, show/hide based on slide-over state.

    Entering: "ease-in-out duration-500"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in-out duration-500"
      From: "opacity-100"
      To: "opacity-0"
  -->
            <div
              class="fixed inset-0 bg-gray-500/75 transition-opacity"
              aria-hidden="true"
            ></div>

            <div class="fixed inset-0 overflow-hidden">
              <div class="absolute inset-0 overflow-hidden">
                <div
                  class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
                >
                  <!--
          Slide-over panel, show/hide based on slide-over state.

          Entering: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-full"
            To: "translate-x-0"
          Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-0"
            To: "translate-x-full"
        -->
                  <div class="pointer-events-auto w-screen max-w-md">
                    <div
                      class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                    >
                      <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div class="flex items-start justify-between">
                          <h2
                            class="text-lg font-medium text-gray-900"
                            id="slide-over-title"
                          >
                            Shopping cart
                          </h2>
                          <div class="ml-3 flex h-7 items-center">
                            <!-- <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isCartOpen = false"
            /> -->
                            <button
                              @click="isCartOpen = false"
                              type="button"
                              class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            >
                              <span class="absolute -inset-0.5"></span>
                              <span class="sr-only">Close panel</span>
                              <svg
                                class="size-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                data-slot="icon"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M6 18 18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div class="mt-8">
                          <div class="flow-root">
                            <ul
                              role="list"
                              class="-my-6 divide-y divide-gray-200"
                            >
                              <li
                                v-for="item in cart.cart"
                                :key="item.id"
                                class="flex py-6"
                              >
                                <div
                                  class="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200"
                                >
                                  <NuxtImg
                                    format="webp"
                                    :src="`/halda/${item.product.front_image}`"
                                    :alt="item.product.name"
                                    class="size-full object-cover"
                                  />
                                </div>

                                <div class="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div
                                      class="flex justify-between text-base font-medium text-gray-900"
                                    >
                                      <h3>
                                        <a href="#">{{ item.product.name }}</a>
                                      </h3>
                                      <p class="ml-4">৳ {{ item.price }}</p>
                                    </div>
                                    <p class="mt-1 text-sm text-gray-500">
                                      {{ item.product.category }}
                                    </p>
                                  </div>
                                  <div
                                    class="flex flex-1 items-end justify-between text-sm"
                                  >
                                    <p
                                      class="text-gray-500 flex justify-center items-center gap-2"
                                    >
                                      Qty
                                      <UButton
                                        icon="ic:outline-remove"
                                        size="2xs"
                                        color="red"
                                        @click="cart.decrement(item)"
                                        square
                                        variant="solid"
                                      />
                                      {{ item.quantity }}
                                      <UButton
                                        icon="material-symbols:add-2-rounded"
                                        size="2xs"
                                        color="primary"
                                        @click="cart.increment(item)"
                                        square
                                        variant="solid"
                                      />
                                    </p>

                                    <div class="flex">
                                      <button
                                        type="button"
                                        @click="
                                          cart.removeFromCart(item),
                                            toast.add({
                                              title:
                                                'Product removed from cart',
                                              color: 'orange',
                                              timeout: 1500,
                                            })
                                        "
                                        class="font-medium items-center flex justify-center text-red-600 hover:text-red-500"
                                      >
                                        <UIcon
                                          name="material-symbols:delete-outline"
                                        />
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>

                              <!-- More products... -->
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div
                          class="flex justify-between text-base font-medium text-gray-900"
                        >
                          <p>Subtotal</p>
                          <p>৳ {{ cart.total }}</p>
                        </div>
                        <p class="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div
                          class="mt-6 flex items-center justify-center text-center"
                        >
                          <!-- <nuxt-link to="/checkout" class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700">Checkout</nuxt-link> -->
                          <nuxt-link
                            v-if="cart.cart.length > 0"
                            to="/billing"
                            class="bg-indigo-500 font-semibold hover:bg-indigo-600 rounded-lg px-4 py-3 text-sm text-white uppercase w-full"
                          >
                            Checkout
                          </nuxt-link>
                          <button
                            v-else
                            disabled
                            class="bg-indigo-300 font-semibold py-3 text-sm text-white uppercase w-full"
                          >
                            Checkout
                          </button>
                        </div>
                        <div
                          class="mt-6 flex justify-center text-center text-sm text-gray-500"
                        >
                          <p>
                            or
                            <nuxt-link
                              to="/shop"
                              class="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </nuxt-link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <Placeholder class="h-full" /> -->
        </UCard>
      </USlideover>
    </div>
    <Combobox class="w-full px-4 lg:hidden block col-span-full" by="label">
      <ComboboxAnchor class="w-full">
        <div class="relative w-full items-center">
          <ComboboxInput
            class="pl-9 bg-white"
            @focus="searchOpen = true"
            @blur="searchOpen = false"
            :display-value="(val) => val?.name ?? ''"
            placeholder="Search Products..."
          />
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-3"
          >
            <Search class="size-4 text-muted-foreground" />
          </span>
        </div>
      </ComboboxAnchor>

      <ComboboxList class="min-w-[250px] w-full hello">
        <ComboboxEmpty> No products found. </ComboboxEmpty>

        <!-- <ComboboxGroup> -->
        <ComboboxItem
          v-for="product in products"
          :key="product._id"
          :value="product.name"
          class="!p-0"
        >
          <nuxt-link
            :to="`/product/${product.slug}`"
            class="flex items-center gap-2 px-4 py-3"
          >
            <NuxtImg
              :src="'/halda/' + product.front_image"
              class="w-10 h-10 object-cover rounded-full"
            />
            <p>{{ product.name }}</p>
          </nuxt-link>

          <!-- <ComboboxItemIndicator>
            <Check :class="cn('ml-auto h-4 w-4')" />
          </ComboboxItemIndicator> -->
        </ComboboxItem>
        <!-- </ComboboxGroup> -->
      </ComboboxList>
    </Combobox>
  </div>
</template>

<script lang="ts" setup>
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
// import { cn } from '@/utils'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import type { Product } from '@/types'
import { Search } from 'lucide-vue-next'
const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]
const searchOpen = ref(false)
const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/components/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/components/hover-card',
    description:
      'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/components/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/components/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/components/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/components/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
]
const route = useRoute()
const cart = useMyCartStore() as ReturnType<typeof useMyCartStore>
const toast = useToast()
const isOpen = ref(false)
const isCartOpen = ref(false)
const teas = [
  [
    {
      label: 'Explore Tea',
      to: '/shop',
    },
    {
      label: 'All',
      to: '/shop/all/',
    },

    {
      label: 'Best Sellers',
      to: '/shop/best-selling/',
    },
    {
      label: 'Dragon Well Green Tea',
      to: '/shop/green-tea/',
    },
    {
      label: 'Golden Eyebrow Black Tea',
      to: '/shop/gebt/',
    },
    {
      label: 'Red Robe Olong Tea',
      to: '/shop/rrot',
    },
    {
      label: 'Silver Needle White Tea',
      to: '/shop/white-tea',
    },
    {
      label: 'Black tea',
      to: '/shop/black-tea',
    },
  ],
]
const abouts = [
  [
    {
      label: 'Our Story',
      to: '/about-us/our-story',
    },
    {
      label: 'Timeline',
      to: '/about-us/timeline',
    },
    {
      label: 'Our People',
      to: '/about-us/our-people',
    },
    {
      label: 'Corporate Client List',
      to: '/about-us/corporate-client-list',
    },
    {
      label: 'Contact Us',
      to: '/about-us/contact-us',
    },
  ],
]
const medias = [
  [
    // {
    //   label: 'Media & Events',
    //   to: '/media/media-events',
    // },
    {
      label: 'Brochure',
      to: '/media/brochure',
    },
    {
      label: 'Feedback Form',
      to: '/media/feedback-form',
    },
  ],
]
interface Category {
  _id: string
  name: string
  image: string
  description: string
  slug: string
}
const products = ref<Product[]>([])

const { data: categories } = await useAsyncData('categories', () =>
  $fetch<{ data: Category[] }>('/api/categories').then((res) => res.data)
)
const getProducts = async () => {
  const data = await $fetch<Product[]>('/api/products')

  products.value = data
 
}

watch(route, () => {
  isOpen.value = false
  isCartOpen.value = false
})
onMounted(() => {
  getProducts()
})
</script>

<style>
.router-link-active {
  color: #b4a345;
}
</style>
