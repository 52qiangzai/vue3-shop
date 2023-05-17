import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { reqLoginUser } from '@/api/login'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})
    const getUserInfo = (formData, loginType) => {
      return new Promise(async (resolve, reject) => {
        let res
        if (loginType === 'user-login') {
          // 发送登录请求
          res = await reqLoginUser({
            account: formData.account,
            password: formData.password
          })
        } else {
          res = await reqLoginUser({
            mobile: formData.mobile,
            code: formData.code
          })
        }
        if (res.code === '1') {
          userInfo.value = res.result
          ElMessage.success('登录成功')
          resolve()
        } else {
          ElMessage.error(res.message)
          reject()
        }
      })
    }

    return { userInfo, getUserInfo }
  },
  {
    persist: true
  }
)
