import axios from 'axios'

const request = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/'
})

// 响应拦截器
request.interceptors.response.use(res => {
  const data = res.data
  return data
}, err => {
  return Promise.reject(err)
})

export default request
