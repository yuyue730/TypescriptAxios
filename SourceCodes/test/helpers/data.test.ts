import { transformRequest, transformResponse } from '../../src/helpers/data'

describe('helpers:data', () => {
  describe('transformRequest', () => {
    test('should transform request data to string if plainObject', () => {
      const a = { a: 1 }
      expect(transformRequest(a)).toBe('{"a":1}')
    })

    test('should do nothing if not plainObject', () => {
      const a = new URLSearchParams('a=b')
      expect(transformRequest(a)).toBe(a)
    })
  })

  describe('transformResponse', () => {
    test('should transform response data to Object if JSON Object string', () => {
      const a = '{"a":2}'
      expect(transformResponse(a)).toEqual({ a: 2 })
    })

    test('should directly return string if not a JSON Object string', () => {
      const a = '{a:2}'
      expect(transformResponse(a)).toEqual('{a:2}')
    })

    test('should directly return if not a string', () => {
      const a = {a: 2}
      expect(transformResponse(a)).toEqual(a)
    })
  })
})