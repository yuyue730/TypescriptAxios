import {
  buildURL, isAbsoluteURL, combineURL, isURLSameOrigin
} from '../../src/helpers/url'

describe('helpers:url', () => {
  describe('buildURL', () => {
    test('null params', () => {
      expect(buildURL('/foo')).toBe('/foo')
    })

    test('support params', () => {
      expect(buildURL('/foo', {
        foo: 'bar'
      })).toBe('/foo?foo=bar')
    })

    test('ignore null params', () => {
      expect(buildURL('/foo', {
        foo: 'bar',
        baz: null
      })).toBe('/foo?foo=bar')
    })

    test('all null params', () => {
      expect(buildURL('/foo', {
        baz: null
      })).toBe('/foo')
    })

    test('should support object params', () => {
      const encodeUri = encodeURI('{"bar":"baz"}')
      expect(buildURL('/foo', {
        foo: {
          bar: 'baz'
        }
      })).toBe(`/foo?foo=${encodeUri}`)
    })

    test('should support data params', () => {
      const date = new Date()
      expect(buildURL('/foo', {
        date: date
      })).toBe(`/foo?date=${date.toISOString()}`)
    })

    test('should support array params', () => {
      expect(buildURL('/foo', {
        foo: ['bar', 'baz']
      })).toBe('/foo?foo[]=bar&foo[]=baz')
    })

    test('should support special chars', () => {
      expect(buildURL('/foo', {
        foo: '@:$ '
      })).toBe('/foo?foo=@:$+')
    })

    test('should support existing params', () => {
      expect(buildURL('/foo?foo=bar', {
        bar: 'baz'
      })).toBe('/foo?foo=bar&bar=baz')
    })

    test('should discard url hash mask', () => {
      expect(buildURL('/foo?foo=bar#hash', {
        query: 'baz'
      })).toBe('/foo?foo=bar&query=baz')
    })

    test('should use serializer', () => {
      const serializer = jest.fn(() => {
        return 'serializer_foo=result_bar';
      })

      const params = { foo: "bar" };
      expect(buildURL('/foo', params, serializer)).toBe('/foo?serializer_foo=result_bar')
      expect(serializer).toHaveBeenCalled()
      expect(serializer).toHaveBeenCalledWith(params)
    })

    test('should support URLSearchParams', () => {
      expect(buildURL('/foo', new URLSearchParams('hello=world')))
        .toBe('/foo?hello=world')
    })
  })

  describe('isAbsoluteURL', () => {
    test('should return true if valid absolute url', () => {
      expect(isAbsoluteURL('http://www.google.com/')).toBeTruthy()
      expect(isAbsoluteURL('custom-schema-v1.0://example.com')).toBeTruthy()
    })

    test('should return false if invalid prefix', () => {
      expect(isAbsoluteURL('123://baidu.com')).toBeFalsy()
      expect(isAbsoluteURL('!http://www.google.com/')).toBeFalsy()
    })

    test('should return true if url is protocol-relative', () => {
      expect(isAbsoluteURL('//www.google.com/')).toBeTruthy()
    })

    test('should return true if url is relative', () => {
      expect(isAbsoluteURL('/foo')).toBeFalsy()
    })
  })

  describe('combineURL', () => {
    test('should combine url', () => {
      expect(combineURL('http://www.google.com', '/users')).toBe('http://www.google.com/users')
      expect(combineURL('http://www.google.com/', '/users')).toBe('http://www.google.com/users')
      expect(combineURL('http://www.google.com/', 'users')).toBe('http://www.google.com/users')
      expect(combineURL('http://www.google.com', 'users')).toBe('http://www.google.com/users')
    })

    test('empty relative url', () => {
      expect(combineURL('http://www.google.com', '')).toBe('http://www.google.com')
    })

    test('relative url single slash', () => {
      expect(combineURL('http://www.google.com', '/')).toBe('http://www.google.com/')
    })
  })

  describe('isURLSameOrigin', () => {
    test('same origin', () => {
      expect(isURLSameOrigin(window.location.href)).toBeTruthy()
      expect(isURLSameOrigin('http://www.google.com')).toBeFalsy()
    })
  })
})