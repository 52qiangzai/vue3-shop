<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- banner轮播图 -->
        <HomeBanner />
      </div>
    </div>
    <!-- 新鲜好物 -->
    <HomeNews />
    <!-- 人气推荐 -->
    <Hots />
    <BrandList />
    <HomeOther />
    <HomeSpecial />
  </div>
</template>

<script setup>
import HomeCategory from '@/components/home-category.vue'
import HomeBanner from '@/components/home-banner.vue'
import HomeNews from '@/components/home-news.vue'
import Hots from '@/components/home-hots.vue'
import BrandList from '@/components/home-brand.vue'
import HomeOther from '@/components/home-other.vue'
import HomeSpecial from '@/components/home-special.vue'
</script>
<style lang="scss" scoped></style>
