import request from '@/utils/request'

// 获取二级分类
export const getAllCateGoryById = (id) => {
  return request({
    method: 'get',
    url: 'category',
    params: { id }
  })
}

// 获取商品数据
export const getSubCategoryList = (id) => {
  return request({
    method: 'get',
    url: 'category/sub/filter',
    params: { id }
  })
}

// 根据条件分类数据
export const getFilterGoodList = (data) => {
  return request({
    method: 'post',
    url: 'category/goods/temporary',
    data
  })
}
