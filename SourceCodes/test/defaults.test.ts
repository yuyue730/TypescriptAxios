import axios, { AxiosTransformer } from '../src/index';
import { getAjaxRequest } from './helper';
import { deepMerge } from '../src/helpers/util';

describe("defaults", () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  });

  afterEach(() => {
    jasmine.Ajax.uninstall()
  });

  test('transformRequest', () => {
    expect((axios.defaults.transformRequest as AxiosTransformer[])[0]({foo: 'bar'}))
      .toBe('{"foo":"bar"}');
    expect((axios.defaults.transformRequest as AxiosTransformer[])[0]("Hello World."))
      .toBe('Hello World.');
  });

  test('transformResponse', () => {
    const data = (axios.defaults.transformResponse as AxiosTransformer[])[0]('{"foo":"bar"}');
    expect(typeof data).toBe('object');
    expect(data.foo).toBe('bar');
    expect((axios.defaults.transformResponse as AxiosTransformer[])[0]("Hello World."))
      .toBe('Hello World.');
  });

  test('append baseUrl', () => {
    axios('/foo', {
      baseURL: 'http://www.baidu.com'
    });

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('http://www.baidu.com/foo');
    });
  });

  test('add Cookie Value to default Cookie Key', () => {
    const instance = axios.create({
      xsrfCookieName: 'CUSTOM-XSRF-TOKEN',
      xsrfHeaderName: 'X-CUSTOM-XSRF-TOKEN'
    });
    document.cookie = instance.defaults.xsrfCookieName + '=testCookieValue';

    instance.get('/foo', { withCredentials: true });
    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[instance.defaults.xsrfHeaderName!]).toBe('testCookieValue')
      document.cookie = instance.defaults.xsrfCookieName + '=;expires='
        + new Date(Date.now() - 86400000).toUTCString();
    });
  });

  test('add get custom header', () => {
    axios.defaults.headers.get['X-GET-CUSTOM-HEADER'] = 'GET-CUSTOM-HEADER-VALUE';
    axios.get('/foo');
    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['X-GET-CUSTOM-HEADER']).toBe('GET-CUSTOM-HEADER-VALUE');
      delete axios.defaults.headers.get['X-GET-CUSTOM-HEADER'];
    });
  });

  test('add post custom header', () => {
    axios.defaults.headers.post['X-POST-CUSTOM-HEADER'] = 'POST-CUSTOM-HEADER-VALUE';
    axios.post('/foo');
    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['X-POST-CUSTOM-HEADER']).toBe('POST-CUSTOM-HEADER-VALUE');
      delete axios.defaults.headers.get['X-POST-CUSTOM-HEADER'];
    });
  });

  test('merge default, create and get headers', () => {
    const instance = axios.create({
      headers: {
        common: {
          'X-COMMON-HEADER': 'COMMON-HEADER-VALUE'
        },
        get: {
          'X-GET-HEADER': 'GET-HEADER-VALUE'
        }
      }
    });

    instance.get('foo', {
      headers: {
        'X-FOO-HEADER': 'FOO-VALUE',
        'X-BAR-HEADER': 'BAR-VALUE'
      }
    });

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders).toEqual(deepMerge(
        axios.defaults.headers.common,
        axios.defaults.headers.get,
        {
          'X-COMMON-HEADER': 'COMMON-HEADER-VALUE',
          'X-GET-HEADER': 'GET-HEADER-VALUE',
          'X-FOO-HEADER': 'FOO-VALUE',
          'X-BAR-HEADER': 'BAR-VALUE'
        }
      ));
    })
  });
});