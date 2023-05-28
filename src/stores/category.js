import { ref } from 'vue'
import { getAllCateGory } from '@/api/home'
import { defineStore } from 'pinia'

export const userCateGoryStore = defineStore(
  'category',
  () => {
    const categoryList = ref({})
    // 首页左侧轮播计算后的category
    const categoryListCmp = ref({})
    const getAllCateGoryFn = () => {
      return new Promise(async (resolve, reject) => {
        try {
          let { result } = await getAllCateGory()
          categoryList.value = result.map((item) => {
            return {
              id: item.id,
              name: item.name,
              goods: item.goods,
              children: item.children
            }
          })
          categoryListCmp.value = result.map((item) => {
            return {
              id: item.id,
              name: item.name,
              goods: item.goods,
              children: item.children.slice(0, 2)
            }
          })
          resolve(categoryList.value)
        } catch (error) {
          reject([])
        }
      })
    }

    return { categoryList, getAllCateGoryFn, categoryListCmp }
  }
  // {
  //   persist: true
  // }
)
