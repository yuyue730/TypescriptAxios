import axios from '../../src/index'

const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

instance.get('/xsrf/get').then(res => {
  console.log(res)
})

// Please make sure the following features can be seen in Chrome Developer monitor
// 1. In Application Tab/Storage/Cookies/localhost:8080, you can see Cookie stored as
// <XSRF-TOKEN-D, XSRF-Cookie-Value-1>
// 2. In request, you can see `Cookie` header = `XSRF-TOKEN-D=XSRF-Cookie-Value-1` and
// `XSRF-TOKEN-D` header = `XSRF-Cookie-Value-1`
// 3. Response = `{"XSRF-TOKEN-D":"XSRF-Cookie-Value-1"}`