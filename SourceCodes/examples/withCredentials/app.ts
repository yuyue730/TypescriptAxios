import axios from '../../src/index'

document.cookie = 'a=b'

axios.get('/withCredentials/get').then(res => {
  console.log(res)
})

axios.post('http://127.0.0.1:8088/withCredentials/server2', { }, {
  withCredentials: true
}).then(res => {
  console.log(res)
})

// Step to test
// 1. run `npm run dev`. And make sure for http://localhost:8080/withCredentials/get
// Cookie is responded back.
// 2. Open http://127.0.0.1:8088/withCredentials/server2, go to developer/Application
// tab. Under storage/Cookies, add Cookie "c=d". 
// 3. Refresh http://localhost:8080/withCredentials/get, make sure for server2 post
// response, "c=d" is sent back.