import axios, { AxiosRequestConfig, AxiosResponse } from '../src/index'
import { getAjaxRequest } from './helper'

describe('requests', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  });

  afterEach(() => {
    jasmine.Ajax.uninstall()
  });

  test('request return a new config object', () => {
    const instance = axios.create();
    instance.interceptors.request.use(() => {
      return {
        url: '/bar',
        method: 'post'
      }
    });

    instance('/foo');
    return getAjaxRequest().then(request => {
      expect(request.method).toBe('POST');
      expect(request.url).toBe('/bar');
    });
  });

  test('interceptor returns a promise', done => {
    const instance = axios.create();
    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      return new Promise(resolve => {
        setTimeout(() => {
          config.headers.async = 'promise';
          resolve(config);
        }, 10)
      });
    });

    instance('/foo');
    setTimeout(() => {
      getAjaxRequest().then(request => {
        expect(request.requestHeaders.async).toBe('promise');
        done();
      });
    }, 100);
  });

  test('request multiple interceptors', () => {
    const instance = axios.create();

    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      config.headers.test1 = 'TestInterceptor1';
      return config;
    });

    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      config.headers.test2 = 'TestInterceptor2';
      return config;
    });

    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      config.headers.test3 = 'TestInterceptor3';
      return config;
    });

    instance('/foo');
    return getAjaxRequest().then(request => {
      expect(request.requestHeaders.test1).toBe('TestInterceptor1');
      expect(request.requestHeaders.test2).toBe('TestInterceptor2');
      expect(request.requestHeaders.test3).toBe('TestInterceptor3');
    });
  });

  test('response return add to config', done => {
    const instance = axios.create();

    instance.interceptors.response.use(data => {
      data.data = `${data.data} - modified by response interceptors`;
      return data;
    });

    let response: AxiosResponse
    instance('/foo').then(data => {
      response = data;
    });
    
    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: 'OK'
      });

      setTimeout(() => {
        expect(response.data).toBe('OK - modified by response interceptors');
        done();
      }, 200);
    });
  });

  test('response with multiple interceptors and remove one', done => {
    const instance = axios.create();
    let intercept;

    instance.interceptors.response.use(data => {
      data.data = `${data.data} - response_interceptor_1`;
      return data;
    });

    intercept = instance.interceptors.response.use(data => {
      data.data = `${data.data} - response_interceptor_2`;
      return data;
    });

    instance.interceptors.response.use(data => {
      data.data = `${data.data} - response_interceptor_3`;
      return data;
    });

    instance.interceptors.response.eject(intercept);

    let response: AxiosResponse
    instance('/foo').then(data => {
      response = data;
    });

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: 'OK'
      });

      setTimeout(() => {
        expect(response.data).toBe('OK - response_interceptor_1 - response_interceptor_3');
        done();
      }, 200);
    });
  });
});