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

  console.log(JSON.stringify(headers));

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8';
    }
  }

  console.log(JSON.stringify(headers));
  return headers;
}