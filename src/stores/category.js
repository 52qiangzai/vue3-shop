import { ref } from 'vue'
import { getAllCateGory } from '@/api/home'
import { defineStore } from 'pinia'

export const userCateGoryStore = defineStore(
  'category',
  () => {
    const categoryList = ref({})

    const getAllCateGoryFn = () => {
      return new Promise(async (resolve, reject) => {
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
          resolve(categoryList.value)
        } else {
          reject([])
        }
      })
    }

    return { categoryList, getAllCateGoryFn }
  },
  {
    persist: true
  }
)
