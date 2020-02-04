import axios from '../src/index';
import { getAjaxRequest } from './helper';

describe('authorization', () => {
  beforeEach(() => {
    jasmine.Ajax.install();
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  test('should encode username and password', () => {
    const encode = btoa("hello:world");
    axios('/foo', {
      auth: {
        username: "hello",
        password: "world"
      }
    });

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders["Authorization"]).toBe(`Basic ${encode}`);
    });
  });
});