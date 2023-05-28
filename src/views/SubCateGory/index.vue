<script setup>
import SubFilter from './components/sub-filter.vue'
import GoodsList from './components/goods-list.vue'
import GoodsFilter from './components/goods-filter.vue'
import { computed, ref, watch } from 'vue'
import { getSubCategoryList, getFilterGoodList } from '@/api/category'
import { useRoute } from 'vue-router'
const route = useRoute()
const subObj = ref({})
const reqSubCateGoryInfo = async () => {
  let { result } = await getSubCategoryList(route.params.sid)
  subObj.value = result
}

// 传递数据
const temporaryObj = ref({
  page: 1,
  pageSize: 20,
  brandId: null,
  attrs: [],
  categoryId: route.params.sid
})
watch(
  route,
  () => {
    reqSubCateGoryInfo()
    temporaryObj.value.categoryId = route.params.sid
  },
  {
    deep: true,
    immediate: true
  }
)
const emitAttr = (data) => {
  const findIndex = temporaryObj.value.attrs.findIndex((item) => item.groupName === data.groupName)
  if (findIndex >= 0) {
    if (data.propertyName === '全部') {
      temporaryObj.value.attrs.splice(findIndex, 1)
    } else {
      temporaryObj.value.attrs[findIndex] = data
    }
  } else {
    temporaryObj.value.attrs.push(data)
  }
  console.log(temporaryObj.value.attrs)
  getFilterGood()
}

// 根据商品分类获取数据
const getFilterGood = async () => {
  let res = await getFilterGoodList(temporaryObj.value)
  subObj.value.goods = res.result.items
}

const emitSort = ([sortField, sortMethod]) => {
  temporaryObj.value.sortField = sortField
  temporaryObj.value.sortMethod = sortMethod
  getFilterGood()
}
</script>
<template>
  <SubFilter :saleProperties="subObj.saleProperties" @setAttrFn="emitAttr" />
  <div class="goods-list">
    <GoodsFilter @changeSort="emitSort" />
    <GoodsList :goodsList="subObj.goods" />
  </div>
</template>

<style lang="scss" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>
