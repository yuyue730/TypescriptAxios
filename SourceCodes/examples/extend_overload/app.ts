import axios from '../../src/index'

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})
  
axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hello'
  }
})