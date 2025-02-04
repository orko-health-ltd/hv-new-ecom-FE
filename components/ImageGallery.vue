<template>
  <div :id="galleryID" class="grid grid-cols-2 gap-6 bg-white p-5">
    <a
      v-for="(image, key) in props.images"
      :key="key"
      :href="image.largeURL"
      :data-pswp-width="image.width"
      :data-pswp-height="image.height"
      target="_blank"
      rel="noreferrer"
    >
      <img :src="image.thumbnailURL" alt="" />
    </a>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

// Props
const props = defineProps({
  galleryID: String,
  images: Array,
});

let lightbox = null;

onMounted(() => {
  if (!lightbox) {
    lightbox = new PhotoSwipeLightbox({
      gallery: '#' + props.galleryID,
      children: 'a',
      pswpModule: () => import('photoswipe'),
      spacing: 0.5,
    });
    lightbox.init();
  }
});

onUnmounted(() => {
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
});
</script>
