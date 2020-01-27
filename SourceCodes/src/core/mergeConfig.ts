import { AxiosRequestConfig } from '../types';
import { isPlainObject, deepMerge } from '../helpers/util';

const strats = Object.create(null);

function defaultStrat(defaultVal: any, userVal: any): any {
  return typeof userVal !== 'undefined' ? userVal : defaultVal;
}

function fromUserValStrat(defaultVal: any, userVal: any): any {
  if (typeof userVal !== 'undefined') {
    return userVal;
  }
}

const stratKeysFromUserVal = ['url', 'params', 'data'];

stratKeysFromUserVal.forEach(strat => {
  strats[strat] = fromUserValStrat;
})

function deepMergeStrat(defaultVal: any, userVal: any): any {
  if (isPlainObject(userVal)) {
    return deepMerge(defaultVal, userVal);
  } else if (typeof userVal !== 'undefined') {
    return userVal;
  } else if (isPlainObject(defaultVal)) {
    return deepMerge(defaultVal);
  } else {
    return defaultVal;
  }
}

const stratKeysDeepMerge = ['headers', 'auth'];

stratKeysDeepMerge.forEach(strat => {
  strats[strat] = deepMergeStrat;
})

export default function mergeConfig(
  defaultConfig: AxiosRequestConfig,
  userConfig?: AxiosRequestConfig): AxiosRequestConfig
{
  if (!userConfig) {
    userConfig = {};
  }

  const resultConfig = Object.create(null);

  function mergeField(key: string): void {
    const mergeStrat = strats[key] || defaultStrat;
    resultConfig[key] = mergeStrat(defaultConfig[key], userConfig![key]);
  }

  for (let key in userConfig) {
    mergeField(key);
  }

  for (let key in defaultConfig) {
    if (!userConfig[key]) {
      mergeField(key);
    }
  }

  return resultConfig;
}