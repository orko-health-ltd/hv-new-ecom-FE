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
        </ul>
      </div>
      <div class="flex items-center">
        <div @click="isCartOpen = !isCartOpen">
          <UChip text="3" size="2xl" color="yellow" class="mx-2">
            <UIcon name="mdi:cart" class="text-white text-3xl" />
          </UChip>
        </div>
        <UButton
          class="block md:hidden"
          icon="pajamas:hamburger"
          size="xl"
          color="primary-700"
          square
          variant="solid"
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
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Cart
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

        <!-- <Placeholder class="h-full" /> -->
      </UCard>
    </USlideover>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
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
  // isCartOpen.value = false
})
</script>

<style>
.router-link-active {
  color: #b4a345;
}
</style>
