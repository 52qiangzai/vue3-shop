import { ref } from 'vue'
import { getAllBanner } from '@/api/home'
import { defineStore } from 'pinia'

export const userBannerStore = defineStore(
  'banner',
  () => {
    const bannerList = ref({})
    const getAllBannerFn = async () => {
      let { result } = await getAllBanner()

      bannerList.value = result
    }

    return { getAllBannerFn, bannerList }
  },
  {
    persist: true
  }
)
