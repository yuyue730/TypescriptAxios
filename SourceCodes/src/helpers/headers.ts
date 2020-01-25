import { isPlainObject, deepMerge } from './util';
import { Methods } from '../types';

function normalizeHeaderName(header: any, normalizedName: string): void {
  if (!header) {
    return;
  }

  Object.keys(header).forEach(name => {
    if (name !== normalizedName 
      && name.toUpperCase() === normalizedName.toUpperCase())
    {
      header[normalizedName] = header[name];
      delete header[name];
    }
  });
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type');

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8';
    }
  }

  return headers;
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null);
  if (!headers) {
    return parsed;
  }

  headers.split('\r\n').forEach((line) => {
    let [key, ...vals] = line.split(':');
    key = key.trim().toLowerCase();
    if (!key) {
      return;
    }

    let val = vals.join(':').trim();
    parsed[key] = val;
  });

  return parsed;
}

export function flattenHeaders(headers: any, method: Methods): any {
  if (!headers) {
    return headers;
  }

  headers = deepMerge(headers.common, headers[method], headers);
  
  const MethodsToDelete = [
    'delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'patch', 'common'
  ];
  MethodsToDelete.forEach(method => {
    delete headers[method];
  });

  return headers;
}