import axios from '../src/index';
import mergeConfig from '../src/core/mergeConfig';

describe('mergeConfig', () => {
  const defaults = axios.defaults;

  test('second args undefined or {}, reference not the same', () => {
    expect(mergeConfig(defaults, undefined)).toEqual(defaults);
    expect(mergeConfig(defaults, {})).toEqual(defaults);
    expect(mergeConfig(defaults, {})).not.toBe(defaults);
    expect(mergeConfig(defaults, {}).headers).not.toBe(defaults.headers);
  });

  test('config from user', () => {
    const config = {
      url: '__sampleUrl__',
      params: '__sampleParams__',
      data: {
        foo: true
      }
    };

    const merged = mergeConfig(defaults, config);
    expect(merged.url).toBe(config.url);
    expect(merged.params).toBe(config.params);
    expect(merged.data).toEqual(config.data);
  });

  test('undefined config if user config undefined', () => {
    const defaultConfig = {
      url: '__sampleUrl__',
      params: '__sampleParams__',
      data: {
        foo: true
      }
    };

    const merged = mergeConfig(defaultConfig, undefined);
    expect(merged.url).toBe(undefined);
    expect(merged.params).toBe(undefined);
    expect(merged.data).toBe(undefined);
  });

  test('default config if user config undefined', () => {
    expect(mergeConfig({headers: 'X-MOCK-HEADER'}, {}).headers).toBe('X-MOCK-HEADER');
  });

  test('auth and header user config overwrite default', () => {
    const overwriteConfig = {
      auth: {
        username: 'yyu196',
        password: 'Yuyue'
      }
    };
    expect(mergeConfig({auth: undefined}, overwriteConfig)).toEqual(overwriteConfig);
    expect(mergeConfig(
      {headers: 'default'}, {headers: 'overwrite'}).headers).toBe('overwrite');
  })
});