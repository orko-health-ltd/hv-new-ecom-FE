<!-- components/AdPopup.vue -->
<template>
  <div v-if="show" class="fixed inset-0 z-50 py-10 px-14 flex items-center justify-center bg-black/50">
    <div
      class="relative w-[90%]  h-[80%] bg- rounded-2xl overflow-hidden  animate-fade-in-up bg-contain bg-no-repeat bg-center flex items-center justify-center"
      :style="`background-image: url('${$config.public.apiBase}/${banners[0]?.image}')`"
    >
      <button
        @click="close"
        class="absolute top-2 right-2 text-white bg-black/30 hover:bg-black/50 rounded-full p-1"
      >
        <X class="w-5 h-5" />
      </button>

      <div class="text-center px-6 text-white space-y-3">
        <h2 class="text-2xl font-bold drop-shadow" :style="`color:${banners[0]?.color}`">{{ banners[0]?.title }}</h2>
        <p class="text-sm drop-shadow" :style="`color:${banners[0]?.color}`">{{ banners[0]?.description }}</p>
        <div class="flex flex-col gap-2">
          <nuxt-link
            v-for="link in banners[0]?.links"
            :key="link.link"
            :to="link.link"
            class="px-4 py-2 bg-sky-700 text-white rounded-xl hover:bg-primary/90 transition"
          >
            {{ link.title }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { X } from 'lucide-vue-next' // or your preferred icon package

const show = ref(false)
const banners = ref([])
const close = () => {
  show.value = false
}
const getBanners = async () => {
  try {
    const response = await useFetch('/api/banners')
    
    if (response.data.value) {
      banners.value = response.data.value.data.filter(e => e.is_popup)
      if(banners.value.length > 0)
      { setTimeout(() => {
    show.value = true
  }, 2000)}
    }
  } catch(error) {
    console.log(error)
  }
}
onMounted(() => {
  getBanners()
 
})
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.4s ease-out;
}
</style>
