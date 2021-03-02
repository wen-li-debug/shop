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

// 获取商品
export const goodsList = params => {
  return request({
    method: 'GET',
    url: '/goods',
    params
  })
}

// 删除商品
export const delGoods = id => {
  return request({
    method: 'DELETE',
    url: `goods/${id}`
  })
}

// 添加商品
export const addGoods = data => {
  return request({
    method: 'POST',
    url: '/goods',
    data
  })
}
