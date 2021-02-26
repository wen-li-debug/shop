/**
 * 商品
 */
import request from './request'

export const catesList = (params) => {
  return request({
    method: 'GET',
    url: '/categories',
    params
  })
}

// 添加分类
export const addCate = data => {
  return request({
    method: 'POST',
    url: '/categories',
    data
  })
}
