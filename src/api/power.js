/**
 * 权限管理
 */
import request from './request'

// 获取权限列表
export const getRightsList = (type) => {
  return request({
    method: 'GET',
    url: `/rights/${type}`
  })
}

// 获取角色列表
export const getRolesList = () => {
  return request({
    method: 'GET',
    url: '/roles'
  })
}

// 删除角色权限
export const delRoles = (id, rightsId) => {
  return request({
    method: 'DELETE',
    url: `/roles/${id}/rights/${rightsId}`
  })
}

// 给角色添加权限
export const addRolesRights = (id, data) => {
  return request({
    method: 'POST',
    url: `/roles/${id}/rights`,
    data: {
      rids: data
    }
  })
}
