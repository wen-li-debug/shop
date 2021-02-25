/**
 * 用户信息
 */

import request from './request'

// 获取用户信息
export const users = params => {
  return request({
    method: 'GET',
    url: '/users',
    params
  })
}

// 修改状态
export const myStatus = (id, status) => {
  return request({
    method: 'PUT',
    url: `/users/${id}/state/${status}`
  })
}

// 添加用户
export const addUser = (data) => {
  return request({
    method: 'POST',
    url: '/users',
    data
  })
}

// 获取需要修改的用户信息
export const updateUserInfo = (id) => {
  return request({
    method: 'GET',
    url: `/users/${id}`
  })
}

// 修改用户数据
export const updateUser = (id, data) => {
  return request({
    method: 'PUT',
    url: `/users/${id}`,
    data
  })
}

// 删除用户信息
export const delUser = (id) => {
  return request({
    method: 'DELETE',
    url: `/users/${id}`
  })
}

// 获取所以权限
export const getRights = () => {
  return request({
    mehtod: 'GET',
    url: '/roles'
  })
}

// 分配角色
export const setRoles = (id, rid) => {
  return request({
    method: 'PUT',
    url: `/users/${id}/role`,
    data: {
      rid
    }
  })
}
