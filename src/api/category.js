import request from '@/utils/request'

// 获取二级分类
export const getAllCateGoryById = (id) => {
  return request.get({
    method: 'get',
    url: 'category',
    params: { id }
  })
}
