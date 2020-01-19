import { isPlainObject } from './util'

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
    let [key, val] = line.split(':');
    key = key.trim().toLowerCase();
    if (!key) {
      return;
    }

    if (val) {
      val = val.trim();
    }

    parsed[key] = val;
  });

  return parsed;
}