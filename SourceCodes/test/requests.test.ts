import axios, { AxiosResponse } from '../src/index'
import { getAjaxRequest } from './helper'
import { AxiosError } from '../src/helpers/error'

describe('requests', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  });

  afterEach(() => {
    jasmine.Ajax.uninstall()
  });

  test('should treat single string arg as url', () => {
    axios('/foo');

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('GET')
    })
  });

  test('should treat method value as a lower case value', () => {
    axios({
      url: '/foo', method: 'POST'
    }).then(response => {
      expect(response.config.method).toBe('post')
    })

    return getAjaxRequest().then(request => {
      request.respondWith({ status: 200 })
    })
  });

  test('network error', () => {
    const resolveSpy = jest.fn((res: AxiosResponse) => {
      return res;
    });

    const rejectSpy = jest.fn((e: AxiosError) => {
      return e;
    });

    jasmine.Ajax.uninstall();

    return axios('/foo').then(resolveSpy).catch(rejectSpy).then(
      (reason: AxiosResponse | AxiosError) => {
        expect(resolveSpy).not.toHaveBeenCalled();
        expect(rejectSpy).toHaveBeenCalled();
        expect(reason instanceof Error).toBeTruthy();
        expect((reason as AxiosError).message).toBe('Network Error');
        expect(reason.request).toEqual(expect.any(XMLHttpRequest));

        jasmine.Ajax.install()
      }
    );
  });

  test('timeout', done => {
    let err: AxiosError;
    axios('/foo', {
      timeout: 2000,
      method: 'post'
    }).catch(error => {
      err = error;
    })

    getAjaxRequest().then(request => {
      //@ts-ignore
      request.eventBus.trigger('timeout');
      setTimeout(() => {
        expect(err instanceof Error).toBeTruthy();
        expect(err.message).toBe('Timeout of 2000 ms exceeded.');

        done();
      }, 100)
    });
  });

  test('invalid response status', () => {
    const resolveSpy = jest.fn((res: AxiosResponse) => {
      return res;
    });

    const rejectSpy = jest.fn((e: AxiosError) => {
      return e;
    });

    axios('/foo', {
      validateStatus(status) {
        return status !== 500;
      }
    }).then(resolveSpy).catch(rejectSpy).then(
      (reason: AxiosResponse | AxiosError) => {
        expect(resolveSpy).not.toHaveBeenCalled();
        expect(rejectSpy).toHaveBeenCalled();
        expect(reason instanceof Error).toBeTruthy();
        expect((reason as AxiosError).message).toBe('Request failed with status code 500');
        expect((reason as AxiosError).response!.status).toBe(500);
      }
    );

    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 500
      });
    });
  });

  test('invalid response status', () => {
    const resolveSpy = jest.fn((res: AxiosResponse) => {
      return res;
    });

    const rejectSpy = jest.fn((e: AxiosError) => {
      return e;
    });

    axios('/foo', {
      validateStatus(status) {
        return status === 500;
      }
    }).then(resolveSpy).catch(rejectSpy).then(
      (reason: AxiosResponse | AxiosError) => {
        expect(resolveSpy).toHaveBeenCalled();
        expect(rejectSpy).not.toHaveBeenCalled();
        expect((reason as AxiosResponse).config.url).toBe('/foo');
      }
    );

    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 500
      });
    });
  });

  test('should return JSON when resolved', done => {
    let response: AxiosResponse;
    axios('account/signup', {
      auth: { username: '', password: '' },
      method: 'post',
      headers: { Accept: 'application/json' }
    }).then(res => {
      response = res;
    });

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        statusText: 'OK',
        responseText: '{"a":1}'
      });

      setTimeout(() => {
        expect(response.data).toEqual({a: 1});
        done()
      }, 100);
    });
  });

  test('should return JSON when rejecting', done => {
    let response: AxiosResponse;
    axios('account/signup', {
      auth: { username: '', password: '' },
      method: 'post',
      headers: { Accept: 'application/json' }
    }).catch(error => {
      response = error.response;
    });

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 400,
        statusText: 'Bad Request',
        responseText: '{"error": "BAD USERNAME", "code": 1}'
      });

      setTimeout(() => {
        expect(typeof response.data).toBe('object');
        expect(response.data.error).toBe('BAD USERNAME');
        expect(response.data.code).toBe(1);
        done()
      }, 100)

      
    });
  });

  test('Correct response', done => {
    let response: AxiosResponse;
    axios('/foo').then(res => { response = res; });
    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        statusText: 'OK',
        responseText: '{"foo": "bar"}',
        responseHeaders: {
          'Content-Type': "application/json"
        }
      });

      setTimeout(() => {
        expect(response.data.foo).toBe("bar");
        expect(response.status).toBe(200);
        expect(response.statusText).toBe('OK');
        expect(response.headers['content-type']).toBe('application/json');
        done();
      }, 100)
    });
  });

  test('Override request Content-Type case sensitiveness', () => {
    let response: AxiosResponse;

    axios.post(
      '/foo',
      { prop: 'value' },
      {
        headers: {
          'content-type': 'application/json'
        }
      }
    ).then(res => { response = res; });

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['Content-Type']).toBe('application/json');
    });
  });
});