import axios, { AxiosError } from '../../src/index'

axios.get('/validateStatus/304').then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
})
// For this request, since valid status is between 200 and 300, so it should fail
// and throw. We expect to see output as `Request failed with status code 304`

axios.get('/validateStatus/304', {
  validateStatus(status) {
    return status >= 200 && status < 400
  }
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
})
// For this request, since we customized valid status to be between 200 and 400,
// 304 is valid now, so we should see original data to be printed in console.