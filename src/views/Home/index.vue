<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory :categoryList="categoryList" />
        <!-- banner轮播图 -->
        <HomeBanner :bannerList="bannerList" />
      </div>
    </div>
    <!-- 新鲜好物 -->
    <HomeNews :newsList="newsList" />
    <!-- 人气推荐 -->
    <Hots :hotsList="hotsList" />
    <!-- 热门品牌 -->
    <BrandList :brandList="brandList" />
    <!-- 居家美食服饰 -->
    <HomeOther :goodsList="goodsList" />
    <!-- 最新专题 -->
    <HomeSpecial :specialList="specialList" />
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

import {
  getAllCateGory,
  getAllBanner,
  getAllNews,
  getAllHots,
  getAllBrand,
  getAllGoods,
  getAllSpecial
} from '@/api/home'
import {  ref } from 'vue'

// 首页分类
const categoryList = ref([])
const getAllCateGoryFn = async () => {
  let { code, result } = await getAllCateGory()
  if (code === '1') {
    categoryList.value = result.map((item) => {
      return {
        id: item.id,
        name: item.name,
        goods: item.goods,
        children: item.children.slice(0, 2)
      }
    })
  }
}
getAllCateGoryFn()

// 轮播图组件
const bannerList = ref([])
const getAllBannerFn = async () => {
  let { code, result } = await getAllBanner()
  if (code === '1') {
    bannerList.value = result
  }
}
getAllBannerFn()

// 新鲜好物组件
const newsList = ref([])
const getNewsList = async () => {
  let { code, result } = await getAllNews()
  if (code === '1') {
    newsList.value = result
  }
}
getNewsList()

// 人气推荐
const hotsList = ref([])
const getHotsList = async () => {
  let { code, result } = await getAllHots()
  if (code === '1') {
    hotsList.value = result
  }
}
getHotsList()

// 热门品牌
const brandList = ref([])
const getAllBrandList = async () => {
  let { result, code } = await getAllBrand()
  if (code === '1') {
    brandList.value = result
  }
}
getAllBrandList()

// 居家美食服饰
const goodsList = ref([])
const getAllGoodsList = async () => {
  let { code, result } = await getAllGoods()
  if (code === '1') {
    goodsList.value = result
  }
}
getAllGoodsList()

// 最新专题
const specialList = ref([])
const getSpecialList = async () => {
  let { code, result } = await getAllSpecial()
  if (code === '1') specialList.value = result
}
getSpecialList()
</script>
<style lang="scss" scoped></style>
