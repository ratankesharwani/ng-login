import {HttpParams} from '@angular/common/http';

export const buildHttpParams = (obj: any): HttpParams => {
  let params = new HttpParams();
  Object.entries(obj).forEach(([key, value]:any) => {
    if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([subKey, subValue]:any) => {
        params = params.set(`${key}.${subKey}`, subValue);
      });
    } else {
      params = params.set(key, value);
    }
  });
  return params;
};

