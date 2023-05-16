// axios封装
import axios from 'axios'
// baseURL设置/超时时间设置
const request = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  // baseURL: 'https://www.fastmock.site/mock/cb5b0d019997b77b1839a1075aab69f0/api',
  timeout: 5000
})

// 全局注入token
request.interceptors.request.use(
  (config) => {
    return config
  },
  (e) => Promise.reject(e)
)

// token失效跳回到登录页
request.interceptors.response.use(
  (res) => res.data,
  (e) => {
    return Promise.reject(e)
  }
)

// /**
//  * @param {String} - url  请求地址
//  * @param {String} - method  请求类型
//  * @param {Object} - submitData  对象类型，提交数据
//  https://zh.javascript.info/object
//  */
// const request = (url, method, submitData ) => {
//   return instance({
//     url,
//     method,
//     [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
//   })
// }

export default request
