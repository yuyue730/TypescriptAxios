import axios from '../../src/index'

axios.interceptors.request.use(config => {
  config.headers.test += '[Request_intercept_add_1]'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '[Request_intercept_add_2]'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '[Request_intercept_add_3]'
  return config
})

axios.interceptors.response.use(res => {
  res.data += '[Resonse_intercept_add_1]'
  return res
})

let interceptor = axios.interceptors.response.use(res => {
  res.data += '[Resonse_intercept_add_2]'
  return res
})
axios.interceptors.response.use(res => {
  res.data += '[Resonse_intercept_add_3]'
  return res
})

axios.interceptors.response.eject(interceptor)

axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then((res) => {
  console.log(res.data)
})