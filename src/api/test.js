import request from '@/utils/request'

export const getCateGory = () => {
  return request({
    method: 'get',
    url: 'home/category/head'
  })
}
