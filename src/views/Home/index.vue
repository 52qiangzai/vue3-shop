<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory :categoryList="categoryStore.categoryListCmp" />
        <!-- banner轮播图 -->
        <HomeBanner :bannerList="bannerStore.bannerList" />
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
import { userCateGoryStore } from '@/stores/category'
import { userBannerStore } from '@/stores/banner'
import { getAllNews, getAllHots, getAllBrand, getAllGoods, getAllSpecial } from '@/api/home'
import { ref } from 'vue'

// 首页分类
const categoryStore = userCateGoryStore()
// 轮播图组件
const bannerStore = userBannerStore()
bannerStore.getAllBannerFn()

// 新鲜好物组件
const newsList = ref([])
const getNewsList = async () => {
  let { result } = await getAllNews()
  
    newsList.value = result
  
}
getNewsList()

// 人气推荐
const hotsList = ref([])
const getHotsList = async () => {
  let {  result } = await getAllHots()
  
    hotsList.value = result
  
}
getHotsList()

// 热门品牌
const brandList = ref([])
const getAllBrandList = async () => {
  let { result } = await getAllBrand()
 
    brandList.value = result
  
}
getAllBrandList()

// 居家美食服饰
const goodsList = ref([])
const getAllGoodsList = async () => {
  let {  result } = await getAllGoods()
  
    goodsList.value = result
  
}
getAllGoodsList()

// 最新专题
const specialList = ref([])
const getSpecialList = async () => {
  let {  result } = await getAllSpecial()
   specialList.value = result
}
getSpecialList()
</script>
<style lang="scss" scoped></style>
