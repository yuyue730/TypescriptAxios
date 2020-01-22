import axios from '../../src/index';
import qs from 'qs';

axios.defaults.headers.common['commonHeaderTest2'] = 'common_header_val';

axios({
  url: '/config_merge/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    userHeaderTest1: 'user_header_val'
  }
}).then((res) => {
  console.log(res.data)
})

// Please make sure the following field is merged
// 1. Accept: application/json text/plain */*
// 2. Content-Type: application/x-www-form-urlencoded (Added from default)
// 3. userHeaderTest1: user_header_val (Added from user customized)
// 4. commonHeaderTest2: common_header_val (Added from default above)