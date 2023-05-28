<script setup>
import MyCarouse from '@/components/my-carousel.vue'
import MyMore from '@/components/my-more.vue'
import GoodsItem from '@/components/goods-item.vue'
import myBreadcrumb from '@/components/my-breadcrumb.vue'
import { getAllCateGoryById } from '@/api/category'
import { userBannerStore } from '@/stores/banner'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
//定义面板蟹
const breadcrumbList = ref([])
const route = useRoute()
// 轮播数据
const bannerStore = userBannerStore()
// 获取二级菜单
const menuList = ref([])
const getSubMenu = async (id) => {
  let { result } = await getAllCateGoryById(id)

  menuList.value = result

  return { name: result.name, id: result.id }
}
// 监控路由改变
watch(
  route,
  (newValue) => {
    const subId = newValue.params.id
    if (subId) {
      getSubMenu(subId).then((res) => {
        breadcrumbList.value.splice(0, 1, res)
      })
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <myBreadcrumb :breadcrumbList="breadcrumbList" />
      <!-- 轮播图 -->
      <MyCarouse
        style="height: 500px"
        :bannerList="bannerStore.bannerList"
        v-if="route.name === 'category'"
      />

      <!-- 所有二级分类 -->
      <div class="sub-list" v-if="route.name === 'category'">
        <h3>全部分类</h3>
        <ul>
          <li v-for="sub in menuList.children" :key="sub.id">
            <router-link :to="`/category/sub/${sub.id}`">
              <img v-img-lazy="sub.picture" />
              <p>{{ sub.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
      <div class="ref-goods" v-for="item in menuList.children" v-if="route.name === 'category'">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <MyMore />
        </div>
        <div class="body">
          <GoodsItem v-for="good in item.goods" :key="good.id" :good="good" />
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }
}
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
