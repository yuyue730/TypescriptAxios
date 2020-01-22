import axios, { AxiosTransformer } from '../../src/index';
import qs from 'qs';

const instance = axios.create({
  transformRequest: [(function(data) {
    data.requestText = "Hello";
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
      data.responseText = "World";
    }
    return data
  }]
})

instance({
  url: '/config_axiosCreate/post',
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
