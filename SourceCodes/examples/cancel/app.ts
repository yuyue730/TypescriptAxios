import axios, { Canceler } from '../../src/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('1. Request canceled', e.message)
  }
})

setTimeout(() => {
  source.cancel('Operation canceled by the user.')
    // 1. Exception will be thrown, and console.log will happen for line 11
    // Output: 1. Request canceled Operation canceled by the user.

  setTimeout(() => {
    axios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
      if (axios.isCancel(e)) {
        console.log(`2. ${e.message}`)
          // 2. Using the same cancelToken, an idential error message will be printed
          // Output: 2. Operation canceled by the user.
      }
    })
  }, 100)
}, 100)

let cancel: Canceler

axios.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log(`3. Request canceled with e=${JSON.stringify(e)}`)
  }
})

setTimeout(() => {
  cancel('Cancel after 500ms')
}, 500)
  // 3. Request is canceled right after timeout, so directly canceled with correct message
  // Output: 3. Request canceled with e={"message":"Cancel after 500ms"}