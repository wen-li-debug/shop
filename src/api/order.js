import request from './request'

export const orderList = params => {
  return request({
    method: 'GET',
    url: '/orders',
    params
  })
}
