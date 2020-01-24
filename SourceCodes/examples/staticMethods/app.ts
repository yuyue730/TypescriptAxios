import axios from '../../src/index'

function getA() {
  return axios.get('/staticMethods/A')
}

function getB() {
  return axios.get('/staticMethods/B')
}

axios.all([getA(), getB()])
  .then(axios.spread(function(resA, resB) {
    console.log(`axios.all([getA(), getB()]) using spread`)
    console.log(resA.data)
    console.log(resB.data)
  }))
// Output = /staticMethods/A responds A; /staticMethods/B responds B

axios.all([getA(), getB()])
  .then(([resA, resB]) => {
    console.log(`axios.all([getA(), getB()]) using array [resA, resB]`)
    console.log(resA.data)
    console.log(resB.data)
  })
// Output = /staticMethods/A responds A; /staticMethods/B responds B

const fakeConfig = {
  baseURL: 'https://www.baidu.com/',
  url: '/user/12345',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'thisIsATest'
  }
}
console.log(`Axios get uri = ${axios.getUri(fakeConfig)}`)
// Axios get uri = https://www.baidu.com/user/12345?idClient=1&idTest=2&testString=thisIsATest