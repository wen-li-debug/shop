/**
 * 首页
 */
import request from './request'

// menus列表
export const menusList = () => {
  return request({
    url: '/menus',
    method: 'GET'
  })
}
