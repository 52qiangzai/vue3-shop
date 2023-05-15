import request from '@/utils/request'

// 获取全部分类
export const getAllCateGory = () => {
  return request({
    method: 'get',
    url: 'home/category/head'
  })
}

// 获取轮播图
export const getAllBanner = () => {
    return request({
      method: 'get',
      url: 'home/banner'
    })
  }
