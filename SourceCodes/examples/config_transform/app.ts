import axios, { AxiosTransformer } from '../../src/index';
import qs from 'qs';

axios({
  transformRequest: [(function(data) {
    data.requestText = "Hello";
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.responseText = "World";
    }
    return data
  }],
  url: '/config_transform/post',
  method: 'post',
  data: {
    a: 1
  }
  }).then((res) => {
  console.log(res.data)
})

// Request will be transformed into 
// a: 1
// requestText: Hello
// Response will be transformed into `{a: "1", requestText: "Hello", responseText: "World"}`
// and it will be logged into console
  