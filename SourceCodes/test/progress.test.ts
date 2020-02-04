import axios from '../src/index';
import { getAjaxRequest } from './helper';

describe('progress', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  });

  afterEach(() => {
    jasmine.Ajax.uninstall()
  });

  test('should call download progress fn', () => {
    const downloadSpy = jest.fn();
    axios('foo', { onDownloadProgress: downloadSpy });
    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: '{"foo":"boo"}'
      });

      expect(downloadSpy).toHaveBeenCalled();
    });
  });
});