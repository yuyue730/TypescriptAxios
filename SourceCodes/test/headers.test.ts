import axios from '../src/index'
import { getAjaxRequest } from './helper'

function testHeaderValues(headers: any, key: string, val?: string): void {
  let found = false;

  for (let k in headers) {
    if (k.toLowerCase() === key.toLowerCase()) {
      found = true;
      expect(headers[k]).toBe(val);
      break;
    }
  }

  if (!found) {
    if (typeof val === 'undefined') {
      expect(headers.hasOwnProperty(key)).toBeFalsy();
    } else {
      throw new Error(`${key} not found in headers`);
    }
  }
}

describe("headers", () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  });

  afterEach(() => {
    jasmine.Ajax.uninstall()
  });

  test('user default headers', () => {
    const defaultHeaders = axios.defaults.headers.common;
    axios('/foo');
    return getAjaxRequest().then(request => {
      for (let key in defaultHeaders) {
        if (defaultHeaders.hasOwnProperty(key)) {
          expect(request.requestHeaders[key]).toEqual(defaultHeaders[key]);
        }
      }
    });
  });

  test('post add Content-Type to headers if string', () => {
    axios.post('/foo', 'fizz=buzz');
    return getAjaxRequest().then(request => {
      testHeaderValues(
        request.requestHeaders,
        'Content-Type', 'application/x-www-form-urlencoded');
    });
  });

  test('post add Content-Type to headers if object', () => {
    axios.post('/foo', {
      firstName: 'foo', lastName: 'bar'
    });
    return getAjaxRequest().then(request => {
      testHeaderValues(
        request.requestHeaders,
        'Content-Type', 'application/json;charset=utf-8');
    });
  });

  test('post add Content-Type to headers if undefined', () => {
    axios.post('/foo', undefined);
    return getAjaxRequest().then(request => {
      testHeaderValues(
        request.requestHeaders, 'Content-Type', undefined);
    });
  });

  test('post add Content-Type to headers if false', () => {
    axios.post('/foo', false);
    return getAjaxRequest().then(request => {
      testHeaderValues(
        request.requestHeaders,
        'Content-Type', 'application/x-www-form-urlencoded');
    });
  });

  test('post add Content-Type to headers if FormData', () => {
    let formData = new FormData();
    formData.append('foo', 'bar');
    axios.post('/foo', formData);
    return getAjaxRequest().then(request => {
      testHeaderValues(
        request.requestHeaders, 'Content-Type', undefined);
    });
  });
});