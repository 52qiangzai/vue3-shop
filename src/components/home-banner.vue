<template>
  <div class="home-banner">
    <myCarousel :bannerList="bannerList" />
  </div>
</template>

<script setup>
import myCarousel from '@/components/my-carousel.vue'
defineProps({
  bannerList: {
    type: Array,
    default: []
  }
})
</script>
<style lang="scss" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
</style>
