import request from './request'

export const reportsList = _ => {
  return request({
    method: 'GET',
    url: '/reports/type/1'
  })
}
