import axios from '../../src/index'

axios.post('/authorization/post', {
  a: 1
}, {
  auth: {
    username: 'Yee',
    password: '123456'
  }
}).then(res => {
  console.log(res)
})

// 1. If <username, password> == <'Yee', '123456'>, authorization should pass, and 
// Status = 200 with response = {'a': 1}
// 2. If <username, password> != <'Yee', '123456'>, authorization should fail, and 
// Status = 401 with response = UnAuthorization