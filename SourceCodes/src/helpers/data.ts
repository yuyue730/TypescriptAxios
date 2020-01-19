import { isPlainObject } from './util'

export function transformRequest(data: any) : any {
  if (isPlainObject(data)) {
    return JSON.stringify(data);
  }

  return data;
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) {
      console.log(`Cannot transform data=${data} into JSON with exception=${e}. `
        + `Return original data`);
    }
  }

  return data;
}