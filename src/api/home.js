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

// 获取新鲜好物
export const getAllNews = (query = 4) => {
  return request({
    method: 'get',
    url: 'home/new',
    params: {
      query
    }
  })
}

// 获取人气推荐
export const getAllHots = () => {
  return request({
    method: 'get',
    url: 'home/hot'
  })
}

// 获取热门品牌
export const getAllBrand = (limit = 10) => {
  return request({
    method: 'get',
    url: 'home/brand',
    params: {
      limit
    }
  })
}
