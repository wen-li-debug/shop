/**
 * 商品参数
 */

import request from './request'

export const getParamsList = (id, sel) => {
  return request({
    method: 'GET',
    url: `/categories/${id}/attributes`,
    params: {
      sel
    }
  })
}

// 添加参数
export const addParams = (id, data) => {
  return request({
    method: 'POST',
    url: `/categories/${id}/attributes`,
    data
  })
}

// 查询当前参数数据
export const paramsData = (id, arrtId, params) => {
  return request({
    method: 'GET',
    url: `/categories/${id}/attributes/${arrtId}`,
    params
  })
}

// 修改参数属性
export const editParams = (id, attrId, data) => {
  return request({
    method: 'PUT',
    url: `/categories/${id}/attributes/${attrId}`,
    data
  })
}

// 删除参数属性
export const delParams = (id, arrtId) => {
  return request({
    method: 'DELETE',
    url: `/categories/${id}/attributes/${arrtId}`
  })
}

// 跟新属性
export const upAttr = (id, attrId, data) => {
  return request({
    method: 'PUT',
    url: `/categories/${id}/attributes/${attrId}`,
    data
  })
}
