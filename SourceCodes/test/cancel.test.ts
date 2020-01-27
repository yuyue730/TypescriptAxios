import axios from '../src/index';
import { getAjaxRequest } from './helper';

describe('cancel', () => {
  let CancelToken = axios.CancelToken;
  let Cancel = axios.Cancel;

  beforeEach(() => {
    jasmine.Ajax.install()
  });

  afterEach(() => {
    jasmine.Ajax.uninstall()
  });

  describe('called before sending request', () => {
    test('promise rejected when having a cancelToken', () => {
      const source = CancelToken.source();
      source.cancel('Cancel request.');

      return axios.get('/foo', {
        cancelToken: source.token
      }).catch(reason => {
        expect(reason).toEqual(expect.any(Cancel));
        expect(reason.message).toBe('Cancel request.');
      });
    });
  });

  describe('called after request sent', () => {
    test('test when promise gets cancelled later', () => {
      const source = CancelToken.source();
      axios.get('/foo', {
        cancelToken: source.token
      }).catch(reason => {
        expect(reason).toEqual(expect.any(Cancel));
        expect(reason.message).toBe('Cancel after requested.');
      });

      return getAjaxRequest().then(req => {
        source.cancel('Cancel after requested.');
        setTimeout(() => {
          req.respondWith({status: 200, responseText: 'OK'});
        }, 100);
      });
    });

    test('abort request', done => {
      const source = CancelToken.source();
      let request: any;

      axios.get('/foo/bar', {
        cancelToken: source.token
      }).catch(() => {
        expect(request.statusText).toBe('abort');
        done();
      });

      getAjaxRequest().then((req: any) => {
        source.cancel();
        request = req;
      })
    });
  });

  describe('called after response received', () => {
    test('should not have any unhandled rejection', done => {
      const source = CancelToken.source();
      axios.get('/foo', {
        cancelToken: source.token
      }).then(() => {
        window.addEventListener('unhandledrejection', () => {
          done.fail('Receive unhandledrejection');
        });

        source.cancel();
        setTimeout(done, 100);
      });

      getAjaxRequest().then(request => {
        request.respondWith({
          status: 200,
          responseText: 'OK'
        });
      });
    });
  });
});