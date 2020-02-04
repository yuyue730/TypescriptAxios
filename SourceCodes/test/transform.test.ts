import axios, { AxiosResponse, AxiosTransformer } from '../src/index';
import { getAjaxRequest } from './helper';

describe('transform', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  });

  afterEach(() => {
    jasmine.Ajax.uninstall()
  });

  test('Transform JSON data to string in request params', () => {
    const data = { foo: 'bar' };
    axios.post('/hello', data);

    return getAjaxRequest().then(request => {
      expect(request.params).toBe('{"foo":"bar"}')
    });
  });

  test('Transform string in response to JSON object', done => {
    let response: AxiosResponse;
    axios('/foo').then(res => {
      response = res
    });

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: '{"foo":"bar"}'
      });

      setTimeout(() => {
        expect(typeof response.data).toBe('object');
        expect(response.data.foo).toBe('bar');
        done();
      }, 100);
    });
  });

  test('Override default transformRequest', () => {
    const data = { foo: 'bar' };
    axios.post('/foo', data, {transformRequest(data) {
      return {...data, hello: 'world'};
    }});

    return getAjaxRequest().then(request => {
      expect(request.params).toEqual({
        foo: 'bar',
        hello: 'world'
      });
    });
  });

  test('Override default transformRequest with functions array', () => {
    const data = { foo: 'bar' };
    axios.post('/foo', data, {
      transformRequest: [
        (data)=>{
        return {...data, hello: 'world'};
      }, (data)=>{
        return JSON.stringify(data)
      }
    ]});

    return getAjaxRequest().then(request => {
      expect(request.params).toBe('{"foo":"bar","hello":"world"}');
    });
  });

  test('Add key value pair to header', () => {
    const token = Math.floor(Math.random() * 50);
    axios('/foo', {
      transformRequest: (data, headers) => {
        headers['X-Authorizations'] = token;
        return data;
      }
    });

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['X-Authorizations']).toBe(token);
    });
  })
});