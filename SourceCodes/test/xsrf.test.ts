import axios from '../src/index';
import { getAjaxRequest } from './helper';

describe('xsrf', () => {
  beforeEach(() => {
    jasmine.Ajax.install();
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
    document.cookie
      = `${axios.defaults.xsrfCookieName}=;expires=${new Date(Date.now() - 86400000).toUTCString()}`;
  });

  test('should see nothing if cookie is null', () => {
    axios('/foo');
    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[axios.defaults.xsrfCookieName!]).toBeUndefined();
    });
  });

  test('should expect correct cookie xsrf value', () => {
    document.cookie = axios.defaults.xsrfCookieName + '=12345';
    axios('/foo');
    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[axios.defaults.xsrfHeaderName!]).toBe('12345');
    });
  });
  
  test('should cross origin with no withCredential', () => {
    document.cookie = axios.defaults.xsrfCookieName + '=12345';
    axios('http://www.google.com');
    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[axios.defaults.xsrfHeaderName!]).toBeUndefined();
    });
  });
  
  test('should cross origin with withCredential set', () => {
    document.cookie = axios.defaults.xsrfCookieName + '=12345';
    axios('http://www.google.com', { withCredentials: true });
    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[axios.defaults.xsrfHeaderName!]).toBe('12345');
    });
  });
});