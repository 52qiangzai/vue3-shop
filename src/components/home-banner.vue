<template>
  <div class="home-banner">
    <myCarousel :bannerList="bannerList" />
  </div>
</template>

<script setup>
import { getAllBanner } from '@/api/home'
import { onBeforeMount, ref } from 'vue'
import myCarousel from './my-carousel.vue'

const bannerList = ref([])
const getAllBannerFn = async () => {
  let { code, result } = await getAllBanner()
  if (code === '1') {
    bannerList.value = result
  }
}

onBeforeMount(() => {
  getAllBannerFn()
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
