import axios from '../../src/index'

console.log("Base promise page load");

axios({
  method: 'post',
  url: '/base/post',
  data: {
      a: 1,
      b: 2
  }
}).then((res) => {
  console.log(res)
})
  
axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
      a: 3,
      b: 4
  }
}).then((res) => {
  console.log(res)
})