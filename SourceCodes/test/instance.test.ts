import axios, { AxiosResponse, AxiosRequestConfig } from '../src/index'
import { getAjaxRequest } from './helper'

describe("instance", () => {
  beforeEach(() => {
    jasmine.Ajax.install();
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  test('create() should return an instance', () => {
    const instance = axios.create();
    instance('/foo');
    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo');
    });
  });

  test('make a http get request', () => {
    const instance = axios.create();
    instance.get('/foo');
    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo');
      expect(request.method).toBe('GET');
    });
  });

  test('add optional config', () => {
    const instance = axios.create({ timeout: 1000 });
    instance.get('/foo');
    return getAjaxRequest().then(request => {
      expect(request.timeout).toBe(1000);
    });
  });

  test('interceptors', done => {
    const instance = axios.create();
    instance.interceptors.request.use(config => {
      config.withCredentials = true;
      config.timeout = 150;
      return config;
    });

    let response: AxiosResponse;
    instance.get('/foo').then(res => {
      response = res;
    });

    return getAjaxRequest().then(request => {
      request.respondWith({ status: 200 });
      setTimeout(() => {
        expect(response.config.timeout).toBe(150);
        expect(response.config.withCredentials).toBe(true);
        done();
      }, 100);
    });
  });

  test('compute uri', () => {
    let config: AxiosRequestConfig = {
      baseURL: 'http://www.google.com',
      url: '/user/123',
      params: {
        idClient: 1,
        idTest: 2,
        testStr: "HelloWorld"
      }
    };
    expect(axios.getUri(config))
      .toBe('http://www.google.com/user/123?idClient=1&idTest=2&testStr=HelloWorld');
  });
});