<template>
  <div
    class="bg-[#01251a] z-10 fixed flex md:flex-col lg:flex-row md:items-start lg:items-center justify-between items-center w-full px-3 py-7"
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
          class="flex text-white justify-center items-center text-xs lg:text-sm gap-3 lg:gap-5 xl:gap-8 w-full"
        >
          <nuxt-link class="px-1.5 py-2.5" to="/">Home</nuxt-link>
          <nuxt-link class="px-1.5 py-2.5" to="/shop/">Shop</nuxt-link>
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
          <li>
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
          </li>
          <nuxt-link class="px-1.5 py-2.5" to="/springflush">Springflush</nuxt-link>
          <a class="px-1.5 py-2.5" href="https://tealounge.haldavalley.com/">Tea Lounge</a>
          <li>
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
          </li>
          <nuxt-link class="px-1.5 py-2.5" to="/contact-us">Contact Us</nuxt-link>
          <nuxt-link class="px-1.5 py-2.5" to="/career">Careers</nuxt-link>
          <nuxt-link class="px-1.5 py-2.5" to="/admin">Admin Dashboard</nuxt-link>
        </ul>
      </div>
      <div class="flex gap-2 items-center">
        <div @click="isCartOpen = !isCartOpen">
          <UChip :text="cart.totalItems" size="2xl" color="yellow" class="mx-2">
            <UIcon name="mdi:cart" class="text-white text-3xl" />
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
              Slideover
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
          <nuxt-link class="px-2.5 w-full py-1.5" to="/shop/">Shop</nuxt-link>

          <UAccordion
            color="white"
            class="w-full"   :class="
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

          <UAccordion   :class="
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
          </UAccordion>

          <nuxt-link class="px-2.5 py-1.5" to="/springflush"
            >Springflush</nuxt-link
          >
          <a class="px-2.5 py-1.5" href="https://tealounge.haldavalley.com/"
            >Tea Lounge</a
          >

          <UAccordion
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
          </UAccordion>

          <nuxt-link class="px-2.5 py-1.5" to="/contact-us"
            >Contact Us</nuxt-link
          >
          <nuxt-link class="px-2.5 py-1.5" to="/career">Careers</nuxt-link>
        </ul>
      </UCard>
    </USlideover>
    <USlideover v-model="isCartOpen" prevent-close>
      <UCard
        class="flex flex-col  flex-1"
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
      <div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
  <!--
    Background backdrop, show/hide based on slide-over state.

    Entering: "ease-in-out duration-500"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in-out duration-500"
      From: "opacity-100"
      To: "opacity-0"
  -->
  <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

  <div class="fixed inset-0 overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
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
          <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
            <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div class="flex items-start justify-between">
                <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                <div class="ml-3 flex h-7 items-center">
                   <!-- <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isCartOpen = false"
            /> -->
                  <button @click="isCartOpen = false" type="button" class="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                    <span class="absolute -inset-0.5"></span>
                    <span class="sr-only">Close panel</span>
                    <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="mt-8">
                <div class="flow-root">
                  <ul role="list" class="-my-6 divide-y divide-gray-200">
                    <li v-for="item in cart.cart" :key="item.id" class="flex py-6">
                      <div class="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img :src="item.product.img" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." class="size-full object-cover">
                      </div>

                      <div class="ml-4 flex flex-1 flex-col">
                        <div>
                          <div class="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#">{{ item.product.name }}</a>
                            </h3>
                            <p class="ml-4">${{ item.price }}</p>
                          </div>
                          <p class="mt-1 text-sm text-gray-500">{{ item.product.category }}</p>
                        </div>
                        <div class="flex flex-1 items-end justify-between text-sm">
                          <p class="text-gray-500 flex justify-center items-center gap-2">Qty
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
                            <button type="button" @click="(cart.removeFromCart(item),toast.add({ title: 'Product removed from cart', color: 'orange',timeout: 1500 }))" class="font-medium items-center flex justify-center text-red-600 hover:text-red-500"><UIcon name="material-symbols:delete-outline" /> Remove</button>
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
              <div class="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${{ cart.total }}</p>
              </div>
              <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div class="mt-6">
                <nuxt-link to="/checkout" class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700">Checkout</nuxt-link>
              </div>
              <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
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
</template>

<script lang="ts" setup>
const route = useRoute()
const cart = useMyCartStore() as ReturnType<typeof useMyCartStore>
const toast = useToast()
const isOpen = ref(false)
const isCartOpen = ref(false)
const teas = [
  [
    {
      label: 'Halda Valley Black Tea',
      to: '/product-category/Halda_Valley_Black_Tea',
    },
    {
      label: 'Dragon Well Green Tea',
      to: '/product-category/Dragon_Well_Green_Tea',
    },
    {
      label: 'Golden Eyebrow Black Tea',
      to: '/product-category/Golden_Eyebrow_Black_Tea',
    },
    {
      label: 'Red Robe Olong Tea',
      to: '/product-category/Red_Robe_Olong_Tea',
    },
    {
      label: 'Silver Needle White Tea',
      to: '/product-category/Silver_Needle_White_Tea',
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
  ],
]
const medias = [
  [
    {
      label: 'Media & Events',
      to: '/media/media-events',
    },
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
watch(route, () => {
  isOpen.value = false
  isCartOpen.value = false
})
</script>

<style>
.router-link-active {
  color: #b4a345;
}
</style>
