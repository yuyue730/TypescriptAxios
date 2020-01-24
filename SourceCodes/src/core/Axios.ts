import {
  AxiosRequestConfig, AxiosPromise, Methods, AxiosResponse, ResolveFn, RejectFn
} from '../types';
import dispatchRequest, { transformURL } from './dispatchRequest'
import InterceptManager from './InterceptorManager'
import mergeConfig from './mergeConfig';

interface Interceptors {
  request: InterceptManager<AxiosRequestConfig>;
  response: InterceptManager<AxiosResponse>;
};

interface PromiseChain<T> {
  resolved: ResolveFn<T> | ((config: AxiosRequestConfig) => AxiosPromise);
  rejected?: RejectFn
}

export default class Axios {
  defaults: AxiosRequestConfig;
  interceptors: Interceptors;

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig;

    this.interceptors = {
      request: new InterceptManager<AxiosRequestConfig>(),
      response: new InterceptManager<AxiosResponse>()
    }
  }

  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {};
      }
      config.url = url;
    } else {
      config = url;
    }

    config = mergeConfig(this.defaults, config);

    const chain: PromiseChain<any>[] = [{
      resolved: dispatchRequest,
      rejected: undefined
    }];

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor);
    });

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor);
    });

    let promise = Promise.resolve(config);
    while (chain.length) {
      const { resolved, rejected } = chain.shift()!;
      promise = promise.then(resolved, rejected);
    }

    return promise;
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData("GET", url, config);
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData("DELETE", url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData("HEAD", url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData("OPTIONS", url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData("POST", url, data, config);
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData("PUT", url, data, config);
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData("PATCH", url, data, config);
  }

  getUri(config?: AxiosRequestConfig): string {
    config = mergeConfig(this.defaults, config);
    return transformURL(config);
  }

  _requestMethodWithoutData(
    method: Methods, url: string, config?: AxiosRequestConfig): AxiosPromise
  {
    return this.request(Object.assign(config || {}, {
      method,
      url
    }));
  }

  _requestMethodWithData(
    method: Methods, url: string, 
    data?: any, config?: AxiosRequestConfig): AxiosPromise
  {
    return this.request(Object.assign(config || {}, {
      method,
      url,
      data
    }));
  }
}