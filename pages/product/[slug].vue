<template>
  <div>
    <!-- <div class="overflow-hidden">
      <div
        class="h-[70vh] w-full bg-[url('/assets/images/Cover-scaled.jpg')] bg-cover bg-fixed top-0 overflow-x-hidden animate-breathout"
      >
        <div
          class="flex flex-col justify-center items-center h-full w-full bg-black bg-opacity-50"
        >
          <h1 class="text-white text-center text-4xl md:text-6xl font-bold">
            {{ useRoute().params.slug }}
          </h1>
        </div>
      </div>
    </div> -->
    <div class="bg-white">
      <div class="container mx-auto px-4 py-8">
        <div class="flex items-start">
          <!-- Product Images -->
          <!-- <div class="flex w-full"> -->
            <div class="sticky top-20">
           <div class="flex w-auto flex-col gap-4 py-4 px-2 justify-center">
            <div class="p-2 w-20 h-20 border rounded-md bg-gray-100" @click="scrollToImage(image.id)"   v-for="image in product.images"
                :key="image.image">
              <img
              
                :src="image.image"
                alt="Thumbnail 1"
                class="object-cover rounded-md cursor-pointer transition duration-300"
                             />
              </div>
            </div>
            </div>
          <div class="w-full mx-10 px-4 mb-8">
            <img  v-for="image in product.images"
             :key="image.image"
                :src="image.image"
              alt="Product"
              class="w-full h-auto rounded-lg shadow-md mb-4"
              :id="image.id"
            />
           </div>
          <!-- </div> -->

          <!-- Product Details -->
          <div class="w-full  px-4">
            <h2 class="text-3xl font-bold mb-2">Premium Wireless Headphones</h2>
            <p class="text-gray-600 mb-4">SKU: WH1000XM4</p>
            <div class="mb-4">
              <span class="text-2xl font-bold mr-2">$349.99</span>
              <span class="text-gray-500 line-through">$399.99</span>
            </div>
            <div class="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6 text-yellow-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6 text-yellow-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6 text-yellow-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6 text-yellow-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6 text-yellow-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="ml-2 text-gray-600">4.5 (120 reviews)</span>
            </div>
            <p class="text-gray-700 mb-6">
              Experience premium sound quality and industry-leading noise
              cancellation with these wireless headphones. Perfect for music
              lovers and frequent travelers.
            </p>

            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-2">Color:</h3>
              <div class="flex space-x-2">
                <button
                  class="w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                ></button>
                <button
                  class="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                ></button>
                <button
                  class="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                ></button>
              </div>
            </div>

            <div class="mb-6">
              <label
                for="quantity"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Quantity:</label
              >
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value="1"
                class="w-12 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div class="flex space-x-4 mb-6">
              <button
                class="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                Add to Cart
              </button>
              <button
                class="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                Wishlist
              </button>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-2">Key Features:</h3>
              <ul class="list-disc list-inside text-gray-700">
                <li>Industry-leading noise cancellation</li>
                <li>30-hour battery life</li>
                <li>Touch sensor controls</li>
                <li>Speak-to-chat technology</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import img2 from '/assets/images/gallery/prod-1.png'
import img1 from '/assets/images/gallery/prod-2.jpg'
import img3 from '/assets/images/gallery/prod-3.jpg'
const product = {
  name: 'Halda Valley Tea',
  description:
    'Halda Valley Tea is a premium tea brand that offers a wide range of high-quality teas. Our teas are carefully sourced from the finest tea gardens in the world, and are expertly blended to create a unique and delicious taste. Whether you are a tea connoisseur or just looking for a delicious cup of tea, Halda Valley Tea has something for everyone.',
  images: [{ id: '1', image: img1 }, { id: '2', image: img2 }, { id: '3', image: img3 },{ id: '4', image: img1 }, { id: '5', image: img2 }, { id: '6', image: img3 }],
  price: 10.99,
  category: 'Tea',
  rating: 4.5,
  reviews: [
    {
      name: 'John Doe',
      rating: 5,
      comment:
        'This tea is amazing! I love the taste and the aroma. It is definitely my new favorite tea.',
      date: '2022-01-01',
    },
    {
      name: 'Jane Doe',
      rating: 4,
      comment:
        'This tea is good, but not as good as I expected. It is still a good tea, but not as good as I expected.',
      date: '2022-01-02',
    },
  ],
}
const selectedImage = ref(product.images[0])
const scrollToImage = (id:string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
const changeImage = (src: string) => {
  // document.getElementById('mainImage').src = src;
  const mainImage = document.getElementById('mainImage')
  if (mainImage) {
    ;(mainImage as HTMLImageElement).src = src
  }
}
</script>

<style></style>
