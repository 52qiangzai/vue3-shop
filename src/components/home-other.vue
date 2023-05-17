<script setup>
import HomePanel from '@/components/home-panel.vue'
import HomeCard from '@/components/home-card.vue'
import MyMore from '@/components/my-more.vue'
import { computed } from 'vue'

const props = defineProps({
  goodsList: {
    type: Array,
    default: []
  }
})

// 计算商品卡片数量
const goodsListCm = computed(() => {
  return props.goodsList.map(({ id, name, picture, saleInfo }) => {
    return {
      id,
      name,
      picture,
      saleInfo
    }
  })
})

// 根据id计算出每个商品卡片的子菜单sub
const subGoodsList = computed(() => {
  return (id) => {
    console.log(id)
    return props.goodsList.find((item) => item.id === id).children
  }
})

// 根据id计算出每个商品卡片的商品子类
const goodsItemList = computed(() => {
  return (id) => {
    return props.goodsList.find((item) => item.id === id).goods
  }
})
</script>

<template>
  <HomePanel :title="good.name" v-for="good in goodsListCm" :key="good.id">
    <template #right>
      <div class="sub">
        <router-link
          :to="`/category/sub/${sub.id}`"
          v-for="sub in subGoodsList(good.id)"
          :key="sub.id"
          >{{ sub.name }}</router-link
        >
      </div>
      <MyMore :path="`/category/${good.id}`" />
    </template>
    <template #main>
      <HomeCard :goodsItemList="goodsItemList(good.id)" :cardInfo="good" />
    </template>
  </HomePanel>
</template>

<style lang="scss" scoped>
.sub {
  margin-bottom: 2px;
  border-radius: 5px;
  a {
    padding: 2px 12px;
    font-size: 16px;
    border-radius: 4px;
    &:hover {
      color: #fff;
      background-color: $xtxColor;
    }
    &:last-child {
      margin-right: 80px;
    }
  }
}
</style>
