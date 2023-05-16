import request from "@/utils/request"

// 用户名登录
export const reqLoginUser = (data) => {
  return request({
    method: 'post',
    url: 'login',
    data
  })
}


// 获取手机验证码
export const reqPhoneCode = (phone) => {
  return request({
    method: 'get',
    url: 'login/code',
    params:{
        phone
    }
  })
}
